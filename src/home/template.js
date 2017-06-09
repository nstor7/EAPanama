import yo from 'yo-yo'
import portada from '../inicioPortada'
import objetivo from '../inicioObjetivo'
import porque from '../inicioPorque'
import unicos from '../inicioUnicos'
import portafolio from '../inicioPortafolio'
import criticas from '../porqueCriticas/criticas'


module.exports = yo`
  <main>
    ${portada}
    ${objetivo}
    ${porque(criticas)}
    ${unicos}
    ${portafolio}
  </main>
`
