# TextAdventureEngine

## Introduction
This is a text adventure engine written in Node.js. The idea is to provide command line functionality for an app like Zork, Cave Adventure, or Planetfall.
Originally this app was part of a larger project. However, I decided that it made sense to spin this off into its own repository.

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

#### name
name: This is the name of the room. This value must be unique and should not be duplicated by other room objects.

#### description
description: This is a sentence describing the room. It is shown to the user when they first enter a room. It also repeated if the player uses the "look" command.

#### paths
paths: This is an array of key value pairs which correspond to other rooms. Paths are the directions that a player can go from the room that they are in. For example, it an item in this array is "north":"porch"; then the player can go to the room "porch" by using the command "north".

#### requires
requires: Sometimes a player must have an item in their inventory before navigating to a room. The Requires object defines that relationship.

##### objectName
objectName: This is the name of the object that a player must have in their inventory before they can enter the room.

##### cantGoMessage
cantGoMessage: This is the message which gets displayed to the user when they can't enter a room due to the lack of the item described in the objectName.

### items
items: This element contains an array of objects describing items. Items are non-character objects that a player can interact with during the game.

#### name

#### description

#### location

#### canPickUp

### npcs
npcs: This element contains an array of objects decscribing non-player characters (NPCs). NPCs are characters who inhabit the game world. They interact with the player in a variety of ways.

#### name

#### description

#### location

#### followsPlayer

#### followMessage

#### roomMessages

##### roomName

##### initialStatement

## Playing the Game
After following the instructions in Setup, run the following command to start the text adventure: "node index.js"

