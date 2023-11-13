var mongoose = require("mongoose");
var Consumers = require("./consumers");
var Restaurants = require("./restaurants");

//reservations document schema
const reservationsScahema = mongoose.Schema({
  reservationDate: {
    type: Date,
    required: true,
    trim: true,
  },

  numberOfSeat: {
    type: Number,
    required: true,
    trim: true,
  },

  reservationTime: {
    type: String,
    required: true,
    trim: true,
  },

  typeOfSeat: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "bar interieur",
      "bar exterieur",
      "place dinner interieur",
      "place dinner exterieur",
      "place piscine",
    ],
  },

  note: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },

  consumerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Consumers,
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Restaurants,
  },
  
  createAt: {
    type: Date,
    required: true,
    default : Date.now()
  },
});

//reservation collection modele
const Reservations = mongoose.model("reservations", reservationsScahema);

module.exports = Reservations;
