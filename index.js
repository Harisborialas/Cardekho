import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import { router as categoryRoutes } from './routes/categories.js';
import { router as Cars } from './routes/carsRoute.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Set the session cookie expiration time (1 day)
    },
  })
);

mongoose.connect(
  "mongodb://127.0.0.1:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB connected");
    }
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        // Store user information in the session
        req.session.user = user;
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully registered, please login now." });
        }
      });
    }
  });
});

// Check if the user is logged in
app.get("/user", (req, res) => {
  if (req.session.user) {
    res.send({ user: req.session.user });
  } else {
    res.send({ message: "User not logged in" });
  }
});

app.use("/api/categories", categoryRoutes);
app.use("/api/cars", Cars);

app.listen(3001, () => {
  console.log(`BE started at port 3001`);
});
