'use strict'

const readline = require('readline');
const async = require('async');
var fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Reading adventure data.
var adventureData = fs.readFileSync("json/tutorial.json");
var adventureJSON = JSON.parse(adventureData);

var continueLoop = true;
var exitWord = "quit";
var prompt = 'input: ';
var currentRoom = adventureJSON.startingLocation;

var possibleDirections = [
  "north",
  "south",
  "east",
  "west",
  "up",
  "down"
];

var exploredRooms = [];

/***************************************
 * lookAtItem(itemName, itemsInTheRoom)
 * description: 
 * Accepts a string with an item name.
 * Also accepts an array of item objects.
 * Returns the description of an array
 * object whose name matches the itemName.
 **************************************/
function lookAtItem(itemName, itemsInTheRoom){
  let trimmedItemName = itemName.trim();
  for(var i = 0; i < itemsInTheRoom.length; i++){
    if(itemsInTheRoom[i].name == trimmedItemName){
      return itemsInTheRoom[i].description;
    }
  }
  return null;
}

/***************************************
 * getRoomInfo(roomName)
 * description: 
 * Accepts a string with a room name.
 * Returns an object containing information
 * about that room.
 **************************************/
function getRoomInfo(roomName){
  for(var i = 0; i < adventureJSON.rooms.length; i++){
    if(adventureJSON.rooms[i].name == roomName){
      return adventureJSON.rooms[i];
    }
  }
  return {};
}

/***************************************
 * getRoomItems(roomName)
 * description: 
 * Accepts a string with a room name.
 * Returns an an array of objects containing information
 * about items present in that room.
 **************************************/
function getRoomItems(roomName){
  var returnArray = [];
  for(var i = 0; i < adventureJSON.items.length; i++){
    if(adventureJSON.items[i].location == roomName){
      returnArray.push(adventureJSON.items[i]);
    }
  }
  return returnArray;
}

/***************************************
 * doesPlayerHaveItem(itemName)
 * description: 
 * Accepts a string with an item name.
 * Returns true or false based on if the
 * item is in the player's inventory.
 **************************************/
function doesPlayerHaveItem(itemName){
  for(var i = 0; i < adventureJSON.items.length; i++){
    if(adventureJSON.items[i].name == itemName){
      if(adventureJSON.items[i].location == "inventory"){
        return true;
      }
    }
  }
  return false;
}

/***************************************
 * getRoomNPCs(roomName)
 * description: 
 * Accepts a string with a room name.
 * Returns an an array of objects containing information
 * about non player characters present in that room.
 **************************************/
function getRoomNPCs(roomName){
  var returnArray = [];
  for(var i = 0; i < adventureJSON.npcs.length; i++){
    if(adventureJSON.npcs[i].location == roomName){
      returnArray.push(adventureJSON.npcs[i]);
    }
  }
  return returnArray;
}

/***************************************
 * getNPCStatement(roomName, NPCName)
 * description: 
 * This function gets the NPC's statement 
 * for a given room.
 **************************************/
function getNPCStatement(roomName, NPCName){
  //iterate through the NPCs
  for(var i = 0; i < adventureJSON.npcs.length; i++){
    if(adventureJSON.npcs[i].name == NPCName){
      if(adventureJSON.npcs[i].roomMessages != undefined){
        for(var j = 0; j < adventureJSON.npcs[i].roomMessages.length; j++){
          if(adventureJSON.npcs[i].roomMessages[j].roomName == roomName){
            return adventureJSON.npcs[i].roomMessages[j].initialStatement;
          }
        }
      }
    }
  }
  return null;
}

/***************************************
 * updateNPCRoom(NPCName, newRoomName)
 * description: 
 * Updates the room that an NPC is in.
 **************************************/
function updateNPCRoom(NPCName, newRoomName){
  for(var i = 0; i < adventureJSON.npcs.length; i++){
    if(adventureJSON.npcs[i].name == NPCName){
      adventureJSON.npcs[i].location = newRoomName;
    }
  }
}

/***************************************
 * updateItemLocation(ItemName, newLocationName)
 * description: 
 * Updates the location of an item.
 **************************************/
function updateItemLocation(ItemName, newLocationName){
  for(var i = 0; i < adventureJSON.items.length; i++){
    if(adventureJSON.items[i].name == ItemName){
      adventureJSON.items[i].location = newLocationName;
    }
  }
}

/***************************************
 * checkForDirection(currentRoomObject, direction)
 * description: 
 * Accepts an object containing room info.
 * Also accepts a string containing a direction.
 * Returns the new room name if the direction is valid 
 * for that room.
 **************************************/
function checkForDirection(currentRoomObject, direction){
  if(currentRoomObject.paths[direction] != undefined){
    if(currentRoomObject.requires != undefined){
      //check the player's inventory for the required item
      if(doesPlayerHaveItem(currentRoomObject.requires.objectName)){
        return currentRoomObject.paths[direction];
      }      
      else{
        if(currentRoomObject.requires.cantGoMessage){
          sayToUser(currentRoomObject.requires.cantGoMessage);
        }
        return null;
      }
    }
    else {
      return currentRoomObject.paths[direction];
    }
  }
  else {
    return null;
  }
}

/***************************************
 * checkIfInputIsDirection(input, possDirections)
 * description: 
 * Accepts a string that is a user input.
 * Also accepts an array of possible directions.
 * If the user input string contains a direction,
 * then returns that direction.
 **************************************/
function checkIfInputIsDirection(input, possDirections){
  //console.log('input = ', input)
  for(var i = 0; i < possDirections.length; i++){
    if(input.indexOf(possDirections[i]) > -1) {
      return possDirections[i];
    };
  }
  return null;
}

/***************************************
 * sayToUser(somethingToSay)
 * description: 
 * This will output the
 * thing to say. 
 **************************************/
function sayToUser(somethingToSay){
  console.log(somethingToSay);
}

/***************************************
 * getFollowingNPCs(roomName, NPCList)
 * description: 
 * Returns an array of NPC names where
 * the NPC is in the room and following
 * the player.
 **************************************/
function getFollowingNPCs(roomName, NPCList){
  let returnArray = [];
  for(let i = 0; i < NPCList.length; i++){
    if(NPCList[i].location == roomName){
      if(NPCList[i].followsPlayer == true){
        returnArray.push(NPCList[i]);
      }
    }; 
  }
  return returnArray;
}

var roomObject = {};
var roomItems = [];
var roomNPCs = [];

async.whilst(
  function(callback) {
    let returnValue = false;
    if(continueLoop == true){
      returnValue = true;
    } else {
      returnValue = false;
    }
    return callback(null, returnValue); 
  },
  function(callbackOuter) {
    
    setTimeout(function() {

      roomObject = getRoomInfo(currentRoom);
      roomItems = getRoomItems(currentRoom);
      roomNPCs = getRoomNPCs(currentRoom);

      sayToUser(roomObject.name);
      // Show the room description if this is the player's first time here.
      if(exploredRooms.indexOf(roomObject.name) == -1) {
        sayToUser(roomObject.description);
        exploredRooms.push(roomObject.name);
      }
      if(roomItems.length > 0){
        sayToUser('Items here are: ');
        for(let i = 0; i < roomItems.length; i++){
          sayToUser(roomItems[i].name);
        };  
      }
      if(roomNPCs.length > 0){
        //list the NPC's
        sayToUser('People here are: ');
        for(let i = 0; i < roomNPCs.length; i++){
          sayToUser(roomNPCs[i].name);
        };  

        //let the NPC's say things
        for(let i = 0; i < roomNPCs.length; i++){
          let NPCStatement = getNPCStatement(roomObject.name, roomNPCs[i].name);
          if((NPCStatement != undefined) && (NPCStatement != null)){
            sayToUser(NPCStatement);
          }
        };  
      }
      
      rl.question(prompt, (answer) => {
        answer = answer.toLowerCase();
        let inputIsDirectionResult = checkIfInputIsDirection(answer, possibleDirections);
        if(inputIsDirectionResult != null){
          let newRoom = checkForDirection(roomObject, inputIsDirectionResult);

          //update any NPC's which are following the player
          if(newRoom != null){
            let followingNPCs = getFollowingNPCs(roomObject.name, roomNPCs)
            for(let i = 0; i < followingNPCs.length; i++){
              sayToUser(followingNPCs[i].followMessage);
              updateNPCRoom(followingNPCs[i].name, newRoom)
            };
          }
          
          if(newRoom != null){
            currentRoom = newRoom;
          }
          else {
            sayToUser("You can't go that way.");
          }
        }
        else if(answer.indexOf(exitWord) > -1) {
          sayToUser('exiting');
          continueLoop = false;
        }
        else if(answer.indexOf("help") > -1) {
          sayToUser("Possible commands are: north, east, south, west, up, down, look, help, inventory, look at item name, look at person name");
        }
        else if(answer.indexOf("get") > -1) {
          let getTextLocation = answer.indexOf("get");
          let itemPickedUp = answer.substring(getTextLocation + 4);
          let itemDescription = lookAtItem(itemPickedUp, roomItems);
          if(itemDescription != null){
            updateItemLocation(itemPickedUp, "inventory");
            sayToUser('You picked up ' + itemPickedUp);
          } 
          else{
            sayToUser("There isn't a " + itemPickedUp + " here.");
          }
          
        }
        else if(answer.indexOf("look at") > -1) {
          let lookAtLocation = answer.indexOf("look at");
          let itemLookedAt = answer.substring(lookAtLocation + 7);
          let itemDescription = lookAtItem(itemLookedAt, roomItems);
          if(itemDescription != null){
            sayToUser(itemDescription);
          } 
          else{
            let myInventory = getRoomItems("inventory");
            let invDescription = lookAtItem(itemLookedAt, myInventory);
            if(invDescription != null){
              sayToUser(invDescription);
            }
            else {
              let npcDescription = lookAtItem(itemLookedAt, roomNPCs);
              if(npcDescription != null){
                sayToUser(npcDescription);
              } 
              else{
                sayToUser(itemLookedAt.trim() + " is not present here.");
              }
            }
          }
          
        }
        else if(answer.indexOf("look") > -1) {
          sayToUser(roomObject.description);
        }
        else if(answer.indexOf("inventory") > -1) {
          let myInventory = getRoomItems("inventory");
          if(myInventory.length > 0){
            sayToUser("You are carrying: ");
            for(var i = 0; i < myInventory.length; i++){
              sayToUser(myInventory[i].name)
            };  
          }
          else {
            sayToUser("You aren't carrying anything.");
          }
        }
        else {
          if(answer != ""){
            sayToUser("Sorry, but I didn't understand you.");
          }
        }
        callbackOuter();
      })
      
    }, 10);
  },
  function (err, n) {
    //console.log('something happened. err == ', err, ' n == ', n);
    rl.close();
  }
);  

