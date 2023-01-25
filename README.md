# Isntagram 

ISNTagram is not a typo(well, it kind of is but an intentional one), it is **not the Instagram**. Obviously instagram played a big role here, this project is deeply inspired by that web app and could call itself an "Instagram clone". I'm not going to name it that way because it lacks *maaaany* features that Instagram has. Email verification with a token stored in DB, push notifications, chat, video support just to name a few. I might implement push notifications with websockets (socket.io library to be specific) at some point but first I have to focus on the client-side validation of some of the forms.

Project has been built with the following web technologies:

- **M**ongoDB
- **E**xpress
- **R**eact
- **N**odeJS

MERN stack for short. I chose this stack mainly because it is something I'm the most familiar with. Main focus here was to gain as much of general and practical knowledge as I possibly can. That is also a reason why I didn't choose to use f.e. PassportJS to handle authentication or
MaterialUI, bootstrap to build this web app way faster. I was considering MaterialUI because of its Skeleton component(data placeholders) but I made my own custom CSS placeholder eventually. If it wasn't the need to practice things like component design I would definitely chose those battle-tested libraries and frameworks unless the website needs a "personal touch" to it.

## Results

This is how my projects looks at the moment

![Presentation of the results](https://github.com/piotrfijol/Isntagram/blob/main/readme-assets/showcase.gif)

## Installation

If you'd want to test the project yourself there is quite a few things that need to be done.
I'm assuming you have [Node](https://nodejs.org/en/) and git on your computer. I'll also assume nd that you a [cloudinary](https://cloudinary.com/) account and mongodb database up and running.

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
- ACCESS_SECRET_TOKEN   - secret key for acces token
- REFRESH_SECRET_TOKEN  - secret key for refresh token

All the CLOUDINARY_* values you'll find on the top of the dashboard at cloudinary.com after signing in.

After all the above steps are done all you have to is visit *server* directory run the server (`npm start `) and use the same command in the *client* directory.

