  // the function called run is contained in our roleBuilder object, and exported to the main module
  var roleRepairer = {

    //when it first runs we get a refrence to our creep
    run: function(creep) {
    
    // if creep is repairing but has no energy it will switch to harvest
   
    
   if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
   }
    //If creep is not repiring yet, but is full of energy it will switch to repair
   if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
       creep.memory.repairing = true;
       creep.say('repair!');
   }
   //our creep will find a construction site
   if(creep.memory.repairing) {
       const targets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
});

targets.sort((a,b) => a.hits - b.hits);

if(targets.length > 0) {
    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
    }
}
   }
   else {
       var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
   }
}
};

module.exports = roleRepairer;