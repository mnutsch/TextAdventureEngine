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

### items
items: This element contains an array of objects describing items. Items are non-character objects that a player can interact with during the game.

### npcs
npcs: This element contains an array of objects decscribing non-player characters (NPCs). NPCs are characters who inhabit the game world. They interact with the player in a variety of ways.

## Playing the Game
After following the instructions in Setup, run the following command to start the text adventure: "node index.js"

