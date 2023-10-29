---
title: Advent of Code 2022 - Day 3
description: Walkthrough of my solution to Advent of Code 2022 - Day 3's problem
date: 2022-12-03

links:
  - My solution: https://github.com/nint8835/AdventOfCode2022/blob/main/Day3/Day3.fsx

categories:
  - Advent of Code

authors:
  - nint8835
---

![](./assets/day-3.png)

# Advent of Code 2022 - Day 3

The elf in charge of packing for the journey failed to correctly follow instructions, now it's up to us to help locate & prioritize items.

<!-- more -->

## Input

The input for this problem takes the form of a series of newline-separated strings, each containing a set of characters.

```
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

As our processing involves us processing each line, the input parsing for this problem can just use the normal input loading snippet I use as the basis for most problems.

=== "Code"

    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day3/input.txt")
            .Split "\n"
    ```

=== "Result"

    ```f#
    val inputData: string array =
      [|"vJrwpWtwJgWrhcsFMMfFFhFp"; "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";
        "PmmdzqPrVvPwwTWBwg"; "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn"; "ttgJtRGJQctTZtZT";
        "CrZsJsPPZsGzwwsLwLmpwMDw"|]
    ```

## Solving the problem - part one

For part one of today's problem, we need to split each rucksack's contents into the two compartments, and determine the priorities of the items in common between each rucksack.

First, I define a simple utility function to determine the priority of an item, as I'll need to make use of this later. To determine the priority, I construct a string containing the items in order of priority and then take the index of the item in the string and add one (as the indices will be zero-indexed, but priorities start at one).

=== "Code"

    ```f#
    let getPriority (item: char) : int =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .IndexOf item
        + 1
    ```

=== "Result"

    ```f#
    val getPriority: item: char -> int
    ```

Next, I define a utility function for getting the common items between two compartments. I do this by converting both to sets and determining the intersection of the two, then converting that resulting set back into an array.

=== "Code"
    
    ```f#
    let getCommonItems (bag: string * string) : char [] =
        Set.intersect (Set.ofSeq (fst bag)) (Set.ofSeq (snd bag))
        |> Set.toArray
    ```

=== "Result"
    
    ```f#
    val getCommonItems: string * string -> char array
    ```


With these utility functions, I can start to piece together a solution. First, I take the input and break each rucksack into it's two compartments, by splitting each line in half.

I then take those compartments and pass them to the `getCommonItems` utility function I defined to get the common items.

Next, I take each common item in each rucksack, get its priority, and then sum those priorities.

Finally, I take those resulting priorities and sum all of them to get the resulting overall priority.

=== "Code"

    ```f#
    let partA = inputData
                |> Array.map (fun line -> (line[.. line.Length / 2 - 1], line[line.Length / 2 ..]))
                |> Array.map getCommonItems
                |> Array.map (fun common -> common |> Array.map getPriority |> Array.sum)
                |> Array.sum
    ```

=== "Result"

    ```f#
    val partA: int = 157
    ```

## Solving the problem - part two

In part two, the change to the problem is the sets we are performing operations on: rather than taking each line of the input, splitting it in half, and working on the two resulting sets, in part two we need to take groups of three lines from the input and work on those three sets instead.

To do this, I largely just copy/paste the same code and tweak the set usage & set generation - I use `Array.chunkBySize` to split the input into groups of 3 lines, and perform a fold of set intersections over the resulting sets in order to get the resulting set.

=== "Code"
    
    ```f#
    let partB = inputData
                |> Array.chunkBySize 3
                |> Array.map (fun group ->
                    group
                    |> Array.fold (fun acc bag -> Set.intersect acc (Set.ofSeq bag)) (Set.ofSeq group[0])
                    |> Set.toArray
                    |> Array.map getPriority
                    |> Array.sum)
                |> Array.sum
    ```

=== "Result"
    
    ```f#
    val partB: int = 70
    ```

## Cleaning up

For cleaning up this solution, there's really just one main thing that needs fixing: code duplication. As both problems deal with the same thing and just deal with different ways of generating the sets, I can reduce the code duplication by moving both to a single function which takes in a function that splits the input into the necessary groups of strings.

=== "Code"
    
    ```f#
    let calculatePriority (grouper: string [] -> string [] []) (input: string []) : int =
        input
        |> grouper
        |> Array.map (fun group ->
            group
            |> Array.map Set.ofSeq
            |> Array.reduce Set.intersect
            |> Set.toArray
            |> Array.map getPriority
            |> Array.sum)
        |> Array.sum
    ```

=== "Result"
    
    ```f#
    val calculatePriority:
      grouper: (string array -> string array array) -> input: string array -> int
    ```

Then, with this function in place, I can convert the splitting logic from part one and two into functions that can be plugged into this, and then replace the generation of the answers for part one and two with invoking this function, giving a final simplified solution.

=== "Code"
    
    ```f#
    let partAGroups (input: string[]) : string[][] =
        input
        |> Array.map (fun line -> [| line[.. line.Length / 2 - 1]; line[line.Length / 2 ..] |])
    
    let partBGroups (input: string []) : string [] [] = input |> Array.chunkBySize 3

    let partA = inputData |> calculatePriority partAGroups
    let partB = inputData |> calculatePriority partBGroups
    ```

=== "Result"
    
    ```f#
    val partAGroups: input: string array -> string array array
    val partBGroups: input: string array -> string array array

    val partA: int = 157
    val partB: int = 70
    ```
