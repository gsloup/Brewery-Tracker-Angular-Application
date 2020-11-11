const pool = require("../config/mysql.conf");

// Add Favorite
function addFavorite(res, userId, brewery){
    // Try to add a favorite
    pool.query("INSERT INTO favorites (userId, breweryId, name, brewery_type, street, city, state, postal_code, phone, website_url, favorite) VALUE (?,?,?,?,?,?,?,?,?,?,?)", [userId, brewery.id, brewery.name, brewery.brewery_type, brewery.street, brewery.city, brewery.state, brewery.postal_code, brewery.phone, brewery.website_url, brewery.favorite], (err)=>{
        // Send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Favorite successfully added' });
    })
}

// Remove Favorite
function removeFavorite(res, userId, favoritesId){
    // Try to remove favorite
    pool.query("DELETE FROM favorites WHERE favorites.userId = ? AND favorites.id = ?", [userId, favoritesId], (err)=>{
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