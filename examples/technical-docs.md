# Technical Docs

## [Demo video](https://www.youtube.com/watch?v=m6Oo3HRY9IY)

# API key

To use all features of Documatic tools, you will need to get a (free) API key. All hackathon participants get a free key, join our [discord server](https://discord.gg/BcbY3GXtUZ)

To use your API key, create a “.env” file in the root of a project you wish to document, and give it the following field:
```
	DOCUMATIC_API_KEY = <your_key_here>
```
**DO NOT ADD THE .env FILE TO SOURCE CONTROL. DO NOT SHARE YOUR API KEY WITH ANYONE.**

<br>

# Technical Docs

Documatic automatically generates technical documentation for your codebase. For parts of your documentation which have not yet been automated, Documatic provides helpful features to streamline how you create and maintain great documentation. Documents are currently generated in a markdown format, however other formats and hosting options are coming soon.

<br>

# Configuration

Create a “pyproject.toml” file in the root directory.
Give it a section “tool.documatic”. The following fields must be filled:

- name	
- - The name of your project
- docdir
- - The path to the folder in which you want documentation to be generated. The folder must exist. Set as “.” to be your project root
- srcdir
- - The path to the source code directory. E.g. if your project structure is “root/src/mypackage/init.py”, then “srcdir” would be “src/mypackage”

Additionally, there are some optional fields you may use:

- package
- - The name of your codebase as a python package, as it would be imported around the codebase or in other projects
- - Only relevant if codebase is pip-installable and you don’t use relative imports
- - Defaults to “srcdir”, so only necessary if import package name differs
- - E.g. if structure is “root/src/mypackage/__init__.py” then srcdir would be “src/mypackage” and package would probably be “mypackage”
- docname
- - The name of the technical document to be generated
- - Defaults to “technical_doc”
- - “.md” extension will be appended to the end if not provided

<br>

## Getting the tool

If you use VSCode, search for and install the “Documatic” extension. Otherwise, install the “documatic” python package with “pip install documatic”.

The VSCode extension is the preferred method as it provides additional features for generating documentation.

<br>

## Generating Documentation

### If using the VSCode extension:

- 1. In a terminal, navigate to the directory of the project 

- 2. you wish to document

- 3. Open it with “code .”

- 4. Press “ctrl + shift + p” to open the command pane

- 5. Search for and run “Generate Technical Documentation”
(Depending on the size of your codebase) Your documentation will be generated in seconds

N.b. it’s necessary to close all existing VScode windows before using the tool and to navigate directly to your project because of a known bug. This is in the process of being fixed, which will give you more freedom in using the extension.

### If using the python package:
- 1. In a terminal, navigate to the directory of the project you wish to document
- 2. Run “documatic”
- 3. (Depending on the size of your codebase) Your documentation will be generated in seconds

<br>

## Adding manually edited sections
To include custom sections in your documentation that are not changed by the doc generation process, write the text in your document, highlight it and run the command “Fix Section to Top” (to pin the section to the top of the document) or “Fix Section to Bottom”. Fixing custom sections to anyplace in the document is coming soon. N.b. that if you have at least 1 top-fixed section, Documatic will not generate the intro header when you next run the tool as it assumes that the top fixed section is an intro. You can have as many fixed sections as you like.

If you don’t have the extension, you can achieve this functionality manually by wrapping the section in markdown comments of the form:
```
	<!---Documatic-section-fixed: top1-start—>
	Your fixed section content goes here.
	<!---Documatic-section-fixed: top1-end—>
```
Replace “top” with “bottom” to fix to the bottom, and the number (“top1”) should increment for each new top fixed section. I.e. you might have top1, top2, top3 sections, and a bottom1 section.

<br>

## Adding Concepts
If there is a concept of your codebase you want your users to be aware of but wasn’t captured automatically, you can easily add it to your documentation with the Documatic extension. 
- 1. Highlight the snippet of code you wish to document
- 2. Run the “Add Concept” command
- 3. In the input box, enter the title of the concept you are documenting and press Enter
 - 4. In the second input box, describe the concept and press Enter


Once a concept has been added, the code snippet will automatically be tracked and updated if your codebase changes, so you don’t have to manually edit your documentation everytime you change your code. See “Tracking code” for more information.

<br>

## Adding Step-by-Step code examples

To create a step-by-step example in your documentation:
- 1. Highlight a snippet of code to be the first step in your example
- 2. Run the command “Add Example”
- 3. In the input box, type in the name of your example and then a colon, and the description you want to give this example step
E.g. “Create a bot: First, initialise this class”
- 4. Highlight code for the next step, and repeat for as many steps as your example requires, using the same example title in the input box

As with concepts, the code snippets in your examples can be automatically tracked and updated by Documatic.

N.b. We’re improving how you generate examples! Give us feedback on how you would like to generate code examples for your project to help us improve.

<br>

## Tracking Code

To track and update all code snippets in your documentation, run “documatic code” in a terminal. Tracking code works best when the code snippet includes a function or class header. Code outside of an object has limited support. If your code snippet is not updated correctly, please provide an example to the Documatic team so we can improve this feature.

N.b. there is not currently a specific command to do this in the VSCode extension; it is being added in an upcoming release. VScode extension users also have the python package installed, so can use the above method.
