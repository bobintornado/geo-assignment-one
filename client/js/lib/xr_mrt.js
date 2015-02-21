load_mrt = function() {
    counter = 0;
    //==== Load MRT =======
    var eastWestLine = ["160808332", "141393160", "141393156", "19881423",
        "19939726", "142440364", "142440361", "20141158", "20141164", "19880782",
        "142420479", "142424444", "19979739"
    ];
    var northSouthLine = ["19987450", "93836774", "93836775", "19810659", "103410980",
        "233926982", "233926990", "233926980", "233926981", "233926987", "233927001", "233926992",
        "233926991", "233926984", "233926998", "233927002", "233926989", "233926996", "233926999",
        "233926997", "173131864", "141393963", "141393961"
    ];
    var northEastLine = ["20164999"];
    var circleLine = ["35308148", "35308147", "33739391", "140918628"];
    var downtownLine = ["178063325", "251603805", "251603810", "203845606", "203845607"];

    var eastWestStyle = {
        fillOpacity: 1,
        opacity: 1,
        color: '#39ac00',
        weight: 3,

    }

    var northSouthStyle = {
        fillOpacity: 1,
        opacity: 1,
        color: '#dc0000',
        weight: 3,
    }

    var northEastStyle = {
        fillOpacity: 1,
        opacity: 1,
        color: '#8000a5',
        weight: 3,
    }

    var circleStyle = {
        fillOpacity: 1,
        opacity: 1,
        color: '#F4B234',
        weight: 3,
    }

    var downtownStyle = {
        fillOpacity: 1,
        opacity: 1,
        color: '#0354A6',
        weight: 3,
    }

    var mrt = L.layerGroup();
    var eastWestCounter = 0;
    var northSouthCounter = 0;
    var northEastCounter = 0;
    var circleCounter = 0;
    var downtownCounter = 0;
    var eastWestLayer;
    var northSouthLayer;
    var northEastLayer;
    var circleLayer;
    var downtownLayer;

    for (var i = 0; i < eastWestLine.length; i++) {
        $.ajax({
            url: "http://www.openstreetmap.org/api/0.6/way/" + eastWestLine[i] + "/full",
            dataType: "xml",
            success: function(xml) {
                eastWestLayer = new L.OSM.DataLayer(xml);
                eastWestLayer.setStyle(eastWestStyle);
                mrt.addLayer(eastWestLayer);
                eastWestCounter++;

                remove_node(eastWestLayer);

                if (eastWestCounter == eastWestLine.length) {
                    counter++;
                    loadLayerControl();
                }
            }
        });
    }

    for (var i = 0; i < northSouthLine.length; i++) {
        $.ajax({
            url: "http://www.openstreetmap.org/api/0.6/way/" + northSouthLine[i] + "/full",
            dataType: "xml",
            success: function(xml) {
                northSouthLayer = new L.OSM.DataLayer(xml);
                northSouthLayer.setStyle(northSouthStyle);
                mrt.addLayer(northSouthLayer);
                northSouthCounter++;

                remove_node(northSouthLayer);

                if (northSouthCounter == northSouthLine.length) {
                    counter++;
                    loadLayerControl();
                }
            }
        });
    }

    for (var i = 0; i < northEastLine.length; i++) {
        $.ajax({
            url: "http://www.openstreetmap.org/api/0.6/way/" + northEastLine[i] + "/full",
            dataType: "xml",
            success: function(xml) {
                northEastLayer = new L.OSM.DataLayer(xml);
                northEastLayer.setStyle(northEastStyle);
                mrt.addLayer(northEastLayer);
                northEastCounter++;

                remove_node(northEastLayer);

                if (northEastCounter == northEastLine.length) {
                    counter++;
                    loadLayerControl();
                }
            }
        });
    }

    for (var i = 0; i < circleLine.length; i++) {
        $.ajax({
            url: "http://www.openstreetmap.org/api/0.6/way/" + circleLine[i] + "/full",
            dataType: "xml",
            success: function(xml) {
                circleLayer = new L.OSM.DataLayer(xml);
                circleLayer.setStyle(circleStyle);
                mrt.addLayer(circleLayer);
                circleCounter++;

                remove_node(circleLayer);

                if (circleCounter == circleLine.length) {
                    counter++;
                    loadLayerControl();
                }
            }
        });
    }

    for (var i = 0; i < downtownLine.length; i++) {
        $.ajax({
            url: "http://www.openstreetmap.org/api/0.6/way/" + downtownLine[i] + "/full",
            dataType: "xml",
            success: function(xml) {
                downtownLayer = new L.OSM.DataLayer(xml);
                downtownLayer.setStyle(downtownStyle);
                mrt.addLayer(downtownLayer);
                downtownCounter++;

                remove_node(downtownLayer);

                if (downtownCounter == downtownLine.length) {
                    counter++;
                    loadLayerControl();
                }
            }
        });
    }

    function loadLayerControl() {
        //console.log(counter);
        if (counter == 5) {
            var baseMaps = {
                "Standard Map": standardLayer,
                "Transport Map": transportLayer
            };

            var overlayMaps = {
                "MRT": mrt,
                "Clinics": Clinics_layer,
                "Number of Clinics":psm,
                "Population/Clinics Number": choropleth_layer,
                "Subzones": zones_layer
            };

            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false,
                position: "topright"
            }).addTo(map);
        }
    }
};
