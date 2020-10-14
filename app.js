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
 * we need a way to accept user inputs (prompts and logs?? confirms)
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
    classification: "A",
  },
  {
    name: "car3",
    isAvailable: true,
    classification: "A",
  },
  {
    name: "car2",
    isAvailable: false,
    classification: "A",
  },
];
// we are making an assumption that we have only S model or A model for car classification

function init() {
  const userOrAdmin = prompt(
    'please enter "user" if you are a user or "admin" if you are an admin '
  );

  // logged in as user
  if (userOrAdmin && userOrAdmin.toLowerCase() === "user") {
    // welcome
    console.clear();
    coloredConsole(
      "hello there! \n here's a list of cars available for rental",
      "black"
    );

    userDuties();
  }

  // logged in as admin
  if (userOrAdmin && userOrAdmin.toLowerCase() === "admin") {
    console.clear();
    coloredConsole(
      "welcome admin, you are able to add new cars to the list of cars and determine whether or not they are available",
      "green"
    );
    // call admin duties
    adminDuties();
  }

  // neither of the above logged in case
  if (!userOrAdmin) {
    // null value
    coloredConsole(
      "you have to register as either a user or an admin, please try again",
      "red"
    );
  } else if (
    userOrAdmin.toLowerCase() !== "user" &&
    userOrAdmin.toLowerCase() !== "admin"
  ) {
    // login with another value other than specified
    coloredConsole(
      "But you were told to enter admin or user naa, please try again",
      "red"
    );
  }
}

function userDuties() {
  // check available Cars
  const availableCars = cars
    .filter((car) => car.isAvailable === true)
    .map((car) => {
      // get just the name and its classification off the returned cars
      const { name, classification } = car;
      return { name, classification };
    });

  console.table(availableCars);
  coloredConsole(
    "you can select choose a car you want by typing the name in the prompt above",
    "green"
  );

  const selectedCar = prompt("so which car do you want to rent");

  // book a car
  rentCar(selectedCar);

  // car gets taken off of available cars list
}

function adminDuties() {
  // you can either add a new car as an admin or update the availability of one
  const adminChoice = confirm("do you want to add a new car??");
  if (adminChoice) {
    addNewCar();
  } else {
    const available = confirm(
      "do you want to update the availability of a car?"
    );
    if (available) {
      const name = prompt("enter the name of the car");
      updateAvailability(name, true);
    } else {
      coloredConsole(
        "sorry you can not perform more than those two actions as an admin",
        "red"
      );
    }
  }
}

function addNewCar() {
  const name = prompt("please enter the name of the car");
  // using names to ensure uniqueness because there's no access to randomly generated ID's
  const isDuplicate = cars.find((car) => car.name === name);
  if (!isDuplicate) {
    const isAvailable = confirm("is the car available?? \n click ok for yes");
    const isSmodel = confirm("it is S model?");
    let classification;
    if (isSmodel) {
      classification = "S";
    } else {
      classification = "A";
    }

    const newCar = {
      name,
      isAvailable,
      classification,
    };

    cars.push(newCar);

    console.table(cars);
  } else {
    coloredConsole(
      `sorry a car with that name "${isDuplicate.name}" is already present in the store, maybe add a number to ensure uniqueness`,
      "red"
    );
    // call admin duties again
    adminDuties();
  }
}

function updateAvailability(name, isAdmin = false) {
  const soughtCar = cars.find((car) => car.name === name);
  if (soughtCar && isAdmin) {
    const isNowAvailable = confirm("the car is now available??");
    if (isNowAvailable) {
      soughtCar.isAvailable = true;
      console.table(soughtCar);
    } else {
      soughtCar.isAvailable = false;
      console.table(soughtCar);
    }
  } else if (soughtCar && !isAdmin) {
    // to cater for user making updates to availability
    soughtCar.isAvailable = !soughtCar.isAvailable;
  } else {
    coloredConsole("sorry no car like that was found", "red");
  }
}

// rent the car
function rentCar(rentedCarName) {
  const carInStore = cars.find((car) => car.name === rentedCarName);
  if (carsInStore) {
    updateAvailability(carInStore.name, false);
  } else {
    coloredConsole(
      `you may want to check the list of cars again and choose from the available cars`,
      "red"
    );
  }
  coloredConsole(
    `Congratulations you have completed you rent order, the car will be made available to you in 24hrs`,
    "green"
  );
}

// initialize it all with pressing the enter key
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    init();
  }
});
// extra work to make console pretty
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
      format = "padding: 3px 5px; font-size: 1.2em";
      break;
  }

  return console.log(`%c ${string}`, format);
}
