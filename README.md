![toby-hero](https://user-images.githubusercontent.com/43781236/178103379-a3ada7ee-0956-4308-96fd-624dbaad4171.png)

Toby Automation is a tool that helps automating tedious tasks by mouse-clicking on images or pressing down keyboard keys. Toby is coded mainly with TypeScript and is using Node.js, Robot.js, AutoIt and more.

### Required software

- Git
- Node.js (recommended v18.4.0), node-gyp (recommended v9.1.0)
- Go (https://go.dev/)
- AutoIt (https://www.autoitscript.com/) - only available for Windows & recommended on Windows

### Installing dependencies

Inside `toby-core` run `npm install`

### Building and starting the application

1. Start the image search service:\
   Inside `image-search/src` run `go build` and then run the compiled executable

2. (Optional) If using Windows and want to use experimental mouse moving script (powered by AutoIt), then you should compile the `move-mouse.au3` in `move-mouse` to executable. Move the compiled executable into `move-mouse/dist`

2. Start the core app:\
   Inside `toby-core` run `npm run start` to compile Typescript and start the core app\
   or run `npx tsc` to only compile Typescript
