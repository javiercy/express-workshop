const express = require('express');
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon; DB json
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get("/", async(req,res,next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

pokemon.get("/:id([0-9]{1,3})", async(req,res,next)=>{
    const { id } = req.params;
    const pk = await db.query(`SELECT * FROM pokemon WHERE pok_id=${id}`);
    return (id >= 1 && id <= 150) ? res.status(200).json(pk) : res.status(404).send("Pokemon no encontrado");
});

pokemon.get("/:name([A-Za-z]+)",async(req,res,next)=>{  

    //Condicion ? valor si verdadero : valor si falso

    const {name} = req.params;

    const pk = await db.query(`SELECT * FROM pokemon WHERE pok_name='${name}'`);
    (pk.length > 0) ? res.status(200).json(pk) : res.status(404).send("Pokemon no encontrado");
});

module.exports = pokemon;