import yo from 'yo-yo'
import portada from '../inicioPortada'
import objetivo from '../inicioObjetivo'
import porque from '../inicioPorque'
import unicos from '../inicioUnicos'
import portafolio from '../inicioPortafolio'
import criticas from '../porqueCriticas/criticas'
import secciones from '../servicio/secciones'
import proyectos from '../inicioPortafolio/proyectos'


module.exports = yo`
  <main>
    ${portada}
    ${objetivo}
    ${porque(criticas)}
    ${unicos(secciones)}
    ${portafolio(proyectos)}
  </main>
`
