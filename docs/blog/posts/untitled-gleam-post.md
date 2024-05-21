---
title: Untitled Gleam Post
description: My experience trying Gleam
date: 2024-05-21
draft: true
---

TODO: Insert preview text & image here

<!-- more -->

# The Context

My friends and I periodically run small private game jams within our friend group. I realized years ago that game dev is _not really_ my kind of thing, so for me these game jams are less a game dev event and more of an excuse to play around with weird tech choices. This one was no exception. In April of this year, we hosted the [Conjam](https://www.cs.mun.ca/~jaharrhy/gamedev/jams/conjam-apr2024/), a jam where the goal is to build a falling sand / Conway's Game of Life / cellular automata-based game. I opted to just implement a fairly standard falling sand game, and I decided I wanted to target my game to the web. This substantially limited my choices, and in the end I opted to go with Gleam, running in the browser.

# What is Gleam?

To quote the [Gleam website](https://gleam.run):

> Gleam is a friendly language for building type-safe systems that scale!

What that means, in practice, is that it's a strongly-typed language, implemented in Rust, with quite clean syntax, that compiles to two targets - Erlang and Javascript. It's quite a new language (development started in 2016, with the first numbered version being released in 2019, and 1.0 only being released earlier this year), but it is remarkably mature despite that.
