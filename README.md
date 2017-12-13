# Grocery Allstars
How often have you found a slimy pack of salad, or an inedible kernel of something formally known as food, at the back of your fridge? Food waste is a global issue with one third of the global production lost or wasted annually, according to the Food and Agriculture Organisation. In the UK, we throw away 7 million tonnes of food and drink from our homes every year, the majority of which could have been eaten. This wastage costs the average household in the UK £470 a year. 

To help curb this endemic we created an app which uses a barcode scanner to scan food items and notify the user when it is due to be eaten, before the use by date, cutting down on food waste and saving you money. 

### Usage
The scanner connects to [Tesco's API](https://devportal.tescolabs.com/) using an AJAX request which brings back product data to the browser. The products are stored in the database and queried using Knex.

### Built with
- Node.js
- Express
- Bookshelf
- Postgres
- Mocha
- Chai
- Zombie

### Install
This project uses node and npm. Install node directly from the [node.js.org](https://nodejs.org/en/download/) website. Install npm:

```sh
$ npm install 
```


### Testing
- Mocha: JS framework running on Node.js
- Chai: BDD / TDD assertion library
- Zombie: Feature testing for the browser

### Team Members
- [Alex Scott-Tonge](https://github.com/alexscotttonge)
- [Aram Simonian](https://github.com/AramSimonian)
- [Austin Rowsell](https://github.com/andyrow123)
- [Pablo Vidal](https://github.com/Pablo123GitHub)

### Licence
MIT


