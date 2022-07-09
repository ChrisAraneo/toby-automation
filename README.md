
![toby-hero](https://user-images.githubusercontent.com/43781236/178103379-a3ada7ee-0956-4308-96fd-624dbaad4171.png)

Toby Automation is a tool made with Node.js and Robot.js that helps automating tedious tasks by mouse-clicking on images or pressing down keyboard keys.

### Required software

* Node.js
* Python

### Installing dependencies

1. Inside `toby-core` run `npm install`
2. Inside `image-search` run `pip install -r requirements.txt`

### Building and starting the application

1. Start the image search service:\
   Inside `image-search/src` run `python image-search.py`

2. Start the proper app:\
   Inside `toby-core` run `npm run start` to compile Typescript and start the core app\
   or run `npx tsc` to only compile Typescript
