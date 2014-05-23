# Level 1
## Component Basics

### Problem

Create a form that emits an event when it is submitted and then console.log that value to the console. 

### Goals

* Use Component to create a basic package composed of HTML, CSS and JS.
* Understand the basics of Component
* Understand the different ways to build a component
* Understand how to initialize components on the page

### Step 1 - component.json

Copy the "starter" folder to a new directory. This template includes everything we need for a component, all we have to do is setup the `component.json` file and build it.

The template includes styles and scripts already written. We'll focus on component for now and how it works. We'll get into creating our own component in the next level.

Create a `component.json` file in the project and add this:

```json
{
    "name": "form"
}
```

This is the name of our component and is what we will call when we use 
`require` in our scripts.

Now we need to tell component about the files in this package. First, lets add scripts:

```json
{
    "name": "form",
    "scripts": [
        "index.js",
        "lib/form/index.js"
    ]
}
```

This adds the script to the component so that we can require it. Each component has an "entry point" that is used when other components reference this one. By default it is `index.js`.

Now let's add styles.

```json
{
    "name": "form",
    "scripts": [
        "index.js",
        "lib/form/index.js"
    ],
    "styles": [
        "styles.css",
        "lib/form/index.css"
    ]
}
```

Now when we build our component it will add the styles for this component (and any dependencies) and join them together to create the output. Components should only include styles for their own elements and should avoid using global styles.

Lastly, we need to add the templates so we can `require` them in our script:

```json
{
    "name": "form",
    "scripts": [
        "index.js",
        "lib/form/index.js"
    ],
    "styles": [
        "styles.css",
        "lib/form/index.css"
    ],
    "templates": [
        "lib/form/template.html"
    ]
}
```

Now we've fully defined all the different types of files in our component and learnt about the 3 main file types.

### Step 2 - Dependencies

We need to add some dependencies to this project. Navigate to your working directory in terminal and run each of these commands

```
component install component/domify
component install component/emitter
component install necolas/normalize.css
```

This will install normalize into the project into the `/components` folder and add them to `component.json` with the correct versions.

`domify` will turn a string of HTML into real DOM elements and `emitter` allows us to turn anything into an event emitter. Our form uses a template `lib/form.html` and emits a `submit` event whenever the form is submitted.

Alternatively, you can add dependencies manually to the `component.json` and then run `component install`. 

### Step 3 - building

Now that we've defined our component and installed our dependencies we need to build the component. You can do this by running:

```
component build
```

This will build out the component and give us a `build` directory. When building a component all of the dependencies are brought together to give us two files we can use on our page, a `build.js` and `build.css`.

Link to both of these in `index.html`:

```html
<html>
<head>
  <title>Form Demo</title>
  <link rel="stylesheet" type="text/css" href="build/build.css">
</head>
<body>
  <script src="build/build.js"></script>
</body>
</html>
```

### Step 4 - Creating the form

Now we need to use the component we just created. Inside `index.js` we need to require the form:

```js
var Form = require('./lib/form');
```

Now create a new form and add it to the page using the API this component exposes:

```js
var form = new Form();
form.appendTo(document.body);
```

If you open up `index.html` you'll see the form on the page now — but it doesn't do anything! Let's listen for the `submit` event on the form that we're emitting using `component/emitter`:

```js
form.on('submit', function(value){
  console.log(value);
});
```

When typing into the textarea and hitting submit, you should see the value of the field logged to the console.

### Advanced - Local Components

In real applications you won't list out each of your sub-components like we have just done. Instead you'll have a bunch of local components that are specific to the application.

Let's make the `form` it's own component. Add a `component.json` file to `/lib/form`. 

```json
{
  "name": "form",
  "scripts": ["index.js"],
  "styles": ["index.css"],
  "templates": ["form.html"],
  "dependencies": {
    "component/domify": "^1.2.2",
    "component/emitter": "^1.1.2"
  }
}
```

We've moved the dependencies into this component since the `index.js` here is the one that is using them.

Now we can update the parent `component.json`:

```json
{
  "name": "page",
  "local": ["form"],
  "paths": ["lib"],
  "scripts": ["index.js"],
  "styles": ["styles.css"],
  "dependencies": {
    "necolas/normalize.css": "*"
  }
}
```

The main difference here is the `paths` and `local` field. `paths` tells component to use "lib" as a lookup path for components. Then we add "form" as a local dependencies. This is essentially the same as adding it in the `dependencies` object. This means we can do `require('form')` from our parent component.

See the **Advanced Solution** to see this working.

### Challenge

Using `component/notification` create a notification whenever the form is submitted with the current text field value, then clear the field.
