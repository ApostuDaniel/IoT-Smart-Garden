
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function generateData() {
    const sensorObject = {
      temperature: 10,
      moisture: 50,
      light: 300,
      proximity: true,
      date: Date.now,
    }

    const modifyInLimit = (curr, modification, min, max) =>{
        let newVal = curr + modification

        if(newVal < min){
            newVal = min
        }
        else if(newVal > max){
            newVal = max
        }

        return newVal
    }

    const url = 'http://localhost:3005/api'

    while (1) {
      await delay(5000)
      sensorObject.temperature = modifyInLimit(
        sensorObject.temperature,
        getRandomArbitrary(-10, 10),
        -40,
        125
      )
      sensorObject.moisture = Math.floor(
        modifyInLimit(
          sensorObject.moisture,
          getRandomArbitrary(-50, 50),
          0,
          1000
        )
      )
      sensorObject.light = Math.floor(
        modifyInLimit(sensorObject.light, getRandomArbitrary(-50, 50), 0, 1000)
      )
      sensorObject.proximity = getRandomArbitrary(-1, 1) >= 0
      sensorObject.date = Date.now

      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(sensorObject), // body data type must match "Content-Type" header
      })

      console.log(response.json()) // parses JSON response into native JavaScript objects
    }
}

generateData()
