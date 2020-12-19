const routes = require("next-routes");

// Name   Page      Pattern
module.exports = routes() // ----   ----      -----

  .add("tickets/ticketshow", "/ticketshow/:id")
  .add("orders/showorders","/showorders/:id");