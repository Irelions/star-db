import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { Component, Fragment } from 'react';

export default class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
    error: false,
  };

  swapiService = new SwapiService();

  constructor(props) {
    console.log('constructor');
    super(props);

  }

  componentDidMount() {
    console.log('componentDidMount');
    this.updatePlanet();
    this.intervalId = setInterval(this.updatePlanet, 10_000);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  onPlanetLoader = (planet) => {
    this.setState({
      planet,
      loading: false,
    });
  };

  onError = (err) => {
    this.setState(() => ({
      error: true,
      loading: false,
    }));
  };

  updatePlanet = () => {
    console.log('updatePlanet');
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService.getPlanet(id)
        .then(this.onPlanetLoader)
        .catch(this.onError);
  };

  render() {
    console.log('render');
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

function PlanetView({ planet }) {
  const { id, name, diameter, population, rotationPeriod } = planet;
  return (
    <>
      <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
}
