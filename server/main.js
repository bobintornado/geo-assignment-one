function load_data() {
  // load_pop_data(Total, TOTAL);
  // load_pop_data(Males, MALES);
  // load_pop_data(Females, FEMALES);

  // if (Centers.find().count() === 0) {
  //   Centers.insert(BREASTSCREEN);
  // }
  if (Regions.find().count() === 0) {
    Regions.insert(MP14_REGION_WEB_PL);
  }
  if (Subzones.find().count() === 0) {
    Subzones.insert(MP14_SUBZONE_WEB_PL);
  }

};

function load_pop_data(db, data) {

  if (db.find().count() === 0) {
    for (var i = 0; i < data.length; i++) {
      db.insert(data[i])
    };
  }
};

if (Meteor.isServer) {
  Meteor.startup(function() {

    // Modify data
    load_pop_data_into_subzone();
    // var max = CalculatePinP(MOH_CHAS_CLINICS, MP14_SUBZONE_WEB_PL);

    // Load the data
    load_data();
  });
}

function load_pop_data_into_subzone() {
  Total_pop_max = 0
  for (var i = 0; i < MP14_SUBZONE_WEB_PL.features.length; i++) {
    // Match by name
    var subzone_name = MP14_SUBZONE_WEB_PL.features[i].properties.SUBZONE_N;
    for (var j = 0; j < TOTAL.length; j++) {
      if (TOTAL[j].subzone.toLowerCase() == subzone_name.toLowerCase()) {
        if (TOTAL[j].total > Total_pop_max) {
          Total_pop_max = TOTAL[j].total;
        };
        // copy over population data
        MP14_SUBZONE_WEB_PL.features[i].properties.population = TOTAL[j];
      }
    };
  };
  // console.log("load data into subzones");
  // console.log(MP14_SUBZONE_WEB_PL.features[1].properties);
};