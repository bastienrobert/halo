import Peti from 'peti'
import Helmet from 'components/shared/Helmet'

export default class Home {
  constructor() {
    const helmet = new Helmet({
      title: 'Home'
    })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <a href="/experience">Experience</a>
      </div>
    )
  }
}
