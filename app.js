const express = require("express");
const app = express();
const mysql = require("mysql");
const { join } = require("path");
const port = 3000;


// connecting ejs
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// conection to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coffe",
});

// בשלב הזה ניתן לעשות שאילתות בסקל//


// הכנסת ערכים באופן דינאמי לדאטה בייס
let coffeBrake = [
  {
   id:"" ,
    name_of_coffe: "ygarsef_blubery",
    color_of_capsule:"green",
    price_for_1_capsule: 4,
  },
 {
   id:"" ,
    name_of_coffe: "colombia",
    color_of_capsule:"yellow",
    price_for_1_capsule: 3,
  },
  {
   id:"" ,
    name_of_coffe: "kenia",
    color_of_capsule:"purple",
    price_for_1_capsule: 6,
  },
];

let inserIntro = `INSERT INTO coffe_types(\`id\`, \`name_of_coffe\`, \`color_of_capsule\`, \`price_per_1_capsule\`)
VALUES`;

let msg = "";

coffeBrake.forEach((coffe, index) => {
  let sign = index === coffeBrake.length - 1 ? ";" : ",";
  msg += `("${coffe.id}","${coffe.name_of_coffe}","${coffe.color_of_capsule}",${coffe.price_for_1_capsule})${sign}`;
});
let builtQuer = inserIntro + msg;

let insertProcduct = () => {
  let inserCoffe = builtQuer;
  connection.query(inserCoffe, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};

//insertProcduct();

let getDbStructure =()=>{
let query =  `INSERT INTO coffe_types (\`id\`, \`name_of_coffe\`, \`color_of_capsule\`, \`price_per_1_capsule\`) 
VALUES("","Rome","black",2)`

 connection.query(query, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });

};

//getDbStructure();





// C-R-U-D
 
// create
app.get('/add', (req,res)=>{

res.render('addNew.ejs');
});

// הכנסה לטופס והעברה לדאטה בייס

app.post("/insertCoffe", (req, res) => {
  let {name, color, price} = req.body 
  let query = `INSERT INTO coffe_types ( \`name_of_coffe\`, \`color_of_capsule\`, \`price_per_1_capsule\`) VALUES
 ("${name}", "${color}", ${price});`;
 
   connection.query(query, (err, result) => {
     if (err) console.log(err);
        
   });

    res.redirect('/coffee');
});

// delete
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let query = `DELETE FROM coffe_types
 WHERE \`id\` =  ${id};
 `;
  connection.query(query, (err, resoult) => {
    if (err) throw err;
    console.log(resoult);
  });
  res.redirect("/coffee");

});

// read
app.get('/coffee',async (req,res)=> {
  let myArr ;
  let query = `SELECT * FROM coffe_types`;
  await  connection.query(query, (err, result) => {
    if (err) console.log(err);
    myArr = result;
    res.render('index.ejs', {result})
  });


});


// lisinig on port dainamic
app.listen(port, () => {
  console.log(`listining on port ${port}`);
});