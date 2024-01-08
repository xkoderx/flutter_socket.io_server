const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");
const bands = new Bands();
bands.addBand(new Band("The Co-Operators"));
bands.addBand(new Band("Iseo && Dodosound"));
bands.addBand(new Band("El Natty Combo"));
bands.addBand(new Band("Ganja"));

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");
  client.emit("bandas-activas", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  // client.on("nuevo-mensaje", (payload) => {
  //   //emite a todos
  //   //io.emit("nuevo-mensaje", payload);
  //   //emite a todos menos a si mismo
  //   client.broadcast.emit("nuevo-mensaje", payload);
  // });
  client.on("voto-banda", (payload) => {
    console.log("Nombre", payload);
    bands.voteBand(payload.id);
    io.emit("bandas-activas", bands.getBands());
  });
  client.on("agregar-banda", (payload) => {
    console.log("Nombre", payload);
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("bandas-activas", bands.getBands());
  });
  client.on("borrar-banda", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("bandas-activas", bands.getBands());
  });
});
