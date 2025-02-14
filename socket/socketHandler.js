const db = require("../config/db");

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    // Fetch products initially
    db.query("SELECT * FROM products", (err, results) => {
      if (!err) socket.emit("productList", results);
    });

    // Example: Real-time Product Updates
    const products = [
      { id: 1, name: "iPhone 14", price: 999, image: "/images/iphone14.jpg" },
      { id: 2, name: "Samsung S23", price: 899, image: "/images/s23.jpg" },
    ];

    socket.emit("productListUpdate", products);

    setInterval(() => {
      products.push({
        id: products.length + 1,
        name: "New Product " + products.length,
        price: Math.floor(Math.random() * 500) + 100,
        image: "/images/product.jpg",
      });
      io.emit("productListUpdate", products);
    }, 5000);
  });
};

module.exports = setupSocket;
