const pool = require("../config/mysql.conf");

// Add Favorite
function addFavorite(res, userId, breweryId){
    // Try to add a favorite
    pool.query("INSERT INTO favorites (userId, breweryId) VALUE (?,?)", [userId, breweryId], (err)=>{ // DOUBLE CHECK
        // Send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Favorite successfully added' });
    })
}

// Remove Favorite
function removeFavorite(res, userId, favoritesId){
    // Try to remove favorite
    pool.query("DELETE FROM favorites WHERE favorites.userID = ? AND favorites.id = ?", [userId, favoritesId], (err)=>{
        // Send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Favorite successfully deleted' });
    })


}

// Favorites By User
function favoritesByUser(res, userId){
    // Try to get favorites based off userId
    pool.query("SELECT * FROM favorites WHERE favorites.userId = ?", [userId], (err, results)=> {
        // Send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Favorites successfully returned', favorites: results });
    })
}

module.exports.addFavorite = addFavorite;
module.exports.removeFavorite = removeFavorite;
module.exports.favoritesByUser = favoritesByUser;