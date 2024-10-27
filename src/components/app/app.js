import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import { Component } from 'react';

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        selectedPerson: null,
    }

    onItemSelected = (id) => {
        this.setState(() => {
            return {
                selectedPerson: id,
            }
        });
    };

  render() {
    return (
      <div className="app-main">
        <Header />
        <RandomPlanet />
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected = {this.onItemSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId = {this.state.selectedPerson}/>
          </div>
        </div>
      </div>
    );
  }
}
