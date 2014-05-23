# Thinking with components

The idea with components is that you will package up HTML, CSS and JS together into a single re-usable module. This is different from how a lot of traditional front-end code is written. We don't have a giant folder full of JavaScript and another folder full of styles and hope they fit together.

## Goals

* How package management works in the browser
* Component.io
* Creating a simple component
* Get away from building monolithic front-end libraries

## Assumed Knowledge

* Intermediate level of JavaScript experience
* Basic level of CSS experience
* Basic understanding of package managers
* You know how to write a JSON file
* Basic understanding of Git

If you're unsure about any of these topics go and do some basic reading before the workshop.

## Requirements

You'll need a few things installed before attending the workshop so you can be ready to start straight away. If you can't get these installed there will be plenty of people available on the Friday that can help get you setup. 

### Node

You'll need node 0.10 installed. For both Mac and Windows you can get this from the [node.js website](http://nodejs.org).

### Component

After node is installed, you need to install Component.

```
npm install -g component@~1
```

To check if this is installed run `component --version` on the command line. We're going to use the release candidate for this workshop.

### Chrome

To keep the class consistent we'll be using chrome during the workshop. This isn't a hard requirement but it will make it easier if we're all using the same browser.

### Are you using Windows?

Good luck. You might want to dual-boot or use a VM. I can't guarantee everything will work on Windows simply because we don't use them.

## Reading

Here are some additional links for Thinking in Components:

### Building Better Components
https://github.com/component/component/wiki/Building-better-components

One of the original articles written by TJ about Component.

### SUIT CSS
https://github.com/suitcss/suit

Writing component-based CSS is also very, very important.

### Component Guide
https://github.com/component/guide

Community-driven guide to using Component  

Learn how to write component-based code for the browser using Component.io.

## Workshop Structure

### Introduction

* What is Component
* How to write code in components
* How it fits in with Web Components
* Overview of the session
* Discuss the goals

### Level 1 - The Basics

**Goal**: Understand what a component is, how it's different to npm. Know how to create one and put it on Github.

* Create a basic component with HTML, CSS, JS
* Put it up on Github
* About CommonJS
* About structural styling
* Writing CSS as components
* Requiring templates
* Makefiles

### Level 2 - Writing Components

**Goal**: Understand how to write good component-based JS and CSS. Know where to find new components to use in projects. 

### Level 3 - Structuring an Application

**Goal**: Know how to integrate component into an app

* Create a boot component that requires the previous one
* Where to find components
* Require the components from other groups
* Create a local component for styles

### Level 4 - Advanced

**Goal**: Understand how to implement Component into larger apps. Create a custom builder.
