const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usermodel = require('./model/usermodel');
// session
const session = require('express-session');

const Swal = require('sweetalert2')



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    usermodel.getAllUsers().then((users) => {
    })
   res.render('index');
}
);

//a

app.post('/save_user', (req, res) => {
    // get the data from the form
    const post = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass
    }
    // console.log(post);
    usermodel.addUser(post);
    res.redirect('/');
    


}
);

// user List
app.get('/user_list', (req, res) => {

    // check if the user is logged in
    if (!req.session.user){
        res.redirect('/login');
    }else{
        usermodel.getAllUsers().then((users) => {
            res.render('user_list', {users: users});
        }
        )
    }


   
}   );

//login
app.get('/login', (req, res) => {

    res.render('login');
}
);

//check_user
app.post('/check_user', (req, res) => {
    const post = {
        email: req.body.email,
        pass: req.body.pass
    }
    let user = usermodel.checkUser(post);
    user.then((user) => {
        if(user){
            req.session.user = user;
            toast.fire({
                icon: 'success',
                title: 'Welcome ' + user.name
            });
            res.redirect('/user_list');
        }
        else{
            res.redirect('/login');
        }
    }
    )
    
}
);

//logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
);

app.listen(5500, () => {
    console.log('Server is running on port 5500');
}
);