## Overview

This app is broken up into two pieces</br>
1. Server side -> written in golang </br>
2. client side -> ran using facebook's react app starter pack</br>
    - facebook react js</br>
    - react-redux for state </br>


## Getting started
To get started you will need to install golang and npm.

Link to install golang: https://golang.org/dl/. Latest version of golang will automatically add go to PATH. To verify it is installed open the terminal and type the command ```go```

Link to install node & npm: https://nodejs.org/en/ -> choose the recommendend version

## Download the project
In your terminal type the following command

```
go get github.com/mobileirisid/mobile-iris-ex
```

This should install the project in the following go directory
go/src/github/mobileirisid/mobile-iris-ex. The project should look like this:

Navigate to the directory mentioned above

```
mobile-iris-id-ex/
    README.md
    runner.conf
    main.go
    client/
        package.json
        public
            index.html
        src
            compontents/
            containers/
            icons
            redux/                
            routes/
            utils/
            index.js
            ...
```

### Install NPM dependencies
Navigate to the client directory and run
```
npm install
```

### Start client dev server
In the client directory, run the following command

```
npm start
```

This will start the webpack dev server in localhost:3000 and open a new tab on the browser

Behind the hood I am using facebook's create-react-app start script. The README.md exists in the *client* dir

### Build and Start Golang server

To build the server run the following command
```
go build
```

To run the server
```
./mobile-iris-id
```

This server will be listening on port 9000

* `src/redux/modules/` is where we make request to the golang server

