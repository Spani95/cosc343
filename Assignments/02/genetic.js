/* COSC 343 Assignment 2 - Genetic Algorithm. Rory Mearns, ID.3928873, 25/4/2015 */

/* ---- World Variables & Data Structures ---- */
// Timing
var timestep = 0;     // the 'world clock'
var total_frames = 50;    // how many steps in a generation
var generation_clock = 0;   // keep track of the generation
var generations = 50;    // how many generations to run
var wait = 0;      // how long to wait between timesteps for possible animation

// Drawing
var world_width_cells = 60;   // world width in number of cells 
var world_height_cells = 20;  // world height in number of cells
var block_size = 20;    // how big a 'cell' is in pixels on the screen
var world_width_pixels = world_width_cells*block_size;  // world width in number of pixels 
var world_height_pixels = world_height_cells*block_size; // world height in number of pixels
var creature_color = "#50B3FA";  // color of creatures: blue
var dead_creature_color = "#000000" // color of dead creatures: black
var monster_color = "#19B319";  // color of monsters: green
var strawberry_color = "#ED3E6F"; // color of strawberries: red
var mushroom_color = "#8F6353";  // color of mushrooms: brown

// Data
var strawb_array = new Array(world_width_cells);    // 2D location array, each cell contains a number indicating the quantity of food
var mushroom_array = new Array(world_width_cells);    // 2D location array, each cell contains a number indicating the quantity of food
var num_creatures = 50;           // number of creatures in the world
var creatures_array = new Array(num_creatures);     // 1D array of all the creatures
var previous_creatures_array = new Array(num_creatures);  // Store the previous generation in
var creatures_location_array = new Array(world_width_cells); // 2D array of all the creatures locations
var num_monsters = 15;           // number of monsters in the world
var monsters_array = new Array(num_monsters);     // 1D array of all the monsters
var monsters_location_array = new Array(world_width_cells);  // 2D array of all the monsters locations
var chance_of_strawb = 0.04;         // the chance of any one cell containing a strawberry
var chance_of_mush = 0.04;          // the chance of any one cell containing a mushroom
var max_strawb = 6;            // the highest number of food any one strawberry tile can contain
var max_mushroom = 6;           // the highest number of food any one mushroom tile can contain 
var energy_from_food = 10;          // how much energy is gained from eating food

// Creature info:
var start_energy = 100;           // how much energy each creature starts with
var eat_actions = ["eat","ignore"];        // for building the chromosones
var move_actions = ["towards", "away_from", "random", "ignore"];   // for building the chromosones
var default_move_actions = ["random", "north", "east", "south", "west"]; // for building the chromosones

// Canvas
var canvas = document.createElement("canvas");     // Create the Canvas element
var ctx = canvas.getContext("2d"); 
canvas.width = world_width_pixels;        // Set the Canvas size based on the size of the world
canvas.height = world_height_pixels;
document.body.appendChild(canvas);


