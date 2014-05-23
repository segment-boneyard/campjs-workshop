# Level 2 - Structuring an Application

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

Local components are an important part of application development. Not all components need to be generic and public. There are often components that are very specific to your application that aren't worth sharing but they should still be modular.

In the starter template, we have some local components in `lib`. We need to add these components as dependencies so that we can require them.

```json
{
  "name": "page",
  "local": [
    "form",
    "log",
    "message"
  ],
  "paths": [
    "lib"
  ],
  "scripts": ["index.js"],
  "styles": ["styles.css"],
  "dependencies": {
    "necolas/normalize.css": "*"
  }
}
```

The important changes here are `paths` and `local`. These tell component to look in the `lib` directory for local components, then we need to list them out.

We can then require these components like any other. In `index.js`, you'll need to require these:

```js
var Form = require('form');
var Log = require('log');
```

Now that we have access to these three local components we can:

1. Create a new message form
2. Create a new message log
3. Listen for the 'submit' event on the form

Start by creating new views:

```js
var form = new Form();
var log = new Log();
```

Then append them to the page:

```js
document.body.appendChild(log.el);
document.body.appendChild(form.el);
```

Now we have two views that we can place on the page. Now we hould listen for the submit event like the previous examples.

```js
form.on('submit', function(data){
  
});
```

## Step 3 - Connecting WebSockets

Now we need to connect this chat application to the chat server. For this we're using WebSockets.

```js
var socket = new WebSocket('ws://anthonyshort.local:3000');

socket.onmessage = function(event) {
  log.add(JSON.parse(event.data));
};
```

This adds a new `Message` view to the `log` whenever the server sends down a new message.

Now on form submit we need to post a new message to the server:

```js
form.on('submit', function(data){
  socket.send(JSON.stringify(data));
});
```