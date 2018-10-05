import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Consumer} from '../../context';
import axios from 'axios';

class Team extends Component {
  state = {
    showInfo: false
  };
  //async request is made before the parameters
  onRemoveClick = async(id, dispatch) => {
    await axios.delete(`http://localhost:3000/api/teams/${id}`);

    dispatch({type: 'DELETE_TEAM', payload: id})

  };

  render() {
    const {
      id,
      team,
      league,
      city,
      sport,
      titles
    } = this.props.team;
    const {showInfo} = this.state;
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="card card-body mb-3">
              <h4>{team} {' '}
                <i
                  onClick={() => this.setState({
                  showInfo: !this.state.showInfo
                })}
                  className="fas fa-chevron-down"/>
                <i
                  className="fas fa-times"
                  style={{
                  color: '#a5acaf',
                  float: 'right',
                  cursor: 'pointer'
                }}
                  onClick={this
                  .onRemoveClick
                  .bind(this, id, dispatch)}/>
                <Link to={`team/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                    cursor: 'pointer',
                    float: 'right',
                    color: 'black',
                    marginRight: '1rem'
                  }}/>
                </Link>

              </h4>
              {showInfo
                ? (
                  <ul className="list-group">
                    <li className="list-group-item">League: {league}</li>
                    <li className="list-group-item">City: {city}</li>
                    <li className="list-group-item">Sport: {sport}</li>
                    <li className="list-group-item">Titles: {titles}</li>
                  </ul>
                )
                : null}
            </div>

          )
        }}
      </Consumer>
    )
  }
}

Team.propTypes = {
  team: PropTypes.object.isRequired
}

export default Team;