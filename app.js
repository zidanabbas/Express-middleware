const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

app.set("view engine", "ejs");

// Third party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

//aplication level middleware
app.use((req, res, next) => {
  console.log("time :", Date.now());
  next();
});

//built-in middleware
app.use(express.static("public"));

// router
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Zidane",
      umur: 23,
      email: "zidan.abbas28@gmail.com",
    },
    {
      nama: "Hadid",
      umur: 24,
      email: "Hadid@gmail.com",
    },
    {
      nama: "Dian",
      umur: 23,
      email: "Dian28@gmail.com",
    },
  ];

  res.render("index", {
    layout: "layouts/main-layouts",
    nama: "zidane abbas",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layouts",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
  );
});

app.listen(port, () => {
  console.log("Server istening port 3000...");
});

app.use((req, res) => {
  res.status(404);
  res.send("Halaman tidak ditemukan");
});
