import './person-details.css';
import { Component } from 'react';
import SwapiService from "../../services/swapi-service";

export default class PersonDetails extends Component {

  swapiSevice = new SwapiService();

  state = {
    person: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const {personId} = this.props;
    if (!personId) {
      return;
    }
    this.swapiSevice.getPerson(personId)
        .then((person) => {
          this.setState(() => {
            return{
              person: person,
            }
          });
        });
  }

  render() {
    const {person} = this.state;
    if (!person) {
      return <span>Select a person from a list</span>;
    }
    console.log(person)
    const {id, name, gender, birthYear, eyeColor } = person;

    return (
      <div className="person-details card">
        <img className="person-image" src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="charsacter"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender:</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year:</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye color:</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
