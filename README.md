# whatsappClone
    Simple chat application using MERN and socketIo.


# Basic setup to run React App

    npm init
    npm start

## when project completed then build the app for production in build folder by:

    npm run build

## In this project (whatsapp clone) : what are included :

    profile pic we can add during creating account
    one to one person chat
    emoji also send during messages
    delete or clear all chat of specific room

## Security:

    Password is secured with json web token
    messages are end to end encrypted
    encrypted data will store in data base

## Technogoly use:

### FOR FRONTED :

    Reactjs
    Tailwind css
    socketio-client

### FOR BACKEND :

    Nodejs
    Express
    SocketIo

    Extra : json web token, bcryptjs (for messages), multer (to handle profile pic)

## END POINTS of Backend :

    REACT_APP_URL=http://localhost:3007
    REACT_APP_BACK_END_URL = http://localhost:3007
    REACT_APP_SOCKET_URL = ws://localhost:3007
    REACT_APP_ADMIN_URL=http://localhost:3007/api/auth/getAdmin

    REACT_APP_ADMIN_CONTACT = http://localhost:3007/api/auth/getContact
    REACT_APP_ADMIN_MESSAGE = http://localhost:3007/api/auth/getMessages
    REACT_APP_ADMIN_SEND_MESSAGE = http://localhost:3007/api/auth/sendMessage
    REACT_APP_ADMIN_NEW_CONTACT = http://localhost:3007/api/auth/addContact

    REACT_APP_CREATE_USER = http://localhost:3007/api/auth/createUser
    REACT_APP_LOGIN = http://localhost:3007/api/auth/login

    REACT_APP_ADMIN_JSON_S_KEY = secret_key@132
    REACT_APP_MESSAGE_CRYPT_KEY = #cryptedData@132
