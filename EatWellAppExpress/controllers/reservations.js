var Reservations = require("../modeles/reservations");
var Consumers = require("../modeles/consumers");
var Restaurants = require("../modeles/restaurants");

const index = async (req, res) => {
  const user = req.user;
  if (!user) return res.statut(401).send("Utilisateur non autorisé");

  if (user.accountType == "consumer") {
    try {
      const consumer = await Consumers.findOne({ userId: user.id });
      const reservations = await Reservations.find({
        consumerId: consumer._id,
      });

      if (!reservations) return res.status(404).send("Not found");

      return res.status(200).send(reservations);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  if (user.accountType == "restaurant") {
    try {
      const restaurant = await Consumers.findOne({ userId: user.id });
      const reservations = await Reservations.find({
        restaurantId: restaurant._id,
      });

      if (!reservations) return res.status(404).send("Not found");

      return res.status(200).send(reservations);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
};

const show = async (req, res) => {
  const user = req.user;
  const reservationId = req.params.id;
  if (!user) return res.status(401).send("Unauthorise user");

  if (user.accountType == "consumer") {
    try {
      const consumer = await Consumers.findOne({ userId: user.id });
      const reservation = await Reservations.findOne({
        _id: reservationId.trim(),
        consumerId: consumer._id,
      });
      if (!reservation) return res.status(404).send("Not found");
      return res.status(200).send(reservation);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");0
    }
  }

  if (user.accountType == "restaurant") {
    try {
      const restaurant = await Restaurants.findOne({ userId: user.id });
      const reservation = await Reservations.findOne({
        _id: reservationId.trim(),
        restaurantId: restaurant._id,
      });
      if (!reservation) return res.status(404).send("Not found");
      return res.status(200).send(reservation);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");0
    }
  }
  
};

const store = async (req, res) => {
  const user = req.user;
  const data = req.body;
  if (!user) return res.status(401).send("UnAuthorize user");
  if (!data.reservationDate || !data.numberOfSeat || !data.selectedReservationTimes || !data.restaurantId || !data.typeOfSeat) {
    return res.status(422).send({
      message: "Unprocessable entries",
      user,
    });
  }

  try {
    const consumer = await Consumers.findOne({ userId: user.id });
    const newReservation = new Reservations({
      reservationDate: data.reservationDate,
      numberOfSeat: data.numberOfSeat,
      typeOfSeat: data.typeOfSeat,
      reservationTime: data.selectedReservationTimes,
      restaurantId: data.restaurantId,
      consumerId: consumer._id,
    });

    const reservation = await newReservation.save();
    return res.status(201).send(reservation);
  } catch (err) {
    console.log(err);
    return res.status("500").send("something went wrong");
  }
};

const destroy = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  if(!user) return res.status(401).send("Unauthorize user");
  if(!id) return res.status(422).send("Unprocessable entries");
  
  if(user.accountType == "consumer"){
    try{
      const consumer = await Consumers.findOne({userId : user.id});
      const deletedReservation = await Reservations.findOneAndDelete({ 
        _id : id,
        consumerId : consumer._id
       })
  
       if(!deletedReservation) return res.status(404).send("Not found");
       return res.status(200).send("Reservation deleted successfully");
       
    }catch(err){
      console.log(err);
      return res.status(500).send("Something went wrong")
    }
  }

  if(user.accountType == "restaurant"){
    try{
      const restaurant = await Restaurants.findOne({userId : user.id});
      const deletedReservation = await Reservations.findOneAndDelete({ 
        _id : id,
        restaurantId : restaurant._id
       })
  
       if(!deletedReservation) return res.status(404).send("Not found");
       return res.status(200).send("Reservation deleted successfully");
       
    }catch(err){
      console.log(err);
      return res.status(500).send("Something went wrong")
    }
  }
};

const update = async (req , res) => {
  const user = req.user;
  const id = req.params.id;
  const data = req.body
  
  if(!user) return res.status(401).send("Unauthorize");
  if(!id || !data) return res.status(422).send("Unprocessable entries");

  try{
    const consumer = await Consumers.findOne({userId : user.id});
    const updatedReservation = await Reservations.findOneAndUpdate({
      _id : id,
      consumerId : consumer._id
    } , data);
    
    if(!updatedReservation) return res.status(404).send("Not found");
    return res.status(200).send("Reservation updated successfully");
    
  }catch(err){
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
}

module.exports = { index, show, store, destroy, update };
