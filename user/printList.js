const catculate = require('./calculate_distance')
async function print(){
    const values = await catculate(6.0329,80.2168)
console.log(values)
}

print()