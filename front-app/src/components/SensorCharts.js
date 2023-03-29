import React, {useState, useEffect} from 'react'
import SensorChart from './SensorChart'

const SensorCharts = () =>{
    const [sensors, setSensors] = useState([])
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetchSensorData()
    })

    const fetchSensorData = async () =>{
        const results = await fetch('http://localhost:3005/api', {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        const data = await results.json()
        console.log(data[data.length - 1])
        if(sensors.length === 0 || data[data.length - 1]['_id'] !== sensors[sensors.length - 1]['_id']){
            createNotifications(data[data.length - 1])
        }
        setSensors(data)
        
    }

    const createNotifications = (sensorData) =>{
        if(sensorData.temperature < 10){
            setNotifications([
              { cause: 'Temperature', state: 'High' },
              ...notifications,
            ])
        }
        else if(sensorData.temperature < 40){
            setNotifications([
              { cause: 'Temperature', state: 'High' },
              ...notifications,
            ])
        }

        if (sensorData.moisture < 200) {
          setNotifications([
            { cause: 'Moisture', state: 'Low' },
            ...notifications,
          ])
        } else if (sensorData.moisture >= 800) {
          setNotifications([
            { cause: 'Moisture', state: 'High' },
            ...notifications,
          ])
        }

        if(sensorData.light < 300){
            setNotifications([
              { cause: 'Light Intensity', state: 'Low' },
              ...notifications,
            ])
        }
    }
 
    return (
      <div className="charts-wrapper">
        <div className="notifification-bar">
          <h2>Notification</h2>
          {notifications.map((notification) => (
            <div className="notification">
              <h3>{notification.cause}</h3>
              <p>{notification.cause} is to {notification.state}</p>
            </div>
          ))}
        </div>
        <div className="charts">
          <div>
            {SensorChart(
              'Temperature',
              sensors.map((record) =>
                new Date(record.date).toLocaleTimeString('ro-RO')
              ),
              sensors.map((record) => record.temperature),
              'degrees Celsius',
              'rgb(53, 162, 235)',
              'rgba(53, 162, 235, 0.5)'
            )}
          </div>
          <div>
            {SensorChart(
              'Moisture',
              sensors.map((record) =>
                new Date(record.date).toLocaleTimeString('ro-RO')
              ),
              sensors.map((record) => record.moisture),
              'l/m3',
              'rgb(53, 162, 235)',
              'rgba(53, 162, 235, 0.5)'
            )}
          </div>
          <div>
            {SensorChart(
              'Luminosity',
              sensors.map((record) =>
                new Date(record.date).toLocaleTimeString('ro-RO')
              ),
              sensors.map((record) => record.light),
              'light',
              'rgb(53, 162, 235)',
              'rgba(53, 162, 235, 0.5)'
            )}
          </div>
        </div>
      </div>
    )
}

export default SensorCharts;