---
title: Advent of Code 2022 - Intro
description: Kicking off the Advent of Code 2022 blog series
date: 2022-12-01

links:
  - My solutions: https://github.com/nint8835/AdventOfCode2022
  - Jack's posts: https://www.cs.mun.ca/~jaharrhy/aoc/2022/

categories:
  - Advent of Code
---

![](./assets/intro.png)

# Advent of Code 2022 - Intro

Another year nearly over, and another December is upon us. _You know what that means?_ Time for another month of Advent of Code!

<!-- more -->

## About this series

Inspired by [Jack's posts](https://www.cs.mun.ca/~jaharrhy/aoc/2022/) (and as a reason to finally get the motivation to do some writing on this site), I plan on writing about all the problems I manage to complete this year.

My goal is primarily to document the (rough) process I took going from problem → initial solution → simplified solution, explaining any tricks I identified to solve the problems, all the while practising my skills of doing this kind of writing.

My primary priority is on completing AoC problems as quick as possible, and as a result writing a post for a solution will be the last (and least urgent) step of my process. This means in some occasions these posts will be written on a different day from the day they are for. In these cases, the date on the post will be set to the date of the problem it is meant for, regardless of what day it was written on, in order to have everything in the series line up neatly.

## My solutions

Like last year, I intend to write my solutions this year in [F#](https://fsharp.org/), Microsoft's functional language for the .NET framework. I picked it somewhat randomly for last year's Advent of Code when looking for something to add an extra gimmick to my solutions, and ended up being pleasantly surprised by the breadth of functionality that was helpful for solving Advent of Code's type of problems. It includes things such as:

- [An extensive selection of functions for manipulating arrays](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-arraymodule.html), including functions for generating sliding windows, splitting into chunks of a certain size / a certain number of chunks
- [Pattern matching](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching)
- A dedicated [2D array data type](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-array2dmodule.html), with functions for working on individual dimensions (rows / columns)

I considered a couple of other languages for this year (C# and OCaml), but after trying to get 2021's Day 1 solved in them, I just found them far more painful to work with, so fell back to F#.

I'll be writing all my solutions as F# Interactive scripts (`.fsx` files), and they can all be found [on my GitHub](https://github.com/nint8835/AdventOfCode2022).
