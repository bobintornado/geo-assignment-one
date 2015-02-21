// More work on dynamic lengend needs to be done
// this work is about data standardization
psm = L.layerGroup();
psm_clinics_on_subzones = function(data, map, max) {
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            // console.log(feature.properties.count_value);
            var s_d = feature.properties.count_value / max * 30;
            var center = layer.getBounds().getCenter();
            
            var mk = L.circleMarker(center, {
                radius: s_d,
                color: '#FE2E2E',
                fillOpacity: 0.3
            });

            psm.addLayer(mk);
            map.on('zoomend', function() {
                var currentZoom = map.getZoom();
                // console.log(currentZoom);
                if (currentZoom > 12) {
                    mk.setRadius(s_d * Math.pow(1.2, currentZoom - 12));
                } else {
                    mk.setRadius(s_d * Math.pow(0.5, 12 - currentZoom));
                }
            });
        }
    });
};

calculatePinP = function(points, polygon) {
    var max = 0;
    for (var i = 0; i < points.features.length; i++) {
        var point = points.features[i].geometry.coordinates;
        var results = leafletPip.pointInLayer(point, polygon);
        if (results.length > 0) {
            var target_polygon = results[0];
            // console.log(target_polygon.feature.properties);
            if (target_polygon.feature.properties.count_value == undefined) {
                target_polygon.feature.properties.count_value = 1;
            } else {
                target_polygon.feature.properties.count_value += 1;
                var v = target_polygon.feature.properties.count_value
                if (v > max) {
                    max = v
                };
            }
        };
    };
    return max;
};

loadLayerControl = function() {
    //console.log(counter);
    if (counter == 5) {
        var baseMaps = {
            "Standard Map": standardLayer,
            "Transport Map": transportLayer
        };

        var overlayMaps = {
            // "District": choropeth,
            // "Transaction Volume": proportionalLayer,
            "MRT": mrt
                // "Education": markers
        };

        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false,
            position: "topleft"
        }).addTo(map);
    }
};


remove_node = function(layers) {
    layers.eachLayer(function(layer) {
        if (layer.feature.type === "node") {
            layers.removeLayer(layer);
        };
    });
}

load_pop_data_into_subzone = function() {
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

calculate_ratio = function() {
    for (var i = 0; i < MP14_SUBZONE_WEB_PL.features.length; i++) {

        var total = MP14_SUBZONE_WEB_PL.features[i].properties.population.total;
        var count = MP14_SUBZONE_WEB_PL.features[i].properties.count_value;
        if (total != 0 && count != undefined) {
            MP14_SUBZONE_WEB_PL.features[i].properties.ratio = total / count;
            // console.log(total / count);
        } else {
            MP14_SUBZONE_WEB_PL.features[i].properties.ratio = 0;
        }
    }
};