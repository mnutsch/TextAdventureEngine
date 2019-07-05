#TextAdventureEngine

##Introduction
This is a text adventure engine written in Node.js. The idea is to provide command line functionality for an app like Zork, Cave Adventure, or Planetfall.
Originally this app was part of a larger project. However, I decided that it made sense to spin this off into its own repository.

##Setup
Each text adventure is defined by a JSON formatted file which describes the rooms, NPC's, and items.
In this repo, the only adventure provided is "tutorial.json".

To create a new adventure, first create a new JSON file. Then update the line of code in index.js to point to the new JSON file. (See the variable named "adventureData").

