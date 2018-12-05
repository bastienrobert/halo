import 'reset-css'

import Peti from 'peti'
import page from 'page'

import routes from './routes'

import './styles.scss'

export default class App {
  constructor(container) {
    this.container = container
    this.router()
  }

  router() {
    routes.forEach(route =>
      page(route.path, () => {
        const component = new route.component()
        this.setRoute(component)
      })
    )
    page()
  }

  setRoute(component) {
    const page = component.render()
    this.page
      ? this.container.replaceChild(page, this.page)
      : this.container.appendChild(page)
    this.page = page
  }

  render() {
    const Page = this.page

    return <div>{Page}</div>
  }
}
