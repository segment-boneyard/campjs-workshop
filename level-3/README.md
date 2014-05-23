# Level 3 - Structuring an Application

## Problem

Structure an application using many small, testable components so that is scalable and flexible.

## Goals

* Understand how to structure a scalable application using components
* Understand how component(1) fits into a build process
* Building CSS "theme" components

## Step 1 - CSS Components

Writing modular CSS components is difficult. Every CSS selector is global so there are often cases where there are clashes in names. To help avoid this we write our CSS in a similar way to our JavaScript using BEM-style naming conventions.

Let's say we have a `Modal` constructor in our JS. Our theme for the modal will look like this:

```css
.Modal {
    // Styles
}
```

The selector name matches the constructor name. When a large application is built this way it's extremely easy to know where styles are applied.

We then have "modifiers". These are classes that change the state of the component. Think "open", "closed", or "error".

```css
.Modal--open {
    // Styles
}
```

These are denoted by two dashes and are applied at the top-level. 

Views will have child elements. In this case it might be a close button.

```css
.Modal-closeButton {
    
}
```

We separate child components with a single dash and name them camel-cased. 

This may seem pointless for CSS but it follows the rules of components. They should be simple and only touch things that belong to them. CSS in a component should *never* touch another component and you should *never* change a component's styles just because it is inside of another component. Instead, use modifiers.

For more reading on this, see the [SUIT CSS](https://github.com/suitcss/suit) docs.

## Step 2 - Local Components

