# Project Assignment: Polling App

## Background

We have an important event coming up. There will be a lot of technical people at this event, both employers and job seekers. We would like to get a sense of what technologies people are using in the field, so we get a better idea of what technologies we want to teach and use at XYZ University. We love web development, so let's create a web app to do this!

## Your Assignment

Create a web app to use for a poll.

**User**

We don't think that the general population will be interested in our poll, so your user will be Professor Smith from XYZ University who will be having conversations with event attendees. She will be entering the poll responses into the app.

**Requirements**

Professor Smith sat down with us last week and told us a little about what she is looking for. Let us relate to you now what she said. She wants to be able to talk to attendees and ask what technologies they use to manipulate the [Document Object Model](https://www.w3.org/TR/1998/WD-DOM-19980720/introduction.html). In particular, she wants to compare usage of HTML DOM, JQuery, Angular, and React. We asked her how she would like to compare usage. She told us that a simple count of attendees using each method will suffice. She wants the data to persist, so that she can come back to it later.

**Implementation**

We use React, so let's create a React application. It sounds like we need a list of technologies, and we want to be able to increment a counter for each technology. We know it is easy to make mistakes, so let's add the ability to decrement, too. Keep in mind, there can never be a negative count, so let's be sure to not allow a decrement below 0. We suggest that you set up DynamoDB locally, but if you want to use Mongo, [MLab](https://mlab.com/) is a good choice for MongoDB hosting.

**styling bonus**: You can try using [plus circle](https://fontawesome.com/icons/plus-circle?style=solid) and [minus circle](https://fontawesome.com/icons/minus-circle?style=solid) icons from [font-awesome](https://fontawesome.com/start) for some nice icons for the increment and decrement. If you have another icon solution you like (glyphicons, material-ui), feel free to try that instead.

[Let us know](https://github.com/un-loop/PollProject/blob/master/instructions/PART2.md) when you are finished.

# Notes

Your task will involve modifying your fork of the PollProject repository. If you take a look at the existing code, you will see that it is a simple app to show a list of cats with an option to add cats to the list. 

The first step you will need to take before running the app is ensuring your local DynamoDB instance is running. DynamoDB is a database service from amazon that runs in the cloud. We have not setup up a cloud service for this example, so you will need to have a service that you run locally on your machine to test against. Even if we did have a cloud service configured, testing against a local DB instance when developing is a very common development practice. You do not want to do your testing against a production database, and it's often expensive to have a test database in the cloud for every developer who will be developing your app. What this means is that you will need to be sure that your database service is started before you run your server. If you followed the previous instructions on setting up DynamoDB to run locally, this should be as simple as starting up a script.

Once your database service is running, you can start your app via ```npm start``` to start listening on port 3000. Browse to http://localhost:3000 to view the app an you should see something like:

![screenshot of default site](./assets/CatsRule.png "cats rule")

## Project Structure

Let's take a moment to talk about the directory structure of the PollProject project.

![project files](./assets/projectfiles.png "project files")

You have the following top-level directories:
* .vscode

  Contains configuration files relevant to Visual Studio. You do not need to pay attention to this folder.

* client

  Contains the client facing code. Everything in this folder (except the webpack) is served as a static site. Since this is a single page app, we only have index.html, index.jsx, and bundle.js files.
  
* components

  Contains all of the React components we will use on the site.
  
* instructions

  Contains the files needed for the instructions that you are reading now. There is no code here.
  
* node_modules

  Contains all of the downloaded modules we depend on. These files are managed by npm.
  
* server

  Contains the server side code. server.js is our server that node will run to start our website. dbcontext.js is a file that configures the azure sdk to connect to our db and provides our database code with the objects needed to communicate with the sdk. You do not need to modify this file. We also have two subdirectories here.
  * entity
  
    Contains information about our entities (in this case, cats) so that we can interface with DynamoDB. We will talk more about this later.
  * resources
    Contains the code to implement a resource in our Rest API. More about this later when we talk about Rest APIs.
   
## Debugging

Debugging is an important part of software development. Visual Studio Code has a built-in [debugger](https://code.visualstudio.com/Docs/editor/debugging) to help you inspect your code for defects. It allows you to step through your code, line-by-line, inspect the state of your variables, set breakpoints, change the values of variables during execution, and more. Typically, when using the debugger, you will tell the debugger to "attach" to you server, so that it knows what code it should manage. Firstly, you will need to select the configuartion to use, "Attach by Process ID":

![screenshot of selecting launch cofiguration](./assets/launchconfig.png "Attach by Process ID")

Once selected, you can press the green "play" arrow to attach to your process. You will need to have started your server via ```npm start``` for this to work.

The process you want to select is the one that reads "node server/server.js".

![selecting process](./assets/attach.png "Select process")

Once attached, you can set a breakpoint and start inspecting your code. Let's say that we are interested in inspecting the cats that are about to be returned when our front end code makes a request to our API. You can open up the file in your project at server/resources/cats.js and set a breakpoint at line 8 by clicking in the space just to the left of the line number "8".

![setting breakpoint](./assets/breakpoint.png "Select breakpoint")

If you now refresh you page at "http://localhost:3000" so that the page will request for the list of cats, your breakpoint will be hit.

![hitting breakpoint](./assets/breakpointhit.png "Hit breakpoint")

At this point, you can head over to the debug view and inspect your variables to see what is the current value of the ```result``` variable. This is what we are about to set to the response body with the current statement ```this.body = result;```, and we can see that it contains the cats we expect.

![inspecting values](./assets/inspect.png "inspect values")

This is just the briefest of introductions. Please refer to the [documentation](https://code.visualstudio.com/Docs/editor/debugging) for further information.

## Webpack

The PollProject (as do many React apps) uses [webpack](https://webpack.js.org/) to bundle and compile our [jsx](https://reactjs.org/docs/introducing-jsx.html) files. With webpack, we specify an entry point and a destination and webpack will 
collect up all of our script dependencies for our entry point, compile our jsx files with babel, and put all of our js into one file (called a "bundle" since all the js is "bundled" into one file). In our case, the entry point is client/Index.jsx, and the output is client/bundle.js. If you rename the Index.jsx file, or create a new entry point, you will need to add this entry point to the webpack.config.js. However, you should be able to complete the Polling App without making any changes here, as long as the Index.jsx file is not removed or renamed.


## Koa

[koa](https://koajs.com/) is a web framework for node.js. It is designed by the team behind [Express](https://expressjs.com/) and serves a similar function to Express, namely providing structured access to the node.js request and response objects to middleware and to route handlers (also middleware). Koa is lightweight and has no built-in middleware, though the koa community is huge and any number of middleware packages are available to include in your project. Unloop has developed a number of koa middleware packages that PollProject uses either directly or as an indirect dependency:
- [koa-decode-params](https://www.npmjs.com/package/koa-decode-params)

  Koa middleware to run all params through decodeURI
   
- [unloop-koa-query](https://www.npmjs.com/package/unloop-koa-query)

  Koa middleware for turning query params into a structured query object on ctx.dbQuery

- [unloop-resource-builder](https://www.npmjs.com/package/unloop-resource-builder)

  Builder for koa-resource-router using unloop's resource/entity pattern. Access middleware by invoking `resource.middleware()`

- [unloop-static-router](https://www.npmjs.com/package/unloop-static-router)

  Koa static router with authorization
  
- [koa-auth-wrapper](https://www.npmjs.com/package/koa-auth-wrapper)

  A koa-passport cookie based session authorization that encrypts the session key and supplies login/logout routes with login redirection support. Access middleware by invoking `Auth.middleware()` from an object created from the exported class contructor.

- [koa-user-context](https://www.npmjs.com/package/koa-user-context)
  Koa middleware to set a user context cookie based on ctx.req.user set by koa-passport

By way of naming convention, any package name beginning with _koa-_ indicates a generic package, wherease a package name beginning with _unloop-_ indicates a package that makes assumptions concerning the structure of your project that may only hold inside of Unloop. Review the [documentation](https://koajs.com) for more information on koa and how koa is used. Pay particular attention to the ctx (context) object, as this is central to the koa paradigm.

## Rest API

PollProject uses a [REST API](https://restfulapi.net/) for client browsers to interact with data. At a very high level, a REST API defines resources and an interface for retrieving and changing those resources. In our case, our resources are _cats_. The resources are accessed via a uri. For our cats, they are specified by the string _http://localhost:3000/api/cats/<id>_. Our REST API is provided by the package [unloop-resource-builder](https://www.npmjs.com/package/unloop-resource-builder), which is built upon [koa-resource-router](https://github.com/alexmingoia/koa-resource-router). koa-resource-router defines a mapping from [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to resource actions as follows:
```
GET     /resource           ->  index
GET     /resource/new       ->  new
POST    /resource/          ->  create
GET     /resource/:id       ->  show
GET     /resource/:id/edit  ->  edit
PUT     /resource/:id       ->  update
DELETE  /resource/:id       ->  destroy
```
If you take a look at our cats resource file at _server/resources/cats.js_, you can see the implementation of a few of these resource actions.
    
```javascript
module.exports = (entity) => {
    const cats = entity.table;

    return {
        index: async function(ctx, next) {
            await next;
            let result = await cats.getAll();
            ctx.body = result;
        },
        show: async function(ctx, next){
            await next;
            let result = await cats.get(ctx.params.cat);

            if (!result) {
                ctx.status = 404;
                ctx.body = 'Not Found';
            } else {
                ctx.body = result;
            }
        },
        create: async function(ctx, next) {
            await next;
            if (!ctx.request.body || !ctx.request.body.name) ctx.throw(400, '.name required');
            let cat = (({name, owner, age}) => ({name, owner, age}))(ctx.request.body);
            await cats.create(cat);
            ctx.status = 201;
            ctx.body = 'added!';
        }
   }
}
```
Here, we define an export for our module that is an arrow function

```javascript
module.exports = (entity) => {
    //some code
}
```

This arrow function takes a parameter `entity` that will define how to operate on our cats. Sepecifically, this is our module defined at _server/entity/cats.js_. From this _entity_, we can access the `get`, `create`, `getAll` operations that we need in order to interface with the database. The arrow function then _returns_ an object that defines our `index`, `show`, `create`, `destroy`, etc _resource_ actions. This object, which contains the resource action mappings will be used by our resource router to know that a `GET` request coming in to our resource at `http://localhost:3000/api/cats` should map to our index resource action defined here.

```javascript
async function(ctx, next) {
    await next;
    let result = await cats.getAll();
    ctx.body = result;
}
```

So now, when we perform our get request on cats, this function will be executed, and we will call `cats.getAll()` and set the result on the body. Note that `await next;` here is code that will cause the remaining middleware to finish first (since the line comes first) before we call the DB and set the result.

There are a number of aspects concerning rest APIs that are not touched on here. There are many good descriptions online about rest APIs. In particular, we want to be mindful of the (Response Codes)(https://restfulapi.net/http-status-codes/) that our API is returning. In our example, we are using the following codes:
- 200 OK

  This is the default response code from Node and indicates the request was processed successfully

- 201 CREATED

  This indicates that we created a resource (used in our `create` resource action)

- 400 BAD REQUEST

  Indicates a malformed request (In our case, a required parameter was not specified when creating)

- 404 NOT FOUND

  The resource wasn't found (used in our `show` action when the cat id requested didn't exist).

In addition to these explicit responses, our server may send the following responses from middleware:
- 403 FORBIDDEN

  From koa-auth-wrapper when the user does not have sufficient access to the requested action

- 404 NOT FOUND

  From koa-resource-router when there a resource type is requested that is not registered

- 405 METHOD NOT ALLOWED

  From koa-resource-router when there is not a mapped resource action for the given HTTP Method and URL

- 500 (Internal Server Error)

  From koa when we have an exception during processing the request
  
You may also want to use status code 204 NO CONTENT when performing operations (such as a delete) that return successfully, but there is no content to return to the client.

### Testing
While we could test our API by navigating our website and observing the results of our various operations that we perform through the UI, it is far more efficient and reliable to test our API in isolation. That is, if I were to navigate to my app at _http://localhost:3000/api/cats_ and notice that a cat was missing from the list, how could I determine the cause of the issue?

![screenshot of default site](./assets/CatsRule.png "cats rule")

Is that data missing from the database? Is the api failing to retrieve it? Maybe the UI is doing paging and simply failing to show me a "next" button. We can quickly separate out UI concerns from our data layer by performing direct queries to our API. Below are a few tools to use to do this testing.

#### cURL
[cURL](https://curl.haxx.se/) is software that is available on many [\*Nix](https://en.wikipedia.org/wiki/Unix-like) systems (Unix, Linux, OS X) and similiar environments such as git-bash. cURL ("client URL") serves as a client for making requests to servers using various protocols, and receiving resonposes. [Bash](https://www.gnu.org/software/bash/) provides a command named "curl" which serves as a command-line interface (CLI) to this software. We can use this command to make HTTP requests and receive responses from a web server. We can send requests using any [HTTP method](https://www.restapitutorial.com/lessons/httpmethods.html) (GET, POST, PUT, DELETE, etc) and send/receive structured data.

At its most simple we would use curl as follows (from a bash terminal):
`curl http://localhost:3000/api/cats`

and recieve the response:
> '\[{"name":"Jasper","owner":"Kitty Kally","age":1},{"name":"Daisy","owner":"Katherine Mao","age":8},{"name":"Meow","owner":"Mr. Fickle","age":"5"}]'

This command will cause a GET request to be sent to the given URL. Of course, your server (and local dynamoDB instance must be running to receive this response).

To `show` an individual cat we would use:
`curl http://localhost:3000/api/cats/Jasper`

with response:
> `{"name":"Jasper","owner":"Kitty Kally","age":1}`

Finally, to `create` a cat:
`curl -X POST -H "Content-Type: application/json" -d '{"name":"Furball","owner": "Coughs A. Lot", "age": 7}' http://localhost:3000/api/cats`

Let's take a moment to break down this last command. `-X` is a command _flag_ that tells curl that we want to specify an action method, and that method is POST. The `-H` flag will allow us to specify HTTP [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). In this case, we set the[ _Content-type_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) header to "application/json". This tells the server that we are sending it [JSON](https://www.w3schools.com/js/js_json_intro.asp) data. The flag `-d` tells curl what data we actually want to send. Here, we are given a JSON string representing the cat we want to create. Lastly, we specify the URL of the resource.

## Asyncronous Code

Asyncronous code is code that is marked to run, but complete at a later time, and literally means "not synchronous". Node provides a number of methods in [Node Core](https://nodejs.org/en/knowledge/getting-started/what-is-node-core-verus-userland/) that provide access to [blocking I/O](https://nodejs.org/de/docs/guides/blocking-vs-non-blocking/). Take, for example:

```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

`readFile` is an _asynchronous_ function. We tell it the file to read ('file.md') and the function will tell the operating system to load it. The operating system says, "Ok, I'll tell you when I'm done."

### Callbacks
It would be rather pointless to read a file and do nothing with the data we read. We clearly need a way to tell the operating system what we want to do once the file is read. We do this via a [callback](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/). A callback is simply defining a piece of code to run, that will be passed to another method and called at some point during that methods execution. In our case, we passed a callback to `readFile`, and readFile's [API](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) says that the callback passed will be called once the read is complete and that it will be passed to arguments, `err` and `data`. `err` will contain any [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) that occured, and `data` will contain the data read from the file.

This is all well and good, but what happens when I need to _write_ the content I just read to another file? Let's take a look:

```javascript
const fs = require('fs');
fs.readFile('file1.md', (err, data) => {
    if (err) throw err;
    fs.writeFile('file2.md', (err, data) => {
        if (err) throw err;
        
        //do something
    });
});
```

You'll note that we inserted a call to [writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) from within our callback, and provided yet another callback to this invocation. Why stop here? Maybe we need to read a second file after writing _file2.md_. You can see that very quickly these chains of callbacks get very unwieldy and difficult to read. This is known as [callback hell](https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/). We need a better way to manage our asynchronous code. Lucky for us, NodeJs provides several.

### async libraries
There are a number of NPM packages that can handle [async control flow](https://www.oreilly.com/library/view/you-dont-know/9781491905241/ch04.html), noteable among them is [Async](https://github.com/caolan/async). I am not going to go into these (or patterns using generators) since they have mostly fallen out of fashion in favor of Promises and async/await.

### Promises
A promise is a way to encapsulate a bit of code that should run in an asynchronous fashion. Let's re-write our code above by moving our operations into separate functions that return promises.

```javascript
const fs = require('fs');

function readFilePromise(filename) {
    return new Promise( (resolve, reject) => {
         fs.readFile(filename, (err, data) => {
            return (err) ? reject(err) : resolve(data);
         }
    });
}

function writeFilePromise(filename, data) {
    return new Promise( (resolve, reject) => {
         fs.writeFile(filename, (err, data) => {
            return (err) ? reject(err) : resolve(data);
         }
    });
}
```
_Now, wait a minute_, you might say, _this is hardly easier than what we had before_. Well, declaring a promise is not where their power is. It's in using them to establish control flow. Consider the following:

```javascript
readFilePromise(firstFile)
    .then((data) => (datawriteFilePromise(secondFile, data))
    .then(() => readFilePromise(thirdFile))
    .then((data) => console.log(data));
    .catch((err) => console.log(err));
```

*This* code is much easier to handle. It is self-documenting. We will read _firstFile_, write _secondFile_ with the content of _firstFile_, read _thirdFile_, then write the results of _thirdFile_ to the console. If there is an error at any point, we will stop our exectution and log the error to the console. We do this via the [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) and [.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) methods of the [Promise prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/prototype). Most importantly, it allows for [separation of concerns](https://effectivesoftwaredesign.com/2012/02/05/separation-of-concerns/). We can write code that says how to perform our individual actions, and we can write code that chains together the actions we need to take and those two distinct concerns are kept separate.

Moreover, we do not have to write the methods readFilePromise and writeFilePromise. There is a module that can do this for us. As long as our function we need to turn into a promise (or "promisify") follows standard node conventions, we can use any number of modules to do this. Take [promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) from `util` in Node Core, for example.

```javascript
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

readFilePromise(firstFile)
    .then((data) => writeFilePromise(secondFile, data))
    .then(() => readFilePromise(thirdFile))
    .then((data) => console.log(data));
    .catch((err) => console.log(err));
```

Now, our code is starting to look quite manageable. We can improve it further, however. But before we do, let's break this down and look more closely at what is going on here. We will take a look first at our original definition of `readFilePromise`.

```javascript
function readFilePromise(filename) {
    return new Promise( (resolve, reject) => {
         fs.readFile(filename, (err, data) => {
            return (err) ? reject(err) : resolve(data);
         }
    });
}
```

`readFilePromise` returns a Promise object. It does this by instantiating a new instance of Promise via `new` and invoking the constructor. The [promise constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) takes a 
single argument, an executor. The executor is a function that defines how to execute the code in question and takes two parameters: _resolve_ and _reject_. _resolve_ and _reject_ are callbacks themselves which the executor can call to _resolve_ or _reject_ the Promise. To _reject_ a promise means to mark the promise as failed. To resolve a promise means to mark the promise as completed. Our executor is given by:

```javascript
(resolve, reject) => {
         fs.readFile(filename, (err, data) => {
            return (err) ? reject(err) : resolve(data);
         }
    }
```

This executor will invoke readFile, and set a callback to be invoked once readFile completes. The executor will then return, leaving the promise in a `pending` state. Later, when readFile completes, readFile will invoke the callback. The callback will inspect the err parameter to determine whether an error occured. If it did, the promise is rejected with the Error, and if no error occurred, the promise is resolved _with_ the data read from the file. To resolve _with_ data as in `resolve(data)` means to (1) mark the promise as completed, and (2) set the _result_ of the promise to `data`. This `result` can be inspected by other code later on.

So, the `readFilePromise` function returns a promise. Once we have a promise, we can use control flow methods to define the "flow" of our execution, namely _what_ to execute _when_. Two control flow methods available on the Promise prototype are `.then()` and `.catch()`. `.then()` takes two callback parameters, also known as _continuations_ since they declare how to _continue_ execution after a promise has finished. The first parameter declares what to execute when the promise is _resolved_--the second, when it is _rejected_. Here, we only use the first parameter. `.catch()` is a control flow method that will take an executor function to run whenever an promise is rejected. It is equivalent to calling `.then(null, callback)`.

**Currying**

I would like to take a little space for a detour into [Currying](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983), which is a particularly useful pattern to use with Promises. Currying is a central technique used in [Functional Programming](https://www.geeksforgeeks.org/functional-programming-paradigm/). Javascript borrows many things from functional programming, and NodeJs patterns extend this even further. Currying is a way to take a function accepting multiple parameters, and turn it into a _composed_ series of functions each taking a single parameter. Take, for instance, the following:

```javascript
function multiply(n, m) {
    return n * m;
}
```

If we were to apply currying to our `multiply` function, we would have:

```javascript
const multiply = (n) => (m) => n * m;
```

We could then invoke this through a series of invocations, supplying a parameter at a time, as in `multiply(n)(m)`. Why do this? Namely, _partial application_ and _higer order functions_.

**Partial Application**
To _partially apply_ a function means to fix some (but not all) of a curried functions parameters. To extend or previous multiplication examply, we could create a partial application called `double`:

```javascript
const double = multiply(2);

console.log(double(3)); // outputs 6
console.log(double(5)); // outputs 10
```

**Higher Order Function**
A [_higher order function_](https://eloquentjavascript.net/05_higher_order.html) is a function that takes a function as an input and/or returns a function as output. We could use our previous multiply example in a _higher order function_ that logs our operation, taking in a log function.

```javascript
const loggedMultiply = (logger) => (n) => (m) => {
    let result = multiply(n)(m);
    logger(`multiply(n)(m) returned ${result}`);
    return result;
}
```

And invoke it like so:
```javascript
loggedMultiply(console.log)(2)(2); //logs 4 to the console
```

And we can combine currying with this higher order function like so:
```javascript
const consoleLoggedDouble = loggedMultiply(console.log)(2);
consoleLoggedDouble(3); //logs 6 to the console
```

**conclusion**
This brings us back to our previous code where we where reading and writing files asynchronously, in sequence. Firstly, note that the call to util.promisify:
```javascript
const writeFilePromise = util.promisify(fs.writeFile);
```

We can see that `promisify` is actually a _Higher Order Function_. It takes a function `fs.writeFile` as input and returns a Promise that wraps the invocation of that function. Now, we can write a curried function that invokes writeFilePromise:
```javascript
const writeIt = (filename) => (data) => writeFilePromise(filename, data);
```

To see what this does, consider what happens when we partially apply `writeIt` with the filename parameter. Once _filename_ is fixed, we have a function that takes a data parameter and invokes `writeFilePromise`. But this is exactly what we gave as the executor function to `.then()`:

```javascript
    .then((data) => writeFilePromise(secondFile, data))
```

This means we could re-write this as:
```javascript
    .then(writeIt(secondFile))
```
And extending this pattern we end up with:

```javascript
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const readIt = (filename) => () => readFilePromise(filename);
const writeIt = (filename) => (data) => writeFilePromise(filename, data);
const logIt = (data) => console.log(data);

Promise.resolve()
    .then(readIt(firstFile))
    .then(writeIt(secondFile))
    .then(readIt(thirdFile))
    .then(logIt);
    .catch(logIt);
```




### Async/Await