/* ---- Creatures ---- */
function Creature (locationX, locationY) {

 // States & Variables:
 this.locationX = locationX;
 this.locationY = locationY;
 this.energy_level = start_energy;
 this.fitness_value_normalised = undefined;
 this.fitness_value_accumulated = undefined;
 this.actions_list = [];

 // chromosone:
 this.chromosone = new Array(13);
 this.chromosone[0] = eat_actions[Math.floor(Math.random() * 2)];
 this.chromosone[1] = eat_actions[Math.floor(Math.random() * 2)];
 this.chromosone[2] = move_actions[Math.floor(Math.random() * 4)];
 this.chromosone[3] = move_actions[Math.floor(Math.random() * 4)];
 this.chromosone[4] = move_actions[Math.floor(Math.random() * 4)];
 this.chromosone[5] = move_actions[Math.floor(Math.random() * 4)];
 this.chromosone[6] = default_move_actions[Math.floor(Math.random() * 5)];
 this.chromosone[7] = Math.floor(Math.random() * 100) + 1;     // will be an int between 1-100
 this.chromosone[8] = Math.floor(Math.random() * 100) + 1;
 this.chromosone[9] = Math.floor(Math.random() * 100) + 1; 
 this.chromosone[10] = Math.floor(Math.random() * 100) + 1;
 this.chromosone[11] = Math.floor(Math.random() * 100) + 1;
 this.chromosone[12] = Math.floor(Math.random() * 100) + 1;

 // Sensory Functions:
 this.strawb_present = function () {
  if (strawb_array[this.locationX][this.locationY] > 0) {
   return true;
  } else {return false;}
 }

 this.mushroom_present = function () {
  if (mushroom_array[this.locationX][this.locationY] > 0) {
   return true;
  } else {return false;}
 }

 this.nearest_strawb = function () {
  // Check neighborhood:
  // ...first check the squares immediately adjacent:
  for (var i=Math.max(this.locationX-1, 0); i<=Math.min(this.locationX+1, strawb_array.length-1); i++) {
   for (var j=Math.max(this.locationY-1, 0); j<=Math.min(this.locationY+1, strawb_array[0].length-1); j++) {
    if (strawb_array[i][j]>0) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  // ...if there is nothing immediately adjacent, check the next step out:
  for (var i=Math.max(this.locationX-2, 0); i<=Math.min(this.locationX+2, strawb_array.length-1); i++) {
   for (var j=Math.max(this.locationY-2, 0); j<=Math.min(this.locationY+2, strawb_array[0].length-1); j++) {
    if (strawb_array[i][j]>0) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  return false;
 }

 this.nearest_mushroom = function () {
  // Check neighborhood:
  // ...first check the squares immediately adjacent:
  for (var i=Math.max(this.locationX-1, 0); i<=Math.min(this.locationX+1, mushroom_array.length-1); i++) {
   for (var j=Math.max(this.locationY-1, 0); j<=Math.min(this.locationY+1, mushroom_array[0].length-1); j++) {
    if (mushroom_array[i][j]>0) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  // ...if there is nothing immediately adjacent, check the next step out:
  for (var i=Math.max(this.locationX-2, 0); i<=Math.min(this.locationX+2, mushroom_array.length-1); i++) {
   for (var j=Math.max(this.locationY-2, 0); j<=Math.min(this.locationY+2, mushroom_array.length-1); j++) {
    if (mushroom_array[i][j]>0) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  return false;
 }
 
 this.nearest_monster = function () {
  // Check neighborhood:
  // ...first check the squares immediately adjacent:
  for (var i=Math.max(this.locationX-1, 0); i<=Math.min(this.locationX+1, monsters_location_array.length-1); i++) {
   for (var j=Math.max(this.locationY-1, 0); j<=Math.min(this.locationY+1, monsters_location_array.length-1); j++) {
    if (monsters_location_array[i][j]>0) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  // ...if there is nothing immediately adjacent, check the next step out:
  for (var i=Math.max(this.locationX-2, 0); i<=Math.min(this.locationX+2, monsters_location_array.length-1); i++) {
   for (var j=Math.max(this.locationY-2, 0); j<=Math.min(this.locationY+2, monsters_location_array.length-1); j++) {
    if (monsters_location_array[i][j]>0) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  return false;
 }

 this.nearest_creature = function () {
  // Check neighborhood:
  // ...first check the squares immediately adjacent:
  for (var i=Math.max(this.locationX-1, 0); i<=Math.min(this.locationX+1, creatures_location_array.length-1); i++) {
   for (var j=Math.max(this.locationY-1, 0); j<=Math.min(this.locationY+1, creatures_location_array.length-1); j++) {
    if (creatures_location_array[i][j]==1) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  // ...if there is nothing immediately adjacent, check the next step out:
  for (var i=Math.max(this.locationX-2, 0); i<=Math.min(this.locationX+2, creatures_location_array.length-1); i++) {
   for (var j=Math.max(this.locationY-2, 0); j<=Math.min(this.locationY+2, creatures_location_array.length-1); j++) {
    if (creatures_location_array[i][j]==1) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  return false;
 }

 // Actions:
 this.move = function (direction) {
  var dir = direction;

  // If it's random, assign it to a random direction:
  if (dir == "random") {
   dir = default_move_actions[Math.floor(Math.random() * 4) + 1];
  }

  // Do the corresponding for the directions N, E, S, W:
  if (dir == "north" && this.locationY > 0) {
   // Move one block 'south', update: creatures_location_array & this.locationX
   creatures_location_array[this.locationX][this.locationY] = 0;
   creatures_location_array[this.locationX][this.locationY-1] = 1;
   this.locationY--;
   this.energy_level--;
  }
  else if (dir == "east" && this.locationX < world_width_cells-1) {
   // Move one block 'east', update: creatures_location_array & this.locationX
   creatures_location_array[this.locationX][this.locationY] = 0;
   creatures_location_array[this.locationX+1][this.locationY] = 1;
   this.locationX++;
   this.energy_level--;
  }
  else if (dir == "south" && this.locationY < world_height_cells-1) {
   // Move one block 'south', update: creatures_location_array & this.locationX
   creatures_location_array[this.locationX][this.locationY] = 0;
   creatures_location_array[this.locationX][this.locationY+1] = 1;
   this.locationY++;
   this.energy_level--;
  }
  else if (dir == "west" && this.locationX > 0) {
   // Move one block 'west', update: creatures_location_array & this.locationX
   creatures_location_array[this.locationX][this.locationY] = 0;
   creatures_location_array[this.locationX-1][this.locationY] = 1;
   this.locationX--;
   this.energy_level--;
  }
 }

 this.eat = function (food_type) {
  if (food_type == "strawberry") {
   strawb_array[this.locationX][this.locationY]--;
   this.energy_level += energy_from_food;
  } 
  else if (food_type == "mushroom") {
   mushroom_array[this.locationX][this.locationY]--;
   this.energy_level = 0;
   creatures_location_array[this.locationX][this.locationY] = 2;
  }
 }

 this.select_action = function () {
  
  if (this.energy_level == 0) {return;}

  this.actions_list = [];

  // Go through all the senses and add any appropriate actions:
  if (this.strawb_present()!= false && this.chromosone[0] != "ignore") {
   this.actions_list.push(["eat_actions", this.chromosone[0], this.chromosone[7], "strawberry"]);
  }
  if (this.mushroom_present() != false && this.chromosone[1] != "ignore") {
   this.actions_list.push(["eat_actions", this.chromosone[1], this.chromosone[8], "mushroom"]);
  }
  if (this.nearest_strawb() != false && this.chromosone[2] != "ignore") {
   this.actions_list.push(["move_actions", this.chromosone[2], this.chromosone[9], this.nearest_strawb()]);
  }
  if (this.nearest_mushroom() != false && this.chromosone[3] != "ignore") {
   this.actions_list.push(["move_actions", this.chromosone[3], this.chromosone[10], this.nearest_mushroom()]);
  }
  if (this.nearest_monster() != false && this.chromosone[4] != "ignore") {
   this.actions_list.push(["move_actions", this.chromosone[4], this.chromosone[11], this.nearest_monster()]);
  }
  if (this.nearest_creature() != false && this.chromosone[5] != "ignore") {
   this.actions_list.push(["move_actions", this.chromosone[5], this.chromosone[12], this.nearest_creature()]);
  }

  // If nothing is added to the actions list, do the default:
  if (this.actions_list.length == 0) {
   this.move(this.chromosone[6]);
  } else {
   var action = this.actions_list[0];
   var current_weight = this.actions_list[0][2];

   for (var i=1; i<this.actions_list.length; i++) {
    if (current_weight<this.actions_list[i][2]) {
     action = this.actions_list[i];
     current_weight = this.actions_list[i][2];
    }
   }
   // Now do the action:
   if (action[0] == "eat_actions") {
    this.eat(action[3]);
   }
   else if (action[0] == "move_actions") {
    if (action[1] == "random") {
     this.move("random");
    }
    else if (action[1] == "towards") {
     this.move(action[3]);
    }
    else if (action[1] == "away_from") {
     switch (action[3]) {
      case "north":
      this.move("south");
      break;
      case "east":
      this.move("west");
      break;
      case "south":
      this.move("north");
      break;
      case "west":
      this.move("east");
      break;
     }
    }
   }

  }
 }
}

/* ---- Monsters ---- */
function Monster (locationX, locationY) {

 // States:
 this.locationX = locationX;
 this.locationY = locationY;

 // Sensory Functions:
 this.nearest_creature = function () {
  // Check neighborhood:
  // ...first check the squares immediately adjacent:
  for (var i=Math.max(this.locationX-1, 0); i<=Math.min(this.locationX+1, creatures_location_array.length-1); i++) {
   for (var j=Math.max(this.locationY-1, 0); j<=Math.min(this.locationY+1, creatures_location_array.length-1); j++) {
    if (creatures_location_array[i][j]==1) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  // ...if there is nothing immediately adjacent, check the next step out:
  for (var i=Math.max(this.locationX-2, 0); i<=Math.min(this.locationX+2, creatures_location_array.length-1); i++) {
   for (var j=Math.max(this.locationY-2, 0); j<=Math.min(this.locationY+2, creatures_location_array.length-1); j++) {
    if (creatures_location_array[i][j]==1) {
     
     if (i<this.locationX) {
      return "west";
     }
     else if (i>this.locationX) {
      return "east";
     }
     else if (j<this.locationY) {
      return "north";
     } else {return "south"}
    }
   }
  }
  return false;
 }

 // Actions:
 this.move = function (direction) {
  var dir = direction;

  // If it's random, assign it to a random direction:
  if (dir == "random") {
   dir = default_move_actions[Math.floor(Math.random() * 4) + 1];

  // Do the corresponding for the directions N, E, S, W:
  if (dir == "north" && this.locationY > 0) {
   // Move one block 'south', update: monsters_location_array & this.locationX
   monsters_location_array[this.locationX][this.locationY] = 0;
   monsters_location_array[this.locationX][this.locationY-1] = 1;
   this.locationY--;
  }
  else if (dir == "east" && this.locationX < world_width_cells-1) {
   // Move one block 'east', update: monsters_location_array & this.locationX
   monsters_location_array[this.locationX][this.locationY] = 0;
   monsters_location_array[this.locationX+1][this.locationY] = 1;
   this.locationX++;
  }
  else if (dir == "south" && this.locationY < world_height_cells-1) {
   // Move one block 'south', update: monsters_location_array & this.locationX
   monsters_location_array[this.locationX][this.locationY] = 0;
   monsters_location_array[this.locationX][this.locationY+1] = 1;
   this.locationY++;
  }
  else if (dir == "west" && this.locationX > 0) {
   // Move one block 'west', update: monsters_location_array & this.locationX
   monsters_location_array[this.locationX][this.locationY] = 0;
   monsters_location_array[this.locationX-1][this.locationY] = 1;
   this.locationX--;
  }
  collision_check(this.locationX,this.locationY);
 }

 this.select_action = function () {
  // Check for any nearby creatures:
  if (this.nearest_creature() != false) {
   this.move(this.nearest_creature());
  } else {
   this.move("random");
  }
 }
}

/* ---- Operational Functions ---- */
var collision_check = function (x,y) {
 
 // If a monster collides with a creature it kills it:
 for (var i=0; i<creatures_array.length; i++) {
  if (creatures_array[i].locationX == x && creatures_array[i].locationY == y) {
   creatures_array[i].energy_level = 0;
   creatures_location_array[x][y] = 2;
  }
 }
};

var step_creatures = function () {

 // Move every creature
 for (var i=0; i<creatures_array.length; i++) {
  creatures_array[i].select_action();
 }

 // Check for collisions:
 for (var i=0; i<monsters_array.length; i++) {
  collision_check(monsters_array[i].locationX, monsters_array[i].locationY);
 }
};

var step_monsters = function () {
 
 // Move every monster:
 for (var i=0; i<monsters_array.length; i++) {
  monsters_array[i].select_action();
 }
};

var assign_fitness = function () {
 
 // First get the sum:
 var sum = 0;
 for (var i=0; i<creatures_array.length; i++) {
  sum += creatures_array[i].energy_level;
 }

 // Then assign the fitness_value_normalised and calculate the fitness_value_accumulated:
 var accumulation = 0;
 for (var i=0; i<creatures_array.length; i++) {
  creatures_array[i].fitness_value_normalised = creatures_array[i].energy_level/sum;
  accumulation += creatures_array[i].fitness_value_normalised;
  creatures_array[i].fitness_value_accumulated = accumulation;
 }
};

var create_offspring = function () {
 // My implimentation of this first creates a whole new generation of random creatures then
 // 'edits' their chromosomes based on their parents.
 
 for (var i=0; i<creatures_array.length; i++) {
  
  // First find two DIFFERENT parents:
  var parent_1 = find_parent();
  var parent_2 = find_parent();
  
  // ***** BUG! ***** If the population fitness bottoms out to 0 then this
  // becomes an infinate loop, fix by comparing parents by array position!
  while (parent_1 == parent_2) {  
   parent_2 = find_parent();  
  }

  // Then assign the chromosomes from the two different parents:
  // Note if a given 'ACTION' is taken from parent_1, that actions associated
  // 'WEIGHT' is also taken from the same parent:
  creatures_array[i].chromosone[0] = parent_1.chromosone[0];
  creatures_array[i].chromosone[1] = parent_2.chromosone[1];
  creatures_array[i].chromosone[2] = parent_1.chromosone[2];
  creatures_array[i].chromosone[3] = parent_2.chromosone[3];
  creatures_array[i].chromosone[4] = parent_1.chromosone[4];
  creatures_array[i].chromosone[5] = parent_2.chromosone[5];
  creatures_array[i].chromosone[6] = parent_1.chromosone[6];
  creatures_array[i].chromosone[7] = parent_1.chromosone[7];
  creatures_array[i].chromosone[8] = parent_2.chromosone[8];
  creatures_array[i].chromosone[9] = parent_1.chromosone[9];
  creatures_array[i].chromosone[10] = parent_2.chromosone[10];
  creatures_array[i].chromosone[11] = parent_1.chromosone[11];
  creatures_array[i].chromosone[12] = parent_2.chromosone[12];
 
  // With a chance of 1 in 100:
  if ((Math.floor(Math.random() * 99) + 1) == 5) {
  
  // Cause a mutation 
  var r = Math.floor(Math.random() * 12);
   switch (r) {
    case 0:
    creatures_array[i].chromosone[0] = eat_actions[Math.floor(Math.random() * 2)];
    break;
    case 1:
    creatures_array[i].chromosone[1] = eat_actions[Math.floor(Math.random() * 2)];
    break;
    case 2:
    creatures_array[i].chromosone[2] = move_actions[Math.floor(Math.random() * 4)];
    break;
    case 3:
    creatures_array[i].chromosone[3] = move_actions[Math.floor(Math.random() * 4)];
    break;
    case 4:
    creatures_array[i].chromosone[4] = move_actions[Math.floor(Math.random() * 4)];
    break;
    case 5:
    creatures_array[i].chromosone[5] = move_actions[Math.floor(Math.random() * 4)];
    break;
    case 6:
    creatures_array[i].chromosone[6] = default_move_actions[Math.floor(Math.random() * 5)];
    break;
    case 7:
    creatures_array[i].chromosone[7] = Math.floor(Math.random() * 100) + 1;
    break;
    case 8:
    creatures_array[i].chromosone[8] = Math.floor(Math.random() * 100) + 1;
    break;
    case 9:
    creatures_array[i].chromosone[9] = Math.floor(Math.random() * 100) + 1;
    break;
    case 10:
    creatures_array[i].chromosone[10] = Math.floor(Math.random() * 100) + 1;
    break;
    case 11:
    creatures_array[i].chromosone[11] = Math.floor(Math.random() * 100) + 1;
    break;
    case 12:
    creatures_array[i].chromosone[12] = Math.floor(Math.random() * 100) + 1;
    break;
   }
  }
 }
};

var find_parent = function () {
 // Roulette wheel selection:
 
 var r = Math.random();
 for (var j=0; j<num_creatures; j++) {
  var fit = previous_creatures_array[j].fitness_value_accumulated;
  if (fit>r) {
   return previous_creatures_array[j];
  }
 }
};


/* ---- Draw Everything ---- */
var render = function () {

 // If something has moved, remove the rectange:
 for (var i=0; i<world_width_cells; i++) {
  for (var j=0; j<world_height_cells; j++) {
   var x = i*block_size;
   var y = j*block_size;

   if (creatures_location_array[i][j] == 0) {
    ctx.clearRect(x, y, block_size, block_size);
    creatures_location_array[i][j] = undefined;
   }
   if (monsters_location_array[i][j] == 0) {
    ctx.clearRect(x, y, block_size, block_size);
    monsters_location_array[i][j] = undefined;
   }
  }
 }

 // draw the strawberry & mushroom map:
 for (var i=0; i<world_width_cells; i++) {
  for (var j=0; j<world_height_cells; j++) {
   var x = i*block_size;
   var y = j*block_size;

   if (strawb_array[i][j]>0) {
    ctx.fillStyle = strawberry_color;
    ctx.fillRect(x, y, block_size, block_size);
   }
   if (mushroom_array[i][j]>0) {
    ctx.fillStyle = mushroom_color;
    ctx.fillRect(x, y, block_size, block_size);
   }
  }
 }

 // draw the creatures on the map:
 for (var i=0; i<world_width_cells; i++) {
  for (var j=0; j<world_height_cells; j++) {
   var x = i*block_size;
   var y = j*block_size;

   if (creatures_location_array[i][j] == 1) {
    ctx.fillStyle = creature_color;
    ctx.fillRect(x, y, block_size, block_size);
   }
   else if (creatures_location_array[i][j] == 2) {
    ctx.fillStyle = dead_creature_color;
    ctx.fillRect(x, y, block_size, block_size);
   }


  }
 }

 // draw the monsters on the map:
 for (var i=0; i<world_width_cells; i++) {
  for (var j=0; j<world_height_cells; j++) {
   var x = i*block_size;
   var y = j*block_size;

   if (monsters_location_array[i][j] == 1) {
    ctx.fillStyle = monster_color;
    ctx.fillRect(x, y, block_size, block_size);
   }
  }
 }
};


/* ---- Initialise Everything ---- */
var initialise = function () {
 // Clear Arrays for Rendering:
 creatures_location_array = new Array(world_width_cells);
 monsters_location_array = new Array(world_width_cells);
 strawb_array = new Array(world_width_cells);
 mushroom_array = new Array(world_width_cells);

 // Clear canvas:
 ctx.clearRect (0 , 0, world_width_pixels, world_height_pixels);

 // fill strawberry & mushroom array:
 for (var i=0; i<world_width_cells; i++) {
  strawb_array[i] = new Array(world_height_cells);
  mushroom_array[i] = new Array(world_height_cells);

  for (var j=0; j<world_height_cells; j++) {
   var rand = Math.random();

   if (rand<chance_of_strawb) {
    strawb_array[i][j] = Math.floor(Math.random() * max_strawb) + 1;
    mushroom_array[i][j] = 0;
   }
   else if (rand>(1-chance_of_mush)) {
    mushroom_array[i][j] = Math.floor(Math.random() * max_mushroom) + 1;
    strawb_array[i][j] = 0;
   } else {
    mushroom_array[i][j] = 0;
    strawb_array[i][j] = 0;
   }
  }
 }

 // Create sparse array of monster and creature locations:
 for (var i=0; i<world_width_cells; i++) {
  monsters_location_array[i] = new Array(world_height_cells);
  creatures_location_array[i] = new Array(world_height_cells);
 }

 // fill creatures_array
 for (var i=0; i<num_creatures; i++) {
  // find a random location in the 2D array:
  var x = Math.floor(Math.random() * world_width_cells);
  var y = Math.floor(Math.random() * world_height_cells);

  if (creatures_location_array[x][y] == undefined) {
   creatures_array[i] = new Creature(x,y);
   creatures_location_array[x][y] = 1;
  } else {
   i--;
  }
 }

 // fill monsters_array:
 for (var i=0; i<num_monsters; i++) {
  // find a random location in the 2D array:
  var x = Math.floor(Math.random() * world_width_cells);
  var y = Math.floor(Math.random() * world_height_cells);

  if (monsters_location_array[x][y] == undefined){
   monsters_array[i] = new Monster(x,y);
   monsters_location_array[x][y] = 1;
  } else { 
   i--;
  }
 }

 // Check for any immediate monster+creature collisions:
 for (var i=0; i<monsters_array.length; i++) {

  for (var j=0; j<creatures_array.length; j++) {

   if (monsters_array[i].locationX == creatures_array[j].locationX && monsters_array[i].locationY == creatures_array[j].locationY) {
    // console.log("Collision on initialisation! Creature instantly killed");
    creatures_array[j].energy_level = 0;
    creatures_location_array[creatures_array[j].locationX][creatures_array[j].locationY] == 2;
   }
  }
 }
};


/* ---- Program Funcitons ---- */
var main = function () {

 // Step creatures every time step:
 step_creatures();

 // Step monsters every second time step:
 if (timestep%2 == 0) {step_monsters();}

 // Re-render everything and increment timestep:
 render();  
 timestep++;

 // Loop if we are not at the end of the generation, otherwise sort the creatures_array:
 if (timestep<total_frames) {
  setTimeout(function () {requestAnimationFrame(main);}, wait);
 } 
 else if (timestep >= total_frames && generation_clock < generations){  // What to do at the end of each generation:

  // Sort the creatures array and assign their fitness:
  creatures_array.sort(function(obj1, obj2) {return obj2.energy_level - obj1.energy_level;});
  assign_fitness();
  previous_creatures_array = creatures_array.slice();

  // Print out the average population of the generation: 
  var sum = 0;
  for (var i=0; i<creatures_array.length; i++) {
   sum += creatures_array[i].energy_level;
  }
  var average = sum/creatures_array.length;
  console.log("Generation " + generation_clock + "\t" + average);
  
  // Set up a new world for the next generation:
  initialise();
  create_offspring();
  render();
  generation_clock++;
  timestep = 0;

  // Loop back to the start of main
  setTimeout(function () {requestAnimationFrame(main);}, wait);

 } else { // If we are at the end of the last generation:

  creatures_array.sort(function(obj1, obj2) {return obj2.energy_level - obj1.energy_level;});

  // Print out the average population of the generation: 
  var sum = 0;
  for (var i=0; i<creatures_array.length; i++) {
   sum += creatures_array[i].energy_level;
  }
  var average = sum/creatures_array.length;
  console.log("Generation " + generation_clock + "\t" + average);

  // Log out that we are at the end!
  console.log("Finished");
 }
};


/* ---- Running the Program ---- */
// First initialise everything
initialise();

// Then render everything on the screen
render();

// Then head on in to the main function
main();}
