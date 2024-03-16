'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  // modern way of declaring public properties
  date = new Date();
  id = (Date.now() + '').slice(-10); // typically should use library to generate numbers, this is quick hack

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in mins
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calc_pace(); // calling methods in constructor will immediately execute method upon instantiation of obj
  }

  calc_pace() {
    // in mins / km
    this.pace = this.duration / this.distance;
    return this;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calc_speed();
  }

  calc_speed() {
    // speed in km/h
    this.speed = this.distance / (this.duration / 60);
  }
}

class App {
  // private instance
  #map;
  #mapEvent;

  constructor() {
    this.workouts = [];
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); // eventListener provide dom element as context, need to manual add context
    inputType.addEventListener('change', this._toggleElevationField.bind(this)); // event listener to check for change in exercise type (running vs cycling)
  }

  _getPosition() {
    if (navigator.geolocation) {
      // guard for old browsers that do not support geolocation api
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // _loadMap treated as function call, therefore need provide 'this' context else undefined
        function () {
          // callback for if getPosition fails
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu`
    );
    let coords = [latitude, longitude];

    // // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // //Leaflet library to display map after receiving user's coordinates
    // // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // // L is the Leaflet namespace for calling leaflet obj
    this.#map = L.map('map').setView(coords, 15); // 'map', in html has <div id="map"></div> for mapping code to html

    // Event Listener for adding marker on click & showing workout exercise form
    this.#map.on('click', this._showForm.bind(this)); // eventHandler attach 'this' to attached object, need to pass 'this' as context instead

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  }

  _showForm(mapEvt) {
    this.mapEvent = mapEvt; // save map_event obj is global variable
    form.classList.remove('hidden');
    inputDistance.focus(); // make the form input distance active
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(ev) {
    ev.preventDefault();

    const validateNum = (
      ...numericalInputs //
    ) => numericalInputs.every(input => Number.isFinite(input));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    let workoutClassName;

    if (type === 'running') {
      const cadence = Number(inputCadence.value);
      if (
        // Validate data received
        !validateNum(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive integers');

      // Create workout obj according to type (running vs cycling)
      workout = new Running([lat, lng], distance, duration, cadence);
      workoutClassName = 'running-popup';
    }

    if (type === 'cycling') {
      const elevation = Number(inputElevation.value);
      if (
        // Validate data received
        !validateNum(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs must be positive integers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
      workoutClassName = 'cycling-popup';
    }

    // Add workout obj to workout array
    this.workouts.push(workout);

    // render workout on map as marker
    this.renderWorkoutMarker(workout);

    // Clear form content after
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.classList.add('hidden');
  }

  renderWorkoutMarker(workout) {
    console.log(workout);
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${inputType.value}-popup`, // css class to be injected to popup
        })
      )
      .setPopupContent(`${workout.distance}`)
      .openPopup();
  }

  set mapEvent(mapEvt) {
    // setter fn to modify private property
    this.#mapEvent = mapEvt;
  }
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main App
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const app = new App();
