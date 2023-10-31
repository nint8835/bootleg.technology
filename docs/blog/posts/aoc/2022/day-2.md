---
title: Advent of Code 2022 - Day 2
description: Walkthrough of my solution to Advent of Code 2022 - Day 2's problem
date: 2022-12-02

links:
  - My solution: https://github.com/nint8835/AdventOfCode2022/blob/main/Day2/Day2.fsx
---

![](./assets/day-2.png)

The battling between elves over who gets which tent has devolved into a giant rock paper scissors tournament. One elf has given us a strategy guide, we need to determine how much that guide is actually going to help us.

<!-- more -->

## Input

The input for this problem takes the form of pairs of characters separated by a space, with each pair being separated by a newline.

```
A Y
B X
C Z
```

To parse the input, I began by adding the same code I use for all my solutions, to read an entire input file into a string.

=== "Code"

    ```f#
    let inputData = System.IO.File.ReadAllText "Day2/input.txt"
    ```

=== "Result"

    ```f#
    val inputData: string = "A Y
    B X
    C Z"
    ```

Then, I split the input on newlines to get each individual pair, and then split each pair on a space to get each character of the pair on its own.

=== "Code"

    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day2/input.txt")
            .Split "\n"
        |> Array.map (fun line -> line.Split " ")
    ```

=== "Result"

    ```f#
    val inputData: string array array =
      [|[|"A"; "Y"|]; [|"B"; "X"|]; [|"C"; "Z"|]|]
    ```

Thankfully, this problem is pretty simple from an input processing perspective - that's all the processing required.

## Solving the problem - part one

In part one of this day's problem, we need to calculate the total score for if we were to follow all the instructions given in the strategy guide. In this part, the first character of the pair represents the opponent's move, and the second character represents our move.

| Move     | Their character | Our character |
| :------- | --------------: | ------------: |
| Rock     |             `A` |           `X` |
| Paper    |             `B` |           `Y` |
| Scissors |             `C` |           `Z` |

As this is a rock paper scissors game, and we need to determine who won, I defined an enum representing win status and defined a nested map mapping their input and our input to an end win state.

=== "Code"

    ```f#
    type WinStatus =
        | Win
        | Loss
        | Draw

    let winMap =
        Map [ ("A",
               Map [ ("X", Draw)
                     ("Y", Win)
                     ("Z", Loss) ])
              ("B",
               Map [ ("X", Loss)
                     ("Y", Draw)
                     ("Z", Win) ])
              ("C",
               Map [ ("X", Win)
                     ("Y", Loss)
                     ("Z", Draw) ]) ]
    ```

=== "Result"

    ```f#
    type WinStatus =
      | Win
      | Loss
      | Draw
    val winMap: Map<string,Map<string,WinStatus>> =
      map
        [("A", map [("X", Draw); ("Y", Win); ("Z", Loss)]);
         ("B", map [("X", Loss); ("Y", Draw); ("Z", Win)]);
         ("C", map [("X", Win); ("Y", Loss); ("Z", Draw)])]
    ```

Then, we need to be able to determine a score for a given input. There are two factors that determine the score: the win status, and the move we made.

=== "Win state"
    
    | Win state | Score |
    | --------- | ----: |
    | Win       |     6 |
    | Draw      |     3 |
    | Loss      |     0 |

=== "Our move"

    | Our move  | Score |
    | --------- | ----: |
    | Rock      |     1 |
    | Paper     |     2 |
    | Scissors  |     3 |

To account for this, I added another two maps to store these score mappings.

=== "Code"

    ```f#
    let scoreMap =
        Map [ ("X", 1); ("Y", 2); ("Z", 3) ]

    let winScoreMap =
        Map [ (Win, 6); (Draw, 3); (Loss, 0) ]
    ```

=== "Result"

    ```f#
    val scoreMap: Map<string,int> = map [("X", 1); ("Y", 2); ("Z", 3)]
    val winScoreMap: Map<WinStatus,int> = map [(Win, 6); (Loss, 0); (Draw, 3)]
    ```

Finally, we have all the pieces in place to calculate a score for a given input. This takes the form of the following:

=== "Code"

    ```f#
    let getScore (line: string []) : int =
        let theirMove = line[0]
        let ourMove = line[1]

        winScoreMap[winMap[theirMove][ourMove]]
        + scoreMap[ourMove]
    ```

=== "Result"

    ```f#
    val getScore: line: string array -> int
    ```

Then, it's just a matter of applying this function to each input and summing the results, and we'll have an answer for part one.

=== "Code"

    ```f#
    let partA =
        inputData |> Array.map getScore |> Array.sum
    ```

=== "Result"

    ```f#
    val partA: int = 15
    ```

## Solving the problem - part two

Part two is basically the same as part one, with the only difference being the meaning of the input. In part two, rather than the second character in each input representing the move we make, it represents the desired game state.

| Input | Desired game state |
| ----- | ------------------ |
| `X`   | Lose               |
| `Y`   | Draw               |
| `Z`   | Win                |

To account for this, I add yet another map - this one mapping their move and our desired game state into the move we need to take to get that state.

=== "Code"

    ```f#
    let moveMap =
        Map [ ("A",
               Map [ ("X", "Z")
                     ("Y", "X")
                     ("Z", "Y") ])
              ("B",
               Map [ ("X", "X")
                     ("Y", "Y")
                     ("Z", "Z") ])
              ("C",
               Map [ ("X", "Y")
                     ("Y", "Z")
                     ("Z", "X") ]) ]
    ```

=== "Result"

    ```f#
    val moveMap: Map<string,Map<string,string>> =
      map
        [("A", map [("X", "Z"); ("Y", "X"); ("Z", "Y")]);
         ("B", map [("X", "X"); ("Y", "Y"); ("Z", "Z")]);
         ("C", map [("X", "Y"); ("Y", "Z"); ("Z", "X")])]
    ```

Then, we just modify the function defined earlier to use this map to determine the move we make, rather than using the input value directly.

=== "Code"

    ```f# hl_lines="3"
    let getPartBScore (line: string []) : int =
        let theirMove = line[0]
        let ourMove = moveMap[theirMove][line[1]]

        winScoreMap[winMap[theirMove][ourMove]]
        + scoreMap[ourMove]
    ```

=== "Result"

    ```f#
    val getPartBScore: line: string array -> int
    ```

Finally, like before, we can run this function on every item in the input and sum the results to end up with an answer for part two.

=== "Code"

    ```f#
    let partB =
        inputData |> Array.map getPartBScore |> Array.sum
    ```

=== "Result"

    ```f#
    val partB: int = 12
    ```

## Cleaning up

First candidate for cleanup is (as always) the two separate functions. Since they were basically entirely the same, except for how they handled getting our move, I split the logic for determining our move into a couple of functions and made the score function take in one of those functions as a parameter.

=== "Code"

    ```f#
    let useDirectly (_: string) (ourMove: string) : string = ourMove
    let desiredWinStatus (theirMove: string) (ourMove: string) : string = moveMap[theirMove][ourMove]

    let getScore (line: string []) (scoreGetter: string -> string -> string) : int =
        let theirMove = line[0]
        let ourMove = line[1]

        let ourFinalMove =
            scoreGetter theirMove ourMove

        winScoreMap[winMap[theirMove][ourFinalMove]]
        + scoreMap[ourFinalMove]
    ```

=== "Result"

    ```f#
    val useDirectly: string -> ourMove: string -> string
    val desiredWinStatus: theirMove: string -> ourMove: string -> string
    val getScore:
      line: string array -> scoreGetter: (string -> string -> string) -> int
    ```

Then, we can just call the function with different sets of arguments to switch between calculating part one and part two.

=== "Code"

    ```f#
    let partAScore =
        inputData
        |> Array.map (fun input -> getScore input useDirectly)
        |> Array.sum

    let partBScore =
        inputData
        |> Array.map (fun input -> getScore input desiredWinStatus)
        |> Array.sum
    ```

=== "Result"

    ```f#
    val partAScore: int = 15
    val partBScore: int = 12
    ```

This removes our duplicate function definitions, but unfortunately still leaves us with a fairly lengthy solution, with our various maps making up the vast majority of the space.

## Cleaning up, round two: unexpected math edition

In an attempt to get rid of all the maps from my code, I sat down with a notepad and a spreadsheet and mapped out every input pair combo, and it's resulting score value for part one and two. This gave me the following:

=== "Part one"

    |       | X | Y | Z |
    |-------|---|---|---|
    | **A** | 4 | 8 | 3 |
    | **B** | 1 | 5 | 9 |
    | **C** | 7 | 2 | 6 |

=== "Part two"

    |       | X | Y | Z |
    |-------|---|---|---|
    | **A** | 3 | 4 | 8 |
    | **B** | 1 | 5 | 9 |
    | **C** | 2 | 6 | 7 |

Upon looking at it, you can spot a clear pattern in both of them. Each column has a consistent difference between row values (3 for part one, 1 for part two), and each column has a consistent offset from each other as well.

From there, I sat down and attempted to figure out an equation for each that'd give me the desired result. I treated `A` / `B` / `C` as the values `1`, `2`, and `3` respectively for a variable `m`, and `X`, `Y`, and `Z` the same for variable `n`.

After looking for a while, I reached the following equations:

- Part one: $(3 \times ((1 + n - m) \mod 3)) + n$
- Part two: $(3 \times (n - 1)) + ((m + n) \mod 3) + 1$

With these equations, we can entirely remove all of our rock paper scissors logic, maps, etc. and replace it with a bit of math. First step is converting our letter inputs into their numeric counterparts. A quick way to do this is to put them in a string side by side, and take $(index \mod 3) + 1$, like so:

=== "Code"

    ```f#
    let getCharCode (char: string) : int = ("ABCXYZ".IndexOf char) % 3 + 1
    ```

=== "Result"

    ```f#
    val getCharCode: char: string -> int
    ```

Next, we update our input parsing to turn inputs into equation variables. We also turn the variables into a tuple, so we can use `||>` later to automatically pass both the `m` and `n` variables for each input.

=== "Code"

    ```f#
    let inputData =
        (System.IO.File.ReadAllText "Day2/input.txt")
            .Split "\n"
        |> Array.map (fun line -> line.Split " " |> Array.map getCharCode)
        |> Array.map (fun line -> (line[0], line[1]))
    ```

=== "Result"

    ```f#
    val inputData: (int * int) array = [|(1, 2); (2, 1); (3, 3)|]
    ```

Then, we can take our equations and convert them both into F# functions, getting the following:

=== "Code"

    ```f#
    let partA (m: int) (n: int) : int = (3 * ((1 + n - m) % 3)) + n
    let partB (m: int) (n: int) : int = (3 * (n - 1)) + ((m + n) % 3) + 1
    ```

=== "Result"

    ```f#
    val partA: m: int -> n: int -> int
    val partB: m: int -> n: int -> int
    ```

Finally, we can replace our old functions, maps, and all that with just passing variables into the equations.

=== "Code"

    ```f#
    let partAScore =
        inputData
        |> Array.map (fun line -> line ||> partA)
        |> Array.sum

    let partBScore =
        inputData
        |> Array.map (fun line -> line ||> partB)
        |> Array.sum
    ```

=== "Result"

    ```f#
    val partAScore: int = 15
    val partBScore: int = 12
    ```

Running it on the example input successfully gets us the example output! _But_, running it on our own input gives us the wrong results, for some reason!?

Indeed, turns out F#'s modulo operator behaves differently from other programming languages I'm familiar with, in particular with performing modulo on a negative number, like would happen for an input of $n = 1; m = 3$ (`A Z`), which _doesn't appear in the example inputs_!

After a bit of searching, I found [this](https://stackoverflow.com/a/35848799) StackOverflow answer which explains the difference in behaviour, and also provides a custom `%!` operator which behaves as expected.

After dropping this operator into my code and replacing all existing uses of `%`, we finally end up with the expected result.

=== "Code"
    
    ```f#
    let inline (%!) a b = (a % b + b) % b

    let partA (m: int) (n: int) : int = (3 * ((1 + n - m) %! 3)) + n

    let partB (m: int) (n: int) : int = (3 * (n - 1)) + ((m + n) %! 3) + 1
    ```

=== "Result"

    ```f#
    val inline (%!) :
      a: ^a -> b: ^b -> 'e
        when (^a or ^b) : (static member (%) : ^a * ^b -> ^c) and
             (^c or ^b) : (static member (+) : ^c * ^b -> ^d) and
             (^d or ^b) : (static member (%) : ^d * ^b -> 'e)
    val partA: m: int -> n: int -> int
    val partB: m: int -> n: int -> int
    ```

This leaves us with a solution that is for the most part is as clean as I care about making it. There are some things I know I can clean up (such as combining the logic for getting part one and part two's scores into a single function that just takes in one of the equation functions as a parameter), but that would provide a minimal cleanup overall, and that effort is better spent cleaning up one of the messier day's solutions.