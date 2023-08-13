# Blogging Platform with Node.js, EJS, and MongoDB

Welcome to _Fafnir_ our blogging platform! This web application is built using Node.js, EJS templates, and MongoDB. It allows users to register, login, view and interact with posts, and perform various actions such as commenting, liking, and uploading posts.

Check out *[Fafnir](https://fafni.onrender.com)* by clicking on the link before!!

Here's a brief overview of the features:

----
## Features
  *  **User Authentication:** Utilizing Passport.js, we offer secure user authentication. Users can register and login to access the platform's features.

  * **Homepage:** Upon logging in, users are greeted with a homepage that showcases posts from other users. You can scroll through these posts to find interesting content.

  * **User Profile:** Every user has a profile page displaying their username, the number of posts they've made, and the total likes they've received across all posts.

  * **Search Bar:** We've implemented a search bar that allows users to look for specific posts using keywords.

  * **Post Interaction:** Clicking on a post's picture or the "Read More" hyperlink takes you to the full post view. Here, users can like the post and leave comments.

  * **Post Upload:** Users can upload their own posts, including an image and text content.

  * **Comments and Likes:** Interact with posts by leaving comments and liking them. All comments are timestamped and displayed alongside the post.

  * **User Interaction:** Clicking on a user's profile picture or username within a post takes you to their profile page.

  * **Logout:** Easily log out of your account when you're done using the platform.

---
## Tech Stack

  * **Node.js:** The backend is powered by Node.js, allowing for efficient server-side logic.
  * **EJS Templates:** We've used EJS templates to render dynamic HTML pages and display data from the server.
  * **MongoDB:** Our database of choice, MongoDB, stores user information, posts, comments, and likes.
  * **Passport.js:** Providing secure authentication, Passport.js ensures that user accounts are protected.
  * **Frontend:** HTML, CSS, and JavaScript form the frontend components, providing a seamless user experience.
----
## Getting Started
  * **Clone the Repository:** Start by cloning this repository to your local machine.

  * **Install Dependencies:** Navigate to the project directory and install the necessary dependencies using npm install.

  * **Database Setup:** Ensure you have a MongoDB instance running. Update the connection details in the appropriate configuration file.

  * **Environment Variables:** Set up environment variables for sensitive information such as database credentials and session secrets.

  * **Start the Application:** Run the app using npm start and access it through your browser at http://localhost:3000.
----
## Installation
To set up and run this blogging platform locally, you'll need to install a few npm modules. Follow the steps below to get started:

----
### Prerequisites
Before you begin, ensure you have the following prerequisites:

  * **Node.js** installed on your machine.
  * **MongoDB** set up and running, as this project uses MongoDB for data storage.

## Clone the Repository
Start by cloning this repository to your local machine using the following command:

   
    git clone https://github.com/your-username/your-blogging-platform.git

Replace your-username with your GitHub username and your-blogging-platform with the name of your repository.

***Install Dependencies***
  * Navigate to the project directory using the terminal:

          cd your-blogging-platform

  * Install the necessary npm modules using the following command:

          npm install express body-parser passport mongoose mutler

Here's a brief overview of each module:

  * **express:** A fast, unopinionated, minimalist web framework for Node.js.
  * **body-parser:** Middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
  * **passport:** An authentication middleware for Node.js that supports various authentication strategies.
  * **mongoose:** A MongoDB object modeling tool designed to work in an asynchronous environment.
  * **mutler:** Multer is a middleware for handling multipart/form-data, primarily used for file uploads in Node.js applications.

----

## Contribution
Contributions are welcome! If you find bugs, want to add features, or improve the codebase, feel free to submit a pull request. Please ensure your changes align with the project's coding standards.
