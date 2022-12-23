---
title: Advent of Code 2022 - Day 6
description: Walkthrough of my solution to Advent of Code 2022 - Day 6's problem
date: 2022-12-06

links:
  - My solution: https://github.com/nint8835/AdventOfCode2022/blob/main/Day3/Day6.fsx

categories:
  - Advent of Code
---

![](./assets/day-6.png)

# Advent of Code 2022 - Day 6

The elves gave us a malfunctioning communication device, now we need to build software to help fix it.

<!-- more -->

## Input

The input for this problem takes the form of a single line, consisting of assorted ASCII characters. For simplicity of testing, I tweaked the input a little, making it a series of multiple lines of characters, where each line is a complete problem input. When attempting to get the solution for the actual problem, the input will just be a single line, that line being our input, and we'll just take the first of each solution output.

```
mjqjpqmgbljsphdztnvjfqwrcgsmlb
```

As our processing involves us processing each line, the input parsing for this problem can just use the normal input loading snippet I use as the basis for most problems.

=== "Code"

    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day6/input.txt")
            .Split "\n"
    ```

=== "Result"

    ```f#
    val inputData: string array =
      [|"mjqjpqmgbljsphdztnvjfqwrcgsmlb"; "bvwbjplbgvbhsrlpgdmjqwftvncz";
        "nppdvjthqldpwncqszvftbrmjlhg"; "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
        "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"|]
    ```

## Solving the problem - part one

For part one, we need to find the number of characters which need to be processed before the first sequence of 4 non-repeating characters is found.

To do this, for each line I:

- Convert the line to an array of characters
- Convert that array into a series of sliding windows of each 4 character sequence
- For each window, convert the array into a set and get the length of that set
- Find the index at which there is the first value of 4, meaning the conversion to a set never removed any duplicate characters
- Add 4 to the index, as the index does not include the characters in the window itself we had to check to ensure they were not duplicates.

This results in the following code:

=== "Code"
    
    ```f#
    let partA =
        inputData
        |> Array.map (fun line ->
            line
            |> Array.ofSeq
            |> Array.windowed 4
            |> Array.map (fun window -> (window |> Set.ofArray |> Set.count))
            |> Array.findIndex (fun uniqueCount -> uniqueCount = 4)
            |> (fun index -> index + 4))
    ```

=== "Result"
    
    ```f#
    val partA: int array = [|7; 5; 6; 10; 11|]
    ```

## Solving the problem - part two

For part two, the only change is the size of the window. As a result, I can just copy/paste all the code for part one and change any instances of `4` to `14` (the new window size).

=== "Code"
    
    ```f#
    let partB =
        inputData
        |> Array.map (fun line ->
            line
            |> Array.ofSeq
            |> Array.windowed 14
            |> Array.map (fun window -> (window |> Set.ofArray |> Set.count))
            |> Array.findIndex (fun uniqueCount -> uniqueCount = 14)
            |> (fun index -> index + 14))
    ```

=== "Result"
    
    ```f#
    val partB: int array = [|19; 23; 23; 29; 26|]
    ```

## Cleaning up

As per usual, the first step in cleanup is to combine the code for part one and two. As the only difference is a single number in a few places, that number can just be made an argument to trivially make the solution work for both parts.

=== "Code"
    
    ```f#
    let findMarker (size: int) (input: string []) : int [] =
        input
        |> Array.map (fun line ->
            line
            |> Array.ofSeq
            |> Array.windowed size
            |> Array.map (fun window -> (window |> Set.ofArray |> Set.count))
            |> Array.findIndex (fun uniqueCount -> uniqueCount = size)
            |> (fun index -> index + size))

    let partA = inputData |> findMarker 4
    let partB = inputData |> findMarker 14
    ```

=== "Result"
    
    ```f#
    val findMarker: size: int -> input: string array -> int array

    val partA: int array = [|7; 5; 6; 10; 11|]
    val partB: int array = [|19; 23; 23; 29; 26|]
    ```

Next, I wanted to get rid of the inline functions I was defining just to use simple operators. I learned that in F# you can use `(OPERATOR)` (so, for example, `(+)`) in order to get an operator as a function, so I used this to replace the functions passed to `Array.findIndex` and the last step in the pipeline with simple operator compositions, resulting in the following slightly cleaned function:

=== "Code"
    
    ```f# hl_lines="8-9"
    let findMarker (size: int) (input: string []) : int [] =
        input
        |> Array.map (fun line ->
            line
            |> Array.ofSeq
            |> Array.windowed size
            |> Array.map (fun window -> (window |> Set.ofArray |> Set.count))
            |> Array.findIndex ((=) size)
            |> (+) size)

    let partA = inputData |> findMarker 4
    let partB = inputData |> findMarker 14
    ```

=== "Result"
    
    ```f#
    val findMarker: size: int -> input: string array -> int array

    val partA: int array = [|7; 5; 6; 10; 11|]
    val partB: int array = [|19; 23; 23; 29; 26|]
    ```

Finally, since I was confident in my solution and didn't need the extra testability, I removed the handling of multi-line inputs to simplify the code, resulting in the following final answer:

=== "Code"
    
    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day6/input.txt")

    let findMarker (size: int) (input: string) : int =
        input
        |> Array.ofSeq
        |> Array.windowed size
        |> Array.map (fun window -> (window |> Set.ofArray |> Set.count))
        |> Array.findIndex ((=) size)
        |> (+) size

    let partA = inputData |> findMarker 4
    let partB = inputData |> findMarker 14
    ```

=== "Result"
    
    ```f#
    val inputData: string = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"

    val findMarker: size: int -> input: string -> int

    val partA: int = 7
    val partB: int = 19
    ```