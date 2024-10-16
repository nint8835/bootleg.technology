---
title: Advent of Code 2022 - Day 1
description: Walkthrough of my solution to Advent of Code 2022 - Day 1's problem
date: 2022-12-01
authors:
  - nint8835
---

![](./assets/day-1.png)

Santa's elves have done a poor job keeping track of and properly distributing their food supplies, so it falls on us today to sort out how much the elves are carrying.

<!-- more -->

## Input

The input for this problem takes the form of groups of numbers representing calorie counts for food items. Each item is separated with a newline, and each group is separated by a blank line (two newlines).

```
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

To parse the input, I began by adding the same code I use for all my solutions, to read an entire input file into a string.

=== "Code"

    ```f#
    let inputData = System.IO.File.ReadAllText "Day1/input.txt"
    ```

=== "Result"

    ```f#
    val inputData: string =
      "1000
    2000
    3000

    4000

    5000
    6000

    7000
    8000
    9000

    10000"
    ```

Normally, my next step would be to split the input on newlines to get each individual line to work with, however in this case doing so would make it more difficult to handle the grouping. As each group is separated by two newlines, it's better to first split by two newlines to get an array of the strings for each group before doing anything else with the input.

=== "Code"

    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day1/input.txt")
            .Split "\n\n"
    ```

=== "Result"

    ```f#
    val inputData: string array =
      [|"1000
    2000
    3000"; "4000"; "5000
    6000"; "7000
    8000
    9000"; "10000"|]
    ```

Now with the input split into groups, we can process each of the groups to split the text into each line, and then convert each line into an int to get a number we can work with later.

=== "Code"

    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day1/input.txt")
            .Split "\n\n"
        |> Array.map (fun elf -> elf.Split "\n" |> Array.map int)
    ```

=== "Result"

    ```f#
    val inputData: int array array =
      [|[|1000; 2000; 3000|]; [|4000|]; [|5000; 6000|]; [|7000; 8000; 9000|];
        [|10000|]|]
    ```

## Solving the problem - part one

In part one of this day's problem, we need to find the total number of calories carried by the elf with the most calories.

To do this, I:

- Apply `Array.sum` to every item in the array, to calculate a total for every elf
- Sort descending, to easily get the highest calorie count
- Take the first item from the sorted array

This gives us the following:

=== "Code"

    ```f#
    let partA (elves: int [] []) : int =
        elves
        |> Array.map Array.sum
        |> Array.sortDescending
        |> (fun (array: int []) -> array[0])

    let partAAnswer = partA inputData
    ```

=== "Result"

    ```f#
    val partA: elves: int array array -> int
    val partAAnswer: int = 24000
    ```

## Solving the problem - part two

The only difference between part one and part two is the number of top elves they want data from. In comparison to part one where they wanted the calorie count for the elf carrying the most calories, in part two they want the total number of calories.

To go from the existing solution to this requires only a couple of tweaks:

- Rather than taking the top elf, take the top 3 elves
- Apply a second pass of `Array.sum` to the top 3 counts

The resulting code looks like:

=== "Code"

    ```f#
    let partB (elves: int [] []) : int =
        elves
        |> Array.map Array.sum
        |> Array.sortDescending
        |> (fun (array: int []) -> array[0..2])
        |> Array.sum

    let partBAnswer = partB inputData
    ```

=== "Result"

    ```f#
    val partB: elves: int array array -> int
    val partBAnswer: int = 45000
    ```

## Cleaning up

Now that I've got a solution that works well enough to secure my position on the leaderboard, I can focus my attention on trying to clean up my solution.

The first target for my cleanup was removing the two different solution functions. As both parts of the problem basically ask for the exact same thing (sum of the top `n` elves calorie counts), the exact same operations can be applied for both problems, just with a varying number. As a result, we can combine the two separate part's functions into a single function, like this:

=== "Code"

    ```f#
    let maxNElves (elves: int [] []) (n: int) : int =
        elves
        |> Array.map Array.sum
        |> Array.sortDescending
        |> (fun (array: int []) -> array[.. n - 1])
        |> Array.sum

    let partA = maxNElves inputData 1
    let partB = maxNElves inputData 3
    ```

=== "Result"

    ```f#
    val maxNElves: elves: int array array -> n: int -> int
    val partA: int = 24000
    val partB: int = 45000
    ```

The final target for cleanup was the inline `fun array -> array[.. n - 1]` function. I threw it in during development as a quick means of grabbing the elements from the array as I couldn't find a way to get `n` items from an array. But I _knew_ there had to be a function somewhere in the standard library to do that - F# has a baffling number of misc functions to interact with arrays, I figured there was no way they didn't have something as simple as that.

After looking at Jack's solution which was doing basically the exact same thing, I saw that he was using a function in Elixir for doing this called `take`. After searching the F# docs for a function with that name, I found exactly what I was looking for - [`Array.take`](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-arraymodule.html#take).

=== "Code"

    ```f#
    let maxNElves (elves: int [] []) (n: int) : int =
        elves
        |> Array.map Array.sum
        |> Array.sortDescending
        |> Array.take n
        |> Array.sum

    let partA = maxNElves inputData 1
    let partB = maxNElves inputData 3
    ```

=== "Result"

    ```f#
    val maxNElves: elves: int array array -> n: int -> int
    val partA: int = 24000
    val partB: int = 45000
    ```

Replacing that function cleans up the `maxNElves` function pretty much as clean as I can get it, and gives me my final cleaned up solution, which can be found [here](https://github.com/nint8835/AdventOfCode2022/blob/main/Day1/Day1.fsx).
