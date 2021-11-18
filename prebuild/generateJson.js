const fs = require('fs')

const paths = ["ep1"]

paths.forEach(movie => {
  const path = `public/${movie}`
  const files = fs.readdirSync(path) // .filter(file => fs.lstatSync(path+file).isFile())
  console.log(files)
  const fileData = []
  files.forEach(fileName => {
    const timeString = fileName.match(/([0-9]{2}-[0-9]{2}-[0-9]{2})/ig)[0];
    const [hour, minute, second] = timeString.split('-')
    fileData.push({
      file: `${movie}/${fileName}`,
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: parseInt(second),
      totalSeconds: parseInt(hour) * 60 * 60 + parseInt(minute) * 60 + parseInt(second)
    })
  })
  console.log(fileData)
  fs.writeFile(`./src/frames/${movie}.json`, JSON.stringify(fileData), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('saved', movie)
    }
  })
})