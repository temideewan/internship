/**
 * You are not required to create any User       	Interfaces, hence, HTML and CSS should not be 	used, Javascript only, use console logs to 			display your outputs.
 *	Cars should be able to be added to the system 	and this should be stored in memory.
 *	Customers should be able to check out 					available cars for rentals and make booking 	24 hours before the pick up time.
 *	Cars can be classified
 *	On ride closure, all ride transactions should be closed
 */

/**
 * THINGS WE NEED TO DO
 *
 * DATA
 *  we need a place to store the data
 * we need to define the data structure
 *
 * INPUT AND OUTPUT
 * 	we need a way to determine user or admin priviledges
 * we need a way to accept user inputs (prompts and logs??)
 * classification of cars
 *
 * FUNCTIONALITY
 * check availabe Cars
 * make a request for a specified car
 * end all transactions
 * add new car(admin)
 */

// WELCOME
console.log(
  '%c Hey there welcome to the car "rental console app"',
  "color: rgba(0, 255,0, 0.9); background: rgba(0, 255,0,0.12); padding: 5px 10px; font-size: 1.4em; "
);
console.log(
  "%c press enter key to proceed as either user or an admin",
  "color:#222; background:rgba(0,0,0,0.12);padding: 5px 10px; font-size: 1.2em;"
);

// global store for cars
const cars = [
  {
    name: "car1",
    isAvailable: true,
    classification: "S",
  },
  {
    name: "car2",
    isAvailable: false,
    classification: "a",
  },
];
function init() {
  const userOrAdmin = prompt(
    'please enter "user" if you are a user or "admin" if you are an admin '
  );

  // logged in as user
  if (userOrAdmin && userOrAdmin.toLowerCase() === "user") {
    coloredConsole(userOrAdmin, "black");
  }

  // logged in as admin
  if (userOrAdmin && userOrAdmin.toLowerCase() === "admin") {
    coloredConsole(
      "welcome admin, you are able to add new cars to the list of cars and determine whether or not they are avilable",
      "green"
    );
    const choice = confirm("do you want to add a new car??");
    if (choice) {
      // coloredConsole("new car", "green");
      addNewCar();
    } else {
      console.log("something is wrong");
    }
  }

  if (!userOrAdmin) {
    coloredConsole(
      "you have to register as either a user or an admin, please try again",
      "red"
    );
  } else if (
    userOrAdmin.toLowerCase() !== "user" &&
    userOrAdmin.toLowerCase() !== "admin"
  ) {
    coloredConsole(
      "But you were told to enter admin or user naa, please try again",
      "red"
    );
  }
}

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    init();
  }
});

// extra work

function addNewCar() {
  const carName = prompt("please enter the name of the car");
  const isAvailable = confirm("is the car available?? \n click ok for yes");

  const newCar = {
    name: carName,
    isAvailable,
  };
  cars.push(newCar);
}
function coloredConsole(string, color) {
  let format = "";
  switch (color) {
    case "green":
      format =
        "color: green; padding: 3px 5px; font-size: 1.2em; background: rgba(0,255,0,0.2)";
      break;
    case "black":
      format =
        "color: black; padding: 3px 5px; font-size: 1.2em; background: rgba(255,198,0,0.2)";
      break;
    case "red":
      format =
        "color: red; padding: 3px 5px; font-size: 1.2em; background: rgba(255,0,0,0.2)";
      break;
    default:
      format = "";
      break;
  }

  return console.log(`%c ${string}`, format);
}
