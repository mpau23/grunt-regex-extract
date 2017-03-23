# grunt-regex-extract

> Enable the user to extract all matching results of a regular expression and save them to file

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-regex-extract --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-regex-extract');
```

## The "regex_extract" task

### Overview
In your project's Gruntfile, add a section named `regex_extract` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  regex_extract: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.regex
Type: `String`
Default value: `'(.*|\n*)'`

A string value that represents the regular expression to use.

#### options.modifiers
Type: `String`
Default value: `'ig'`

A string value that determines which JavaScript RegExp modifiers to use (such as 'i' and 'g')

#### options.matchPoints
Type: `String`
Default value: `'1'`

A comma separated list of match points to determine what part of the regex you want to extract. Note: starts with 1

#### options.includePath
Type: `boolean`
Default value: `'true'`

A boolean value that determines whether the path of the file is to be included in the destination file 

#### options.output
Type: `String`
Default value: `''`

Allows complex outputs using using typical dollar-sign grouping syntax (e.g. My $1 complex $2 output)

#### options.verbose
Type: `boolean`
Default value: `'true'`

A boolean value that determines whether the output is printed in the console 

### Usage Examples

#### Test File

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>Hello World</title>
		<script type="text/javascript" src="/js/header-js-one.js"></script>
	</head>
	<header>

	</header>
	<body>
		<h1>Hello World!</h1>
		<p>Foo Bar :)</p>
	</body>
	<footer>
		<script type="text/javascript" src="/js/footer-js-one.js"></script>
		<Script type="text/javascript" src="/js/footer-js-two.js"></script>
		<script type="text/javascript">
			var inlineFooterJsVar = "foo";
		</script>
	</footer>
</html>
```

#### Default Options
In this example, the default options are applied but only the regex option is explicitly passed.

##### Configuration
```js
grunt.initConfig({
    regex_extract: {
		default_options: {
			options: {
				regex : "<script(.*|\n*)>(\s*|\n*)<\/script>"
			},
			files: {
				'test/actual/default_options.txt': ['test/fixtures/example.html']
			}
		}
    },
})
```

##### Output
```
test/fixtures/example.html,type="text/javascript" src="/js/header-js-one.js"
test/fixtures/example.html,type="text/javascript" src="/js/footer-js-one.js"
test/fixtures/example.html,type="text/javascript" src="/js/footer-js-two.js"
```

#### Custom Options
In this example, all the default options are overridden

##### Configuration
```js
grunt.initConfig({
	regex_extract: {
		default_options: {
			options: {
				regex : "<script(.*|\n*)>(\s*|\n*)<\/(\s*|\n*)>",
				modifiers: "g",
				matchPoints: "1,3",
				includePath : false
			},
			files: {
				'test/actual/default_options.txt': ['test/fixtures/example.html']
			}
		}
    },
})
```

##### Output
```
type="text/javascript" src="/js/header-js-one.js",script
type="text/javascript" src="/js/footer-js-one.js",script
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2014-11-07	v0.1	This release presents the initial version of grunt-regex-extract

## License
Copyright (c) 2014 Miren Pau. Licensed under the MIT license.
