import java.util.*;

public class Creature extends EvolveSpecies {
  
  /**
   * Creature data fields.
   */
  public int locationX;
  public int locationY;
  public int energy_level = 100;
  public double fitness_norm;
  public double fitness_accum;
  public String [] eat_actions = {"eat", "ignore"};
  public String [] move_actions = {"towards", "away_from", "random", "ignore"};
  
  /**
   * Chromosone.
   */
  public String [] chromosone = {
    eat_actions[rand.nextInt(2)],  //action to do when mushroom_present(eat/ignore).
    eat_actions[rand.nextInt(2)],  //action to do when strawb_present(eat/ignore).
    move_actions[rand.nextInt(4)],  //action on nearest_mushroom(towards/away_from/random/ignore).
    move_actions[rand.nextInt(4)],  //action on nearest_strawb(towards/away_from/random/ignore).
    move_actions[rand.nextInt(4)],  //action on nearest_creature(towards/away_from/random/ignore).
    move_actions[rand.nextInt(4)],  //action on nearest_monster(towards/away_from/random/ignore).
    default_move_actions[rand.nextInt(5)],  //default action(random/north/east/south/west).
    "" + rand.nextInt(100),  //action 1 weight.
    "" + rand.nextInt(100),  //action 2 weight.
    "" + rand.nextInt(100),  //action 3 weight.
    "" + rand.nextInt(100),  //action 4 weight.
    "" + rand.nextInt(100),  //action 5 weight.
    "" + rand.nextInt(100),  //action 6 weight.
  };
  
  /**
   *  Creature constructer.
   * 
   * @param locationX, locationY are the creatures x and y coordinates.
   */
  public Creature(int locationX, int locationY) {
    this.locationX = locationX;
    this.locationY = locationY;
  }  //End of Creature constructer.
  
  /**
   *  Sensory functions of the creature.
   */
  
  /**
   *  Indicates if there is a strawberry in the creatures current location.
   * 
   * @return boolean true if strawberry is present otherwise false.
   */
  private boolean strawb_present() {
    if (strawb_array[this.locationX][this.locationY] > 0) {
      return true;
    }
    return false;
  }  //End of strawb_present method.
  
  /**
   *  Indicates if there is a mushroom in the creatures current location.
   * 
   * @return boolean true if mushroom is present otherwise false.
   */
  private boolean mushroom_present() {
    if (mushroom_array[this.locationX][this.locationY] > 0) {
      return true;
    }
    return false;
  }  //End of mushroom_present method.
  
