import React, {Component} from 'react'

export default class Test extends Component {
  // life cycle methods

  state = {
    test: 'test'
  }

  componentDidMount() {
    console.log('componentdidmount...');
    // this is where you make hhtp calls to backend/api initial requests
  }

  componentWillMount() {
    //  runs before it mounts being deprecated
  }

  componentDidUpdate() {
    // runs when the component updates or changes state
  }

  componentWillUpdate() {
    // being deprecated
  }

  componentWillReceiveProps(nextProps, nextState) {
    // when a component takes in new properties used in redux actually being
    // deprecated
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // you return the state instead of calling setState
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // see guide
  }

  render() {
    return (
      <div>
        <h1>Test Component</h1>
      </div>
    )
  }
}
