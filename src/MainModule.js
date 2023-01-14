    // these first three objects are importing the function which runs their roles
    var roleHarvester = require('role.harvester');
    var roleUpgrader = require('role.upgrader');
    var roleBuilder = require('role.builder');
    var roleRepairer = require('role.repairer');
    
        // this is our main game loop all of our code to run our colony should be within here
    module.exports.loop = function () {

        // a loop to see how much energy is available in this room

        for(var name in Game.rooms) {
            console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
        }

        // if a creep does not exist we will delete it from memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        // Tower refrence, and then find hostiles and attack them
        
        var tower = Game.getObjectById('63c2386d42011dfb66a76616');
        if(tower) {     
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile){
                    tower.attack(closestHostile);
            }
            
        }
                // tower will find and repair closest roads
        var closestDamagedRoad = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (road) => road.structureType == STRUCTURE_ROAD && road.hits < road.hitsMax });
             if(closestDamagedRoad) {
        tower.repair(closestDamagedRoad);
             }
      
        // _ is a short cut for lodash, which applies a filter
        // to tell us how many harvesters we have
        // then it reports to the console
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        
        // if under 2 we will spawn and assign its role
       
          if(harvesters.length < 3) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});        
                
          }
       
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
        
         var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('upgraders: ' + upgraders.length);
    
        if(upgraders.length < 1) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});        
        }
    
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('builders: ' + builders.length);
    
        if(builders.length < 5) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'builder'}});        
        }
        
          var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('repairers: ' + repairers.length);
    
        if(repairers.length < 2) {
            var newName = 'repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'repairer'}});        
        }
    
    
    
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
           
           if(creep.memory.role == 'repairer') {
               roleRepairer.run(creep);
           }
           
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }