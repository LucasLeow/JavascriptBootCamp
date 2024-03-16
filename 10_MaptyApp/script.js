'use strict';

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
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in mins
  }
  click() {
    this.clicks++;
  }
  _setDescription() {
    //prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calc_pace(); // calling methods in constructor will immediately execute method upon instantiation of obj
    this._setDescription();
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
    this._setDescription();
  }

  calc_speed() {
    // speed in km/h
    this.speed = this.distance / (this.duration / 60);
  }
}

class App {
  // private instance
  #mapZoomLevel = 15;
  #map;
  #mapEvent;

  constructor() {
    this.workouts = [];
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); // eventListener provide dom element as context, need to manual add context
    inputType.addEventListener('change', this._toggleElevationField.bind(this)); // event listener to check for change in exercise type (running vs cycling)
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // 'map', in html has <div id="map"></div> for mapping code to html

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
    let activity_type = inputType.value;
    if (activity_type === 'running') {
      inputElevation.closest('.form__row').classList.add('form__row--hidden');
      inputCadence.closest('.form__row').classList.remove('form__row--hidden');
    } else {
      inputElevation
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputCadence.closest('.form__row').classList.add('form__row--hidden');
    }
    inputDistance.focus(); // make the form input distance active
  }

  _hideForm() {
    // remove active values in form
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
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
    }

    // Add workout obj to workout array
    this.workouts.push(workout);
    console.log(workout.description);

    // render workout on map as marker
    this._renderWorkoutMarker(workout);

    // render workout list by the side
    this._renderWorkoutList(workout);

    // Hide form after submitting workout
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    console.log(workout);
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, // css class to be injected to popup
        })
      )
      .setPopupContent(`${workout.description}`)
      .openPopup();
  }

  _renderWorkoutList(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.name === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;
    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    } else {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    }
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(ev) {
    const workoutEl = ev.target.closest('.workout'); // find the workout marker that was clicked & move to its nearest parent
    if (!workoutEl) return;

    const clicked_workout = this.workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );

    this.#map.setView(clicked_workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    clicked_workout.click();
    console.log(clicked_workout);
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
