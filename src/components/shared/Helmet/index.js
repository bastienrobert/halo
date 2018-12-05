export default class Helmet {
  constructor(props) {
    if (props.title) Helmet.setTitle(props.title)
  }

  static setTitle(title) {
    document.title = title
  }
}
