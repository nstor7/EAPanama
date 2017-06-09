import yo from 'yo-yo'
import cabecera from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${cabecera(datos.productos)}
  </main>
`
