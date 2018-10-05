import React, {Component} from 'react'
import {Consumer} from '../../context';
import TextInputGroup from '../Layout/TextInputGroup';
import axios from 'axios';

class AddTeam extends Component {
  state = {
    id: '',
    team: '',
    league: '',
    city: '',
    sport: '',
    titles: '',
    errors: {}
  }

  onSubmitHandler = async(dispatch, e) => {
    e.preventDefault();
    const {team, league, city, sport, titles} = this.state;

    // error checking
    if (team === '') {
      this.setState({
        errors: {
          team: 'Enter a team!'
        }
      });
      return;
    }
    if (league === '') {
      this.setState({
        errors: {
          league: 'Forgot the league?!'
        }
      });
      return;
    }
    if (city === '') {
      this.setState({
        errors: {
          city: 'They have to play somewhere!'
        }
      });
      return;
    }
    if (sport === '') {
      this.setState({
        errors: {
          sport: 'You must enter a sport!'
        }
      });
      return;
    }
    if (titles === '') {
      this.setState({
        errors: {
          titles: 'Championships?'
        }
      });
      return;
    }

    const newTeam = {
      team,
      league,
      city,
      sport,
      titles
    }

    const res = await axios.post('http://localhost:3000/api/teams/add', newTeam);

    dispatch({type: 'ADD_TEAM', payload: res.data})

    this.setState({
      team: '',
      league: '',
      city: '',
      sport: '',
      titles: '',
      errors: {}
    });
    this
      .props
      .history
      .push('/')
  };

  onChangeHandler = e => this.setState({
    [e.target.name]: e.target.value
  });

  render() {
    const {
      team,
      league,
      city,
      sport,
      titles,
      errors
    } = this.state;
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Team</div>
              <div className="card-body">
                <form
                  onSubmit={this
                  .onSubmitHandler
                  .bind(this, dispatch)}>
                  <TextInputGroup
                    label='Team'
                    name='team'
                    placeholder='Which team?'
                    value={team}
                    onChange={this.onChangeHandler}
                    error={errors.team}/>
                  <TextInputGroup
                    label='League'
                    name='league'
                    placeholder='Which League?'
                    value={league}
                    onChange={this.onChangeHandler}
                    error={errors.league}/>
                  <TextInputGroup
                    label='City'
                    name='city'
                    placeholder='Where do they play?'
                    value={city}
                    onChange={this.onChangeHandler}
                    error={errors.city}/>
                  <TextInputGroup
                    label='Sport'
                    name='sport'
                    placeholder='What do they play?'
                    value={sport}
                    onChange={this.onChangeHandler}
                    error={errors.sport}/>
                  <TextInputGroup
                    label='Titles'
                    name='titles'
                    placeholder='How many titles?'
                    value={titles}
                    type='number'
                    onChange={this.onChangeHandler}
                    error={errors.titles}/>
                  <input type="submit" value="Add Team" className="btn btn-dark btn-block"/>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddTeam;