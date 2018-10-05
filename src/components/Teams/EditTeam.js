import React, {Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../Layout/TextInputGroup';
import axios from 'axios';

class EditTeam extends Component {
  state = {
    team: '',
    league: '',
    city: '',
    sport: '',
    titles: '',
    errors: {}
  };

  async componentDidMount() {
    const {id} = this.props.match.params;
    const res = await axios.get(`http://localhost:3000/api/teams/${id}`);

    const team = res.data;

    this.setState({name: team.team, league: team.league, city: team.city, sport: team.sport, titles: team.titles});
  }

  onSubmitHandler = async(dispatch, e) => {
    e.preventDefault();

    const {team, league, city, sport, titles} = this.state;

    if (team === '') {
      this.setState({
        errors: {
          team: 'Which team?'
        }
      });
      return;
    }
    if (league === '') {
      this.setState({
        errors: {
          league: 'Which league?'
        }
      });
      return;
    }
    if (city === '') {
      this.setState({
        errors: {
          city: 'Where do they play?'
        }
      });
      return;
    }
    if (sport === '') {
      this.setState({
        errors: {
          sport: 'What do they play?'
        }
      });
      return;
    }
    if (titles === '') {
      this.setState({
        errors: {
          titles: 'Do they win?'
        }
      });
      return;
    }

    const updateTeam = {
      team,
      league,
      city,
      sport,
      titles
    };

    const {id} = this.props.match.params;
    const res = await axios.put(`http://localhost:3000/api/teams/${id}`, updateTeam);

    dispatch({type: 'UPDATE_TEAM', payload: res.data});

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
      .push('/');
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
              <div className="card-header">Edit Team</div>
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
                  <input type="submit" value="Update Team" className="btn btn-light btn-block"/>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditTeam;