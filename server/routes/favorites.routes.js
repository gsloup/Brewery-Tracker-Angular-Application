const express = require("express");
const router = express.Router();
const passport = require("passport");
const favoritesModels = require('../models/favorites.models');

// Add Item
router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
    const userId = req.user.id;
    const brewery = req.body.brewery;
    // Check for valid info (not requiring ALL the brewery data since API has lots of 'null' data)
    if(!userId || !brewery.id || !brewery.name ){ 
        return res.send({success: false, msg: "Invalid values provided"})
    }
    // Pass it to the model
    favoritesModels.addFavorite(res, userId, brewery); 

})

// Delete Item
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    favoritesModels.removeFavorite(res, req.user.id, req.params.id);
})

// Get Favorites by User
router.get("/user", passport.authenticate('jwt', {session: false}), (req, res) => {
    favoritesModels.favoritesByUser(res, req.user.id); 
})

module.exports = router;