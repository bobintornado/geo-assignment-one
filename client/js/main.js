Meteor.startup(function() {
    map = L.map('map').setView([1.3569, 103.7779], 12);

    L.Icon.Default.imagePath = "/images"

    standardLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //add the tile layer to the map
    transportLayer = L.tileLayer('http://{s}.tile.opencyclemap.org/transport/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });


    // Load MOH_CHAS_CLINICS and set up simple popup of name for now
    Clinics_layer = L.geoJson(MOH_CHAS_CLINICS, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.HCI_NAME)
        }
    });

    // Load zones
    // Fix this issue if has time. Basically need to implement a subscribe callback here
    // var subzones_data = Subzones.find().fetch();
    zones_layer = L.geoJson(MP14_SUBZONE_WEB_PL);
    // zones_layer.addTo(map);

    // var zones_data = Regions.findOne();
    // var zones = L.geoJson(zones_data);
    // zones.addTo(map);

    // zones.setStyle({
    //     fillColor: '#dddddd'
    // })
    var max = calculatePinP(MOH_CHAS_CLINICS, zones_layer);
    psm_clinics_on_subzones(MP14_SUBZONE_WEB_PL, map, max);
    load_pop_data_into_subzone();
    calculate_ratio();

    choropleth_layer = L.geoJson(MP14_SUBZONE_WEB_PL, {
        style: style
    });

    load_mrt();

    function getColor(d) {
        if (d == 0) {
            return '#000000'
        };
        
        return d > 14000 ? '#800026' :
            d > 12000 ? '#BD0026' :
            d > 10000 ? '#E31A1C' :
            d > 8000 ? '#FC4E2A' :
            d > 6000 ? '#FD8D3C' :
            d > 4000 ? '#FEB24C' :
            d > 2000 ? '#FED976' :
            '#FFEDA0';
    };

    function style(feature) {
        return {
            fillColor: getColor(feature["properties"]["ratio"]),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };
});