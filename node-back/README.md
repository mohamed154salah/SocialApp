# Social App

This is a social networking web application built with Node.js and Express. It allows users to create profiles, make posts, and interact with other users by commenting on posts and liking them. The application also includes authentication and authorization features to ensure that users can only access their own data.

## Features

The application includes the following features:
1- User authentication and authorization using JSON Web Tokens (JWT)
2- User registration and login
3- User profile creation and updating
4- Post creation, editing, and deletion
5- Commenting on posts
6- Liking posts

## Getting started

To get started with the application, follow these steps:

1- Clone the repository to your local machine.
2- Install the dependencies using ``npm install``.

3- Start the application using ``npm start``.
4- Visit <http://localhost:8080> in your web browser to access the application.

## API endpoints

The following API endpoints are available in the application:

### Authentication endpoints

1- POST ``/signup``: Register a new user. Requires a JSON body with name, email, and password fields.
2- POST ``/signin``: Login a user. Requires a JSON body with email and password fields. Returns a JWT token.
3- GET ``/signout``: Logout a user.

### User endpoints

1- GET ``/allusers``: Get All users .
2- GET ``/user/:userId``: Get a user by its ID.
3- PUT ``/user/:userId``: Update a user by its ID. Requires a JSON body with name and bio fields.
4- PUT ``/follow``: Follow a user. Requires a JSON body with userIdToFollow field.
5- PUT ``/unfollow``: Unfollow a user. Requires a JSON body with userIdToUnfollow field.
6- GET  ``/user/findpeople/:userId``: Get all users except the currently logged in user.
7- DELETE ``/user/:userId``: Get a user by its ID.
8- GET ``/user/photo/:userId``: Get a user's profile photo by its ID.

### Post endpoints

1- GET ``/post``: Get all posts.
2- GET ``/post/by/:userId``: Get all posts by a user.
3- POST ``/post/new/:userId``: Create a new post. Requires a JSON body with two text field and User must be logged in.
4- PUT ``/post/update/:postId``: Update a post by its ID. Requires a JSON body with two text field and User must be logged in.
5- DELETE ``/post/:postId``: Delete a post by its ID. User must be logged in and must be the author of the post.
6- GET ``/post/photo/:postId``: Get a post's photo by its ID.
7- GET ``/singlePost/:postId``: Get a post by its ID.
8- PUT ``/post/like``: Like a post. Requires a JSON body with postId field.
9- PUT ``/post/unlike``: Unlike a post. Requires a JSON body with postId field.
10- PUT ``/post/comment``: Comment on a post. Requires a JSON body with postId and text fields.
11- PUT ``/post/uncomment``: Uncomment a post. Requires a JSON body with postId and comment fields.

## Technologies used

This application was built using the following technologies:

Node.js
Express
MongoDB
formidable for form data parsing
lodash
uuid for generating unique identifiers
JSON Web Tokens (JWT) for authentication and authorization
Mongoose for MongoDB object modeling
