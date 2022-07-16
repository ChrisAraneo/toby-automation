![toby-hero](https://user-images.githubusercontent.com/43781236/178103379-a3ada7ee-0956-4308-96fd-624dbaad4171.png)

Toby Automation is a tool that helps automating tedious tasks by mouse-clicking on images or pressing down keyboard keys. Toby is coded mainly with TypeScript and is using Node.js, Robot.js, PyAutoGUI and more.

### Required software

- Git
- Node.js
- node-gyp (https://github.com/nodejs/node-gyp)
- Python
- Go (https://go.dev/)

### Installing dependencies

1. Inside `toby-core` run `npm install`
2. Inside `image-search` run `pip install -r requirements.txt`

### Building and starting the application

1. Start the image search service:\
   Inside `image-search/src` run `python image-search.py`

2. Start the image search service v2:\
   Inside `image-search-2/src` run `go build`

3. Start the core app:\
   Inside `toby-core` run `npm run start` to compile Typescript and start the core app\
   or run `npx tsc` to only compile Typescript
