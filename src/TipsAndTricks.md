
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

