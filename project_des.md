BaseMap: default OpenStreetMap

#About projection reference
EPSG:4326 -- WGS 84
EPSG:3414 -- SVY21
EPSG:3857 -- WGS84 Web Mercator (Auxiliary Sphere)

#About difference 
http://gis.stackexchange.com/questions/48949/epsg-3857-or-4326-for-googlemaps-openstreetmap-and-leaflet

#Thoughts
OSM stores data in 4326, but send data in format of 3857.
So I shall use 3857.

#ogr2ogr
Convert locally, much faster
http://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/

#Use this line if wants to project to EPSG:3857
<!-- ogr2ogr -f GeoJSON -t_srs EPSG:3857 [name].geojson [name].shp -->

#To lat lng
ogr2ogr -f GeoJSON -t_srs EPSG:4326 [name].geojson [name].shp


#ILayer
an object

#the true lib I'm looking for 
#front end computation?
https://github.com/manuelbieh/Geolib