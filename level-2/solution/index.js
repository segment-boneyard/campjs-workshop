var GithubStream = require('github-stream');
var stream = new GithubStream('facebook/react');

stream
  .appendTo(document.body)
  .start();