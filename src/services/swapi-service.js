export default class SwapiService {
  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const responce = await fetch(`${this._apiBase}${url}`);

    if (!responce.ok) {
      throw new Error(`Could not fetch ${url}, received ${responce.status}`);
    }
    return responce.json();
  }

  async getAllPeople() {
    const url = '/people/';
    const response = await this.getResource(url);
    return response.results.map((people) => this._transformPerson(people));
  }

  async getPerson(id) {
    const url = `/people/${id}/`;
    const person = await this.getResource(url);
    return this._transformPerson(person);
  }

  async getAllPlanet() {
    const url = '/planets/';
    const response = await this.getResource(url);
    return response.results.map((planet) => this._transformPlanet(planet));
  }

  async getPlanet(id) {
    const url = `/planets/${id}/`;
    const planet = await this.getResource(url);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const url = '/starships/';
    const response = await this.getResource(url);
    return response.results.map((starship) => this._transformStarship(starship));
  }

  async getStarship(id) {
    const url = `/starships/${id}/`;
    const starship = await this.getResource(url);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredit: starship.costInCredit,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    };
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    };
  }
}
