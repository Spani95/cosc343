public class Monster extends EvolveSpecies {
  
  /**
   *  Monster data fields
   */
  public int locationX;
  public int locationY;
  
  /**
   *  Monster constructer.
   */
  public Monster(int locationX, int locationY) {
    this.locationX = locationX;
    this.locationY = locationY;
  }  //End of Monster constructer
  
  /**
   *  Finds the closest creature in the creatures neighbourhood.
   *
   * @return String value of the direction of the closest creature.
   */
  public String nearest_creature() {
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
   *  Updates the monsters locationX, locationY data feilds when necessary,
   *  also updates monster_array in the parent class.
   *
   * @param direction, the way the monster is ment to move(random, north, east, south, west).
   */
  public void monster_move(String direction) {
    String dir = direction;    
    while (dir == "random") {
      dir = default_move_actions[rand.nextInt(4)];
    }
    
    if (dir == "north" && this.locationY > 0) {
      monster_array[this.locationX][this.locationY]--;
      monster_array[this.locationX][this.locationY - 1]++;
      this.locationY--;
    } else if (dir == "east" && this.locationX < world_width - 1) {
      monster_array[this.locationX][this.locationY]--;
      monster_array[this.locationX + 1][this.locationY]++;
      this.locationX++;
    } else if (dir == "south" && this.locationY < world_height - 1) {
      monster_array[this.locationX][this.locationY]--;
      monster_array[this.locationX][this.locationY + 1]++;
      this.locationY++;
    } else if (dir == "west" && this.locationX > 0) {
      monster_array[this.locationX][this.locationY]--;
      monster_array[this.locationX - 1][this.locationY]++;
      this.locationX--;
    }
  }  //End of monster_move method.
  
  /**
   *  Determins if there is a creature in its neighbourhood,
   *  if there is it moves towards it otherwise moves randomly.
   */
  public void select_action() {
    if (nearest_creature() != "zero") {
      monster_move(nearest_creature());
    } else {
      monster_move("random");
    }
  }  //End of select_action method.
  
}  //End of Monster class.
