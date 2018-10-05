import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_TEAM':
      return {
        ...state,
        teams: state
          .teams
          .filter(team => team.id !== action.payload)
      }
    case 'ADD_TEAM':
      return {
        ...state,
        teams: [
          action.payload, ...state.teams
        ]
      };
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state
          .teams
          .map(team => team.id === action.payload.id
            ? (team = action.payload)
            : team)
      };
    default:
      return state;
  }
}

export class Provider extends Component {

  state = {
    teams: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  }
  // async/await mark the component did mount as async the axios call MUST be
  // marked 'await

  async componentDidMount() {
    //request from backend to populate page
    const res = await axios.get(`http://localhost:3000/api/teams`);
    //set the state as the result of the data pulled in
    this.setState({teams: res.data});

  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;