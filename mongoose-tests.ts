// Demo from : http://mongoosejs.com/

/// <reference path="./mongoose.d.ts"/>
import mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

function definingModel() {
  var BlogPost = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
  });

  var Comment = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer
  });

  function capitalize(foo:string) {
    return foo;
  }

// a setter
  Comment.path('name').set((v:string) => {
    return capitalize(v);
  });

  function notify(foo:string) {
  }

// middleware
  Comment.pre('save', function (next:Function) {
    notify(this.get('email'));
    next();
  });
}

function accessingModel() {
  var myModel = mongoose.model('ModelName');
  var MyModel = mongoose.model('ModelName', Schema);

  var instance = new MyModel();
  instance.my.key = 'hello';
  instance.save((err:any) => {
    //
  });

  MyModel.find({}, function (err:any, docs:any[]) {
    // docs.forEach
  });

  var conn = mongoose.createConnection('your connection string');
  var MyModel = conn.model('ModelName', new Schema({}));
  var m = new MyModel;
  m.save() // work
}

function embeddedDocs() {
// retrieve my model
  var BlogPost = mongoose.model('BlogPost');

// create a blog post
  var post = new BlogPost();

// create a comment
  post.comments.push({ title: 'My comment' });

  post.save(function (err:any) {
    if (!err) console.log('Success!');
  });

  BlogPost.findById('000000000000000000000000000', function (err, post) {
    if (!err) {
      post.comments[0].remove();
      post.save(function (err:any) {
        // do something
      });
    }
  });
}

function middleware() {
  var schema = new Schema({});

  schema.pre('set', function (next:Function, path:string, val:any, typel:any) {
    // `this` is the current Document
    this.emit('set', path, val);

    // Pass control to the next pre
    next();
  });

  schema
    .pre('method', function firstPre(next:Function, methodArg1:any, methodArg2:string) {
      // Mutate methodArg1
      next("altered-" + methodArg1.toString(), methodArg2);
    })

    // pre declaration is chainable
    .pre('method', function secondPre(next, methodArg1:string, methodArg2:string) {
      console.log(methodArg1);
      // => 'altered-originalValOfMethodArg1'

      console.log(methodArg2);
      // => 'originalValOfMethodArg2'

      // Passing no arguments to `next` automatically passes along the current argument values
      // i.e., the following `next()` is equivalent to `next(methodArg1, methodArg2)`
      // and also equivalent to, with the example method arg
      // values, `next('altered-originalValOfMethodArg1', 'originalValOfMethodArg2')`
      next();
    })
}
