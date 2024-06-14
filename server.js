const express = require('express')
const app = express()
const connectDB = require('./src/mongoose')
const port = process.env.PORT ?? 3000
const morgan = require('morgan')
const Componente = require('./src/esquemaModel.js')
connectDB()

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//Ruta principal
app.get('/', (req, res) => {
 res.json('Bienvenido a la BD de Componentes !')
})

//Rutas de todos los componentes

app.get('/productos', (req, res) => {
 const { categoria } = req.query
 const filtro = !categoria
  ? {}
  : {
     categoria: { $regex: categoria, $options: 'i' }
    }
 Componente.find(filtro)
  .then((componentes) => {
   res.json(componentes)
  })
  .catch((error) => {
   console.error('Error al obtener productos: ', error)
   res.status(500).send('Error al obtener los productos')
  })
})
//buscar todas las categorias que hay
app.get('/productos/categoria', (req, res) => {
 Componente.find()
  .then((componentes) => {
   const categorias = componentes.map((componente) => {
    return componente.categoria
   })
   if (categorias) {
    const categoriasUnicas = [...new Set(categorias)]
    return res.json(categoriasUnicas)
   } else {
    res.status(404).json({ message: 'No hay categorias' })
   }
  })
  .catch((error) => {
   console.error('Error al obtener las categorias: ', error)
   res.status(500).send('Error al obtener las categorias')
  })
})

//buscar producto por id
app.get('/productos/:id', (req, res) => {
 const { id } = req.params
 Componente.findById(id)
  .then((componente) => {
   res.json(componente)
  })
  .catch((error) => {
   console.error('Error al obtener el producto: ', error)
   res.status(500).send('Error al obtener el producto')
  })
})
//buscar componente con importe mayor a:
app.get('/productos/importes/mayor/:importe', (req, res) => {
 const { importe } = req.params
 Componente.find({ importe: { $gte: importe } })
  .then((componentes) => {
   if (componentes) {
    res.json(componentes)
   } else {
    res.status(404).json({ message: 'No hay componentes con ese importe' })
   }
  })
  .catch((error) => {
   console.error('Error al obtener el producto: ', error)
   res.status(500).send('Error al obtener el producto')
  })
})
//obtener productos por importes menor a

app.get('/productos/importes/menor/:importe', (req, res) => {
 const { importe } = req.params
 Componente.find({ importe: { $lte: importe } })
  .then((componentes) => {
   if (componentes) {
    res.json(componentes)
   } else {
    res.status(404).json({ message: 'No hay componentes con ese importe' })
   }
  })
  .catch((error) => {
   console.error('Error al obtener el producto: ', error)
   res.status(500).send('Error al obtener el producto')
  })
})

//Obtener producto por su nombre  /productos/nombre/:nombre:

app.get('/productos/nombre/:nombre', (req, res) => {
 const { nombre } = req.params
 Componente.find({ nombre: { $regex: `^${nombre}`, $options: 'i' } })
  .then((componentes) => {
   res.json(componentes)
  })
  .catch((error) => {
   console.error('Error al obtener el producto: ', error)
   res.status(500).send('Error al obtener el producto')
  })
})

// obtener los productos cuyo importe esté dentro del rango especificado:

app.get('/productos/rango/:min/:max', (req, res) => {
 let { max, min } = req.params
 max = parseInt(max)
 min = parseInt(min)
 Componente.find({ importe: { $gte: min, $lte: max } })
  .then((componentes) => {
   res.json(componentes)
  })
  .catch((error) => {
   console.error('Error al obtener el producto: ', error)
   res.status(500).send('Error al obtener el producto')
  })
})
//Crear un nuevo productos

app.post('/productos', (req, res) => {
 const componente = new Componente(req.body)
 componente
  .save()
  .then((componente) => {
   res.json(componente)
  })
  .catch((error) => {
   console.error('Error al crear el componente: ', error)
   res.status(500).send('Error al crear el componente')
  })
})
//borrar un productos

app.delete('/productos/:id', (req, res) => {
 const { id } = req.params
 Componente.findByIdAndDelete(id)
  .then((componente) => {
   if (componente) {
    res.json({ message: 'Componente borrada con exito' })
   } else {
    res.status(404).json({ message: 'Componente no encontrada para borrar' })
   }
  })
  .catch((error) => {
   console.error('Error al borrar el componente: ', error)
   res.status(500).send('Error al borrar el componente')
  })
})

//Modificar componentes parcialmente
app.patch('/productos/:id', (req, res) => {
 const { id } = req.params
 Componente.findByIdAndUpdate(id, req.body, {
  new: true
 })
  .then((modificado) => {
   if (modificado) {
    res.json({ message: 'Componente actualizada con exito', modificado })
   } else {
    res
     .status(404)
     .json({ message: 'Componente no encontrada para actualizar' })
   }
  })
  .catch((error) => {
   console.error('Error al actualizar el componente: ', error)
   res.status(500).send('Error al actualizar el componente')
  })
})
//modificar y actualizar componente
app.put('/productos/:id', (req, res) => {
 const { id } = req.params
 Componente.findByIdAndUpdate(id, req.body, {
  new: true,
  overwrite: true
 })
  .then((componente) => {
   if (componente) {
    res.json({ message: 'Componente modificado', componente })
   } else {
    res.status(404).json({ message: 'Componente no encontrada para modificar' })
   }
  })
  .catch((error) => {
   console.error('Error al actualizar el componente: ', error)
   res.status(500).send('Error al actualizar el componente')
  })
})
//Inicializamos el servidor
app.listen(port, () => {
 console.log(`Example app listening on http://localhost:${port}`)
})
