const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'products.json'
);

const getProductFromFile = cb => {    
    fs.readFile(p, (err, contentFile) => {
        if(err) { 
            cb([]);
        } else {
            cb(JSON.parse(contentFile));
        }        
    }); 
}


module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });                                    
    }

    static fetchAll(cb) {
        getProductFromFile(cb);       
    }
}