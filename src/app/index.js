import { h, Component } from 'preact'
import css from './styles.scss'

export default class App extends Component {
  render() {
    return <h1 className={css.title}>Hello</h1>
  }
}
