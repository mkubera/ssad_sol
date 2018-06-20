const express = require('express')
const app = express()
const nunjucks  = require('nunjucks')
const bodyParser = require('body-parser')

// serves nunjucks templates from /views folder
nunjucks.configure('views', {
  autoescape: true,
  express   : app
})

// serves static assets from /static folder
app.use(express.static('static'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// creatures of myths, & gods
const data = [
  {
    id: 1,
    name: 'Cerberus',
    description: 'The monstrous multi-headed dog that guards the gates of the Underworld to prevent the dead from leaving',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hercules_and_Cerberus_LACMA_65.37.151.jpg/676px-Hercules_and_Cerberus_LACMA_65.37.151.jpg',
    thumbs: 0,
  },
  {
    id: 2,
    name: 'Tezcatlipoca',
    description: 'Central deity in Aztec religion. His name can be translated to "Smoking Mirror".',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Tezcatlipoca_3.jpg',
    thumbs: 0,
  },
  {
    id: 3,
    name: 'Dionysus',
    description: 'God of the vine, grape harvest, winemaking, wine, ritual madness, religious ecstasy, and theatre.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dionysos_Louvre_Ma87_n2.jpg/304px-Dionysos_Louvre_Ma87_n2.jpg',
    thumbs: 0,
  },
  {
    id: 4,
    name: 'Kodama',
    description: 'Spirit in Japanese folklore that inhabits trees; similar to the dryads of Greek mythology.',
    image: 'https://i2.wp.com/matthewmeyer.net/wordpress/wp-content/uploads/2010/10/Kodama.png',
    thumbs: 0,
  },
  {
    id: 5,
    name: 'Dragon',
    description: 'A large, serpent-like legendary creature that appears in the folklore of many cultures around the world. Beliefs about dragons vary drastically by region, but dragons in western cultures since the High Middle Ages have often been depicted as winged, horned, four-legged, and capable of breathing fire. Dragons in eastern cultures are usually depicted as wingless, four-legged, serpentine creatures with above-average intelligence.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ninedragonwallpic1.jpg/640px-Ninedragonwallpic1.jpg',
    thumbs: 0,
  },
];

const feedbacks = []

// API
app.get('/creatures', (req, res) => {
  // take all minus first three creatures
  const allButFirstThreeCreatures = data.filter((creature) => creature.id > 3)

  res.json({data: allButFirstThreeCreatures})
})

// add feedback to array
app.post('/feedback', (req, res) => {
  feedbacks.push(req.body)
})

// +1 to creature's thumbs
app.post('/thumbup/:creatureId', (req, res) => {
  data.map((creature) => {
    if (creature.id === req.params.creatureId) {
      creature.thumbs += 1
      return creature
    } else {
      return creature
    }
  })
})

// HTML
app.get('/*', (req, res) => {
  // take the first three creatures only
  const threeCreatures = data.filter((creature) => creature.id =< 3)

  res.render('index.html', {data: threeCreatures})
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
