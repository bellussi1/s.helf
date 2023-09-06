import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronUp,
  faChevronDown,
  faStar,
  faPlus,
  faCaretUp,
  faCaretDown,
  faChartSimple,
  faTable,
  faFilter,
  faList,
  faUsers,
  faSort,
  faBoxesStacked,
  faUser,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)
library.add(faChevronUp)
library.add(faChevronDown)
library.add(faStar)
library.add(faCaretUp)
library.add(faSort)
library.add(faCaretDown)
library.add(faChartSimple)
library.add(faTable)
library.add(faFilter)
library.add(faList)
library.add(faPlus)
library.add(faUsers)
library.add(faSort)
library.add(faUser)
library.add(faBoxesStacked)

export default {
  install(app) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  },
}
