# TextAdventureEngine

## Introduction
This is a text adventure engine written in Node.js. The idea is to provide command line functionality for an app like Zork, Cave Adventure, or Planetfall.

## Setup
Each text adventure is defined by a JSON formatted file which describes the rooms, NPC's, and items.
In this repo, the only adventure provided is "tutorial.json".

To create a new adventure, first create a new JSON file. Then update the line of code in index.js to point to the new JSON file. (See the variable named "adventureData").

To prepare the code, first install Node.js on your computer if you do not have it. 
Then run "npm install" from the main directory.

## Adventure Configuration

Each adventure is defined by a JSON file. The repository starts with a file named "tutorial.json". This is found in the JSON folder.

### startingLocation
startingLocation: This is the name of the room that the player will start in.

### rooms
rooms: This element contains an array of objects describing rooms. Rooms are places that the player can navigate through during the game.

#### name (rooms)
name: This is the name of the room. This value should be unique and not be duplicated by other room objects. Do not name a room "inventory" as this is a reserved term.

#### description (rooms)
description: This is a sentence describing the room. It is shown to the user when they first enter a room. It also repeated if the player uses the "look" command.

#### paths (rooms)
paths: This is an array of key value pairs which correspond to other rooms. Paths are the directions that a player can go from the room that they are in. For example, it an item in this array is "north":"porch"; then the player can go to the room "porch" by using the command "north". The following are valid directions: "north", "south", "east", "west", "up", and "down".

#### requires (rooms)
requires: Sometimes a player must have an item in their inventory before navigating to a room. The Requires object defines that relationship.

##### objectName (rooms)
objectName: This is the name of the object that a player must have in their inventory before they can enter the room.

##### cantGoMessage (rooms)
cantGoMessage: This is the message which gets displayed to the user when they can't enter a room due to the lack of the item described in the objectName.

### items
items: This element contains an array of objects describing items. Items are non-character objects that a player can interact with during the game.

#### name (items)
name: This is the name of the item. This value should be unique and not duplicated by other items.

#### description (items)
description: This is a sentence describing the item. It is shown to the user when he/she uses the "look at (item)" command.

#### location (items)
location: This is the initial location of the item. It's value should correspond to the name of a room.

#### canPickUp (items)
canPickUp: This value should be either "true" or "false". It controls whether or not the player is allowed to take the item and add it to his/her inventory. 

### npcs
npcs: This element contains an array of objects decscribing non-player characters (NPCs). NPCs are characters who inhabit the game world. They interact with the player in a variety of ways.

#### name (npcs)
name: This is the name of the NPC.

#### description (npcs)
description: This is a sentence describing the NPC. It is displayed to the player if he/she uses the command "look at (npc)".

#### location (npcs)
location: This is the starting location of the NPC. It should correspond with the name of a room.

#### followsPlayer (npcs)
followsPlayer: This value should be "true" or "false". It controls whether or not a NPC follows a player from room to room.

#### followMessage (npcs)
followMessage: This is a sentence displayed to the user if he/she is following by an NPC.

#### roomMessages (npcs)
roomMessages: This is an object describing statements that the NPC will say in certain rooms.

##### roomName (roomMessages)
roomName: This should correspond with the name of a room. This controls where the initialStatement gets displayed to the player.

##### initialStatement (roomMessages)
initialStatement: This is a sentence displayed to the player when the player and the NPC are in a room together for the first time.

## Playing the Game
After following the instructions in Setup, run the following command to start the text adventure: "node index.js"

### Commands
The following is a list of commands that the player can enter:

look: This describes the player's current room.
look at (item): This describes an object which is in the player's current room or the player's inventory.
look at (npc): This describes an NPC which is in the player's current room.
get (item): This moves an item from the player's current room to the player's inventory.
inventory: This lists the items in the player's inventory.
north: This moves the player to another room if available.
south: This moves the player to another room if available.
east: This moves the player to another room if available.
west: This moves the player to another room if available.
up: This moves the player to another room if available.
down: This moves the player to another room if available.
quit: This quits the game.