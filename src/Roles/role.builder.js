  // the function called run is contained in our roleBuilder object, and exported to the main module
  var roleBuilder = {

    //when it first runs we get a refrence to our creep
    run: function(creep) {
    
    // if creep is trying to build but has no energy it will return false

   if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            // creep then switches to harvest with visual que
            creep.say('🔄 harvest');
   }
    //If creep is not building yet, but is full of energy it will switch to build
   if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
       creep.memory.building = true;
       creep.say('🚧 build');
   }
   //our creep will find a construction site
   if(creep.memory.building) {
       var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {

    // visualize path will allow us to see where our creep is going
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleBuilder;