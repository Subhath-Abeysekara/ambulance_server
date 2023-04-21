function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }

module.exports = async function randomly_generate_longitude(lat , lon){
let lat_min = 0
let lon_min = 0
let distance_value = 0
while(true){
    let random_value = getRandomFloat(1,10,0)
    let remainder = random_value%2
    if(remainder===0){
        const random1 = getRandomFloat(0,1,4)
        lat_min = lat - random1
    }
    else{
        const random1 = getRandomFloat(0,1,4)
        lat_min = lat + random1
    }
    random_value = getRandomFloat(1,10,0)
    remainder = random_value%2
    if(remainder===0){
        const random1 = getRandomFloat(0,1,4)
        lon_min = lon - random1
    }
    else{
        const random1 = getRandomFloat(0,1,4)
        lon_min = lon + random1
    
    }
    distance_value = distance(lat,lon,lat_min,lon_min,'K')
    if(distance_value<=5&&distance_value>=0.2){
        break
    }
}
return ({
    distance: distance_value,
    latitude: lat_min,
    longitude: lon_min
})
} 