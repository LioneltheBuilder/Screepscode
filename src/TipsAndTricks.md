
// paste this into console to spawn a creep
// change body parts , role and name as needed. 
// this is used to spawn before we set up auto spawn

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',
    { memory: { role: 'builder' } } );



// If we have an emergency attack and need to activate safe mode 
// type this directly into console to temporarily prevent an attack

Game.spawns['Spawn1'].room.controller.activateSafeMode();



//  This is code from the tutorial which is telling the tower to first 
// find and repair damaged walls, and then to find and attack hostiles


 var tower = Game.getObjectById('0718f11319d2e91b19f18d80');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }


// use this too see how many energy is available in the room


    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }



    // This one will spawn our Bigger Harvesters or builders

    Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );

    Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
    'BigBuilder1',
    { memory: { role: 'harvester' } } );