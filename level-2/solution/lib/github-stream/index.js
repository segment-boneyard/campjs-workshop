var request = require('superagent');
var domify = require('domify');
var template = require('./template.html');

function skim(arr, n) {
  return arr.slice(0, n);
}

function GithubStream(project) {
  this.project = project;
  this.url = 'https://api.github.com/repos/'+project+'/commits';
  this.interval = 60000;
  this.limit = 10;
  this.since = new Date();
  this.el = domify(template);
  this.update();
}

GithubStream.prototype.update = function() {
  var self = this;

  request
    .get(this.url)
    .query({
      since: this.since
    })
    .end(function(err, res){
      self.since = new Date();
      self.render(res.body);
    });
};

GithubStream.prototype.clear = function() {
  this.el.innerHTML = "";
};

GithubStream.prototype.render = function(commits) {
  var self = this;
  this.clear();
  skim(commits, this.limit).forEach(function(commit){
    var view = new Commit(commit);
    view.appendTo(self.el);
  });
};