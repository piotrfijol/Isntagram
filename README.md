# Isntagram 

Isntagram is not a misprint. 

## Results

This is how my projects looks at the moment

![Presentation of the results](https://github.com/piotrfijol/Isntagram/blob/main/readme-assets/showcase-1.gif)

## Installation

If you'd want to test the project yourself there is quite a few things that need to be done.
I'm assuming you have [Node](https://nodejs.org/en/) and git on your computer. I'll also assume that you a [cloudinary](https://cloudinary.com/) account and mongodb database up and running.

Firstly clone the repository

```
git clone git@github.com:piotrfijol/Isntagram
```

Then move to the newly created directory

```
cd ./Isntagram
```

Install all the dependencies in the client/server sub-directories

```
cd ./client
npm i
cd ..
cd ./server
npm i
```
In the 'server' subdirectory you'll have to create .env file with following enviroment variables:

- [MONGO_URI](https://www.mongodb.com/docs/manual/reference/connection-string/)
- CLOUDINARY_NAME
- CLOUDINARY_KEY
- CLOUDINARY_SECRET 
- ACCESS_TOKEN_SECRET   - secret key for acces token
- REFRESH_TOKEN_SECRET  - secret key for refresh token

All the CLOUDINARY_* values you'll find on the top of the dashboard at cloudinary.com after signing in.

After all the above steps are done all you have to is visit *server* directory run the server (`npm start `) and use the same command in the *client* directory.

## Technologies used

Project has been built with the following web technologies:

- **M**ongoDB
- **E**xpress
- **R**eact
- **N**odeJS

I chose this stack mainly because it is something I'm the most familiar with. Main focus here was to gain as much of general and practical knowledge as I possibly can. That is also a reason why I didn't choose to use f.e. PassportJS to handle authentication or
MaterialUI, bootstrap to build this web app way faster. If it wasn't the need to practice things like component design I would definitely chose those battle-tested libraries and frameworks unless the website needs a "personal touch" to it.

