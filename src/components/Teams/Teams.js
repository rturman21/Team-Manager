import React, {Component} from 'react';
import Team from './Team';
import {Consumer} from '../../context';

class Teams extends Component {

  render() {
    return (
      <Consumer>
        {value => {
          const {teams} = value;
          return (
            <React.Fragment >
              <h1 className="display-4 mb-2">Team List</h1>
              {teams.map(team => (<Team key={team.id} team={team}/>))}

            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }

}
export default Teams;