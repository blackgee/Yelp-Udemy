const mongoose = require('mongoose');
const cities = require('./cities');
const {
  places,
  descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/Yelp-Udemy', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6164e4f6a6c6e104214bc563",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude,
        cities[random1000].latitude,
        ]
      },
      images: [{
          url: 'https://res.cloudinary.com/gabp/image/upload/v1634593467/Yelp-Udemy/kqcwcy7bvbry8xck752c.jpg',
          filename: 'Yelp-Udemy/kqcwcy7bvbry8xck752c'
        },
        {
          url: 'https://res.cloudinary.com/gabp/image/upload/v1634593475/Yelp-Udemy/bzb3gilkjjkydhdzcyta.jpg',
          filename: 'Yelp-Udemy/bzb3gilkjjkydhdzcyta'

        },
        {
          url: 'https://res.cloudinary.com/gabp/image/upload/v1634593476/Yelp-Udemy/a5e8auiypfehx2pdcfgc.jpg',
          filename: 'Yelp-Udemy/a5e8auiypfehx2pdcfgc'

        }
      ]
    })
    await camp.save();
  }
}

// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 300; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price = Math.floor(Math.random() * 20) + 10;
//         const camp = new Campground({
//             //YOUR USER ID
//             author: '5f5c330c2cd79d538f2c66d9',
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
//             price,
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     cities[random1000].longitude,
//                     cities[random1000].latitude,
//                 ]
//             },
//             images: [
//                 {
//                     url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
//                     filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
//                 },
//                 {
//                     url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
//                     filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
//                 }
//             ]
//         })
//         await camp.save();
//     }
// }

seedDB().then(() => {
  mongoose.connection.close();
})