  /**
   *  Finds the closest strawberry in the creatures neighbourhood.
   *
   * @return String value of the direction of the closest strawberry.
   */
  private String nearest_strawb() {
    for (int i = Math.max(this.locationX - 1, 0); i <= Math.min(this.locationX + 1, strawb_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 1, 0); j <= Math.min(this.locationY + 1, strawb_array[0].length - 1); j++) {
        if (strawb_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else { 
            return "south";
          }
        }
      }
    }
    for (int i = Math.max(this.locationX - 2, 0); i <= Math.min(this.locationX + 2, strawb_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 2, 0); j <= Math.min(this.locationY + 2, strawb_array[0].length - 1); j++) {
        if (strawb_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else {
            return "south";
          }
        }
      }
    }
    return "zero";
  }  //End of nearest_strawb method.
  
  /**
   *  Finds the closest mushroom in the creatures neighbourhood.
   *
   * @return String value of the direction of the closest mushroom.
   */
  private String nearest_mushroom() {
    for (int i = Math.max(this.locationX - 1, 0); i <= Math.min(this.locationX + 1, mushroom_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 1, 0); j <= Math.min(this.locationY + 1, mushroom_array[0].length - 1); j++) {
        if (mushroom_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else { 
            return "south";
          }
        }
      }
    }
    for (int i = Math.max(this.locationX - 2, 0); i <= Math.min(this.locationX + 2, mushroom_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 2, 0); j <= Math.min(this.locationY + 2, mushroom_array[0].length - 1); j++) {
        if (mushroom_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else {
            return "south";
          }
        }
      }
    }
    return "zero";
  }  //End of nearest_mushroom method.
  
  /**
   *  Finds the closest creature in the creatures neighbourhood.
   *
   * @return String value of the direction of the closest creature.
   */
  private String nearest_creature() {
    for (int i = Math.max(this.locationX - 1, 0); i <= Math.min(this.locationX + 1, creature_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 1, 0); j <= Math.min(this.locationY + 1, creature_array[0].length - 1); j++) {
        if (creature_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else { 
            return "south";
          }
        }
      }
    }
    for (int i = Math.max(this.locationX - 2, 0); i <= Math.min(this.locationX + 2, creature_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 2, 0); j <= Math.min(this.locationY + 2, creature_array[0].length - 1); j++) {
        if (creature_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else {
            return "south";
          }
        }
      }
    }
    return "zero";
  }  //End of nearest_creature method.
  
  /**
   *  Finds the closest monster in the creatures neighbourhood.
   *
   * @return String value of the direction of the closest monster.
   */
  private String nearest_monster() {
    for (int i = Math.max(this.locationX - 1, 0); i <= Math.min(this.locationX + 1, monster_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 1, 0); j <= Math.min(this.locationY + 1, monster_array[0].length - 1); j++) {
        if (monster_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else { 
            return "south";
          }
        }
      }
    }
    for (int i = Math.max(this.locationX - 2, 0); i <= Math.min(this.locationX + 2, monster_array.length - 1); i++) {
      for (int j = Math.max(this.locationY - 2, 0); j <= Math.min(this.locationY + 2, monster_array[0].length - 1); j++) {
        if (monster_array[i][j] > 0) {
          if (i < this.locationX) {
            return "west";
          } else if (i > this.locationX) {
            return "east";
          } else if (j < this.locationY) {
            return "north";
          } else {
            return "south";
          }
        }
      }
    }
    return "zero";
  }  //End of nearest_monster method.
  
  /**
   *  Updates the creatures locationX, locationY and energy_level data feilds when necessary,
   *  also updates creature_array in the parent class.
   *
   * @param direction, the way the creature is ment to move(random, north, east, south, west).
   */
  private void creature_move(String direction) {
    String dir = direction;    
    while (dir == "random") {
      dir = default_move_actions[rand.nextInt(4)];
    }
    
    if (dir == "north" && this.locationY > 0) {
      creature_array[this.locationX][this.locationY]--;
      creature_array[this.locationX][this.locationY - 1]++;
      this.locationY--;
      this.energy_level--;
    } else if (dir == "east" && this.locationX < world_width - 1) {
      creature_array[this.locationX][this.locationY]--;
      creature_array[this.locationX + 1][this.locationY]++;
      this.locationX++;
      this.energy_level--;
    } else if (dir == "south" && this.locationY < world_height - 1) {
      creature_array[this.locationX][this.locationY]--;
      creature_array[this.locationX][this.locationY + 1]++;
      this.locationY++;
      this.energy_level--;
    } else if (dir == "west" && this.locationX > 0) {
      creature_array[this.locationX][this.locationY]--;
      creature_array[this.locationX - 1][this.locationY]++;
      this.locationX--;
      this.energy_level--;
    }
  }  //End of creature_move method.
  
  /**
   *  Tells the creature what to do upon being on top of either
   *  a strawberry or a mushroom.
   * 
   * @param food_type, the method is passed the type of food.
   */
  private void eat(String food_type) {
    if (food_type == "strawberry") {
      strawb_array[this.locationX][this.locationY]--;
      this.energy_level += 10;
    } else if (food_type == "mushroom") {
      mushroom_array[this.locationX][this.locationY]--;
      this.energy_level = 0;
    }
  }  //End of eat method.
  
  /**
   *  Makes a list of all the viable actions that are availabe to be used
   *  in the creatures current location and then performs the action with 
   *  the greatest weight.
   */
  public void select_action() {
    if(this.energy_level == 0) {
      return;
    }
    List<String []> actions_list = new ArrayList<String []>();
    if (mushroom_present() != false && this.chromosone[0] != "ignore") {
      String [] action1 = {"eat_actions", this.chromosone[0], this.chromosone[7], "mushroom"};
      actions_list.add(action1);
    }
    if (strawb_present() != false && this.chromosone[1] != "ignore" && this.energy_level < 100) {
      String [] action2 = {"eat_actions", this.chromosone[1], this.chromosone[8], "strawberry"};
      actions_list.add(action2);
    }
    if (nearest_mushroom() != "zero" && this.chromosone[2] != "ignore") {
      String [] action3 = {"move_actions", this.chromosone[2], this.chromosone[9], nearest_mushroom()};
      actions_list.add(action3);
    }
    if (nearest_strawb() != "zero" && this.chromosone[3] != "ignore") {
      String [] action4 = {"move_actions", this.chromosone[3], this.chromosone[10], nearest_strawb()};
      actions_list.add(action4);
    }
    if (nearest_creature() != "zero" && this.chromosone[4] != "ignore") {
      String [] action5 = {"move_actions", this.chromosone[4], this.chromosone[11], nearest_creature()};
      actions_list.add(action5);
    }
    if (nearest_monster() != "zero" && this.chromosone[5] != "ignore") {
      String [] action6 = {"move_actions", this.chromosone[5], this.chromosone[12], nearest_monster()};
      actions_list.add(action6);
    }
    
    //If no actions are add to the actions list then do the default.
    if (actions_list.size() == 0) {
      creature_move(this.chromosone[6]);
    } else {
      String [] action = actions_list.get(0);
      int current_weight = Integer.parseInt(actions_list.get(0)[2]);
      
      for (int i = 1; i < actions_list.size(); i++) {
        if (current_weight < Integer.parseInt(actions_list.get(i)[2])) {
          action = actions_list.get(i);
          current_weight = Integer.parseInt(actions_list.get(i)[2]);
        }
      }
      
      //Perform action.
      if (action[0] == "eat_actions") {
        eat(action[3]);
      } else if (action[0] == "move_actions") {
        if (action[1] == "random") {
          creature_move("random");
        } else if (action[1] == "towards") {
          creature_move(action[3]);
        } else if (action[1] == "away_from") {
          if (action[3] == "north") {
            creature_move("south");
          } else if (action[3] == "east") {
            creature_move("west");
          } else if (action[3] == "south") {
            creature_move("north");
          } else {
            creature_move("east");
          }
        }
      }
    }
  }  //End of select_action.
  
}  //End of Creature class. 