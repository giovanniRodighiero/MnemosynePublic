# MnemosynePublic
This is the public repository of the web application Mnemosyne, the full one is hosted in another, private, repository through the service provided by [Openshift](https://www.openshift.com/) for easy and fast deploy.

## What is Mnemosyne
It's a web application that I started developing during a university project that involved, beside the project itself, the production of a lot of documentation, the aim of Mnemosyne is to act as a service (available only by the members of our team) to handle information like usecases, tests pianification, requirements and more, in a fast and easy way.

## What it can do
Mnemosyne can be used for:
* Store information about a use case with a image of his UML diagram as well;
* Store information about requirments, diveded into different categories;
* Store information about tests pianification, diveded on different types (unit tests, integration tests, system tests, validation tests) for your code and the result of them;
* Store all the words that deserve to appear in a glossary;


All the informations stored are exportable as cvs file and functions for LaTeX code generation are available as well.

## Tecnologies and languages involved
The core is build through the CMS [Keystone.js](http://keystonejs.com/) which is based on express.js and MongoDB, indeed the database is a MongoDB instance. 
