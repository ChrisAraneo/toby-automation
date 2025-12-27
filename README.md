![toby-hero](https://user-images.githubusercontent.com/43781236/178103379-a3ada7ee-0956-4308-96fd-624dbaad4171.png)

Toby Automation is a tool that helps automating manual tasks by mouse-clicking on images or pressing down keyboard keys. Toby is coded mainly with TypeScript and is using Node.js, AutoIt and more.

### Required software

- AutoIt (https://www.autoitscript.com/) - available for Windows, can be used on Linux with Wine but it was not tested
- Node.js (https://nodejs.org/)
- Go (https://go.dev/)

### Installing dependencies

Inside `toby-core` run `npm install`

### Building and starting the application

1. Start the image search service:\
   Inside `image-search/src` run `go build` and then run the compiled executable

2. Start the core app:\
   Inside `toby-core` run `npm i` then `npm run start` to compile Typescript and start the example app\
