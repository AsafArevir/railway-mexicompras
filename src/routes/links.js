const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('links/add');
});


//insertar producto
router.post('/add', isLoggedIn, async (req, res) => {
    const { category, nameps, precio, cantidad, description, total=precio*cantidad } = req.body;
    const newLink = {
        category,
        nameps,
        precio,
        cantidad,
        description,
        total,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO ps set ?', [newLink]);     
    req.flash('success', 'The Product Has Been Saved Successfully');
    //query for obtain the bugget end in the table budget
    const pess=await pool.query('SELECT budget.pend FROM budget WHERE user_id = ?', [req.user.id]);
    console.log(pess);
    //convert the query in array and convert in JSON
    var string=JSON.stringify(pess);
    console.log(string);
    var json =  JSON.parse(string);
    console.log(json[0].pend);
    //Operation for the rest of the budget
    const pend= json[0].pend - total;
    const { id } = req.params;
    //update the database
    await pool.query('UPDATE budget set pend = ? WHERE user_id = ?', [pend, req.user.id]);
    res.redirect('/links');
});


//insertar presupuesto
router.get('/budget', (req, res) => {
    res.render('links/budget');
});
router.post('/budget', isLoggedIn, async (req, res) => {
    const { fechai, fechaf, pinit, pend=pinit } = req.body;
    const newLink = {
        fechai, 
        fechaf, 
        pinit,
        pend,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO budget set ?', [newLink]);
    req.flash('success', 'The Budget Has Been Saved Successfully');
    res.redirect('/links');
});
//consultar link
router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM ps WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

//Consulta Presupuesto
router.get('/budgetc', isLoggedIn, async (req, res) => {
    const budget = await pool.query('SELECT * FROM budget WHERE user_id = ?', [req.user.id]);
    res.render('links/budgetc', { budget});
    console.log(budget);
});

//presupuesto consulta
router.get('/hb', isLoggedIn, async (req, res) => {
    const history = await pool.query('SELECT * FROM budget WHERE user_id = ?', [req.user.id]);
    res.render('links/hb', { history });
    console.log(history);
});
//productos
router.get('/hp', isLoggedIn, async (req, res) => {
    const linksp = await pool.query('SELECT * FROM ps WHERE user_id = ?', [req.user.id]);
    res.render('links/hp', { linksp });
    console.log(linksp);
});
//borrar link
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM ps WHERE ID = ?', [id]);
    req.flash('success', 'The Product Has Been Removed Successfully');
    res.redirect('/links');
});

//editar link muestra
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM ps WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
    console.log(link);
});

// consulta para editar presupuesto
router.get('/budgetedit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const budget = await pool.query('SELECT * FROM budget WHERE id = ?', [id]);
    res.render('links/budgetedit', {edit: budget[0]});
    console.log(edit);
});
//consulta update link
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { category, nameps, precio, cantidad, description, total=precio*cantidad } = req.body; 
    const newLink = {
        category,
        nameps,
        precio,
        cantidad,
        description,
        total
    };
    await pool.query('UPDATE ps set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'The Product Has Been Updated Successfully');
    res.redirect('/links');
});

//consulta update budget
router.post('/budgetedit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { fechai, fechaf, pinit } = req.body;
    const newLink = {
        fechai, 
        fechaf, 
        pinit,
    };
    await pool.query('UPDATE budget set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'The Budget Has Been Updated Successfully');
    res.redirect('/links');
});

module.exports = router;
