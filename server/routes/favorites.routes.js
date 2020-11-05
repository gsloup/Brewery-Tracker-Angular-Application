const express = require("express");
const router = express.Router();
const passport = require("passport");
const favoritesModels = require('../models/favorites.models');

// Add Item
router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
    // check for valid info
    if(!req.body.name || !req.body.qty || !req.body.price){ // CHANGE THIS TO MATCH THE FAVORITES
        return res.send({success: false, msg: "Invalid values provided"})
    }

    // pass it to the model
    favoritesModels.addItem(res, req.user.id, req.body.name, req.body.qty, req.body.price); // CHANGE TO MATCH FAVORITES

})

// Delete Item
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    favoritesModels.removeItem(res, req.user.id, req.params.id); // MAKE SURE IT MATCHES THE MODEL
})

// Get Favorites by User
router.get("/user", passport.authenticate('jwt', {session: false}), (req, res) => {
    favoritesModels.favoritesByUser(res, req.user.id); // MAKE SURE IT MATCHES THE MODEL
})

module.exports = router;