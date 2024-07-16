<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/CWKrahtz/source-code">
    <img src="assets/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Source-Code</h3>

  <p align="center">
    Competition App With React Native
    <br />
    <a href="https://github.com/CWKrahtz/source-code"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1StSzDfFb9s9ER3YyAr5cXMBzXbXhh-LZ/view?usp=sharing">View Demo</a>
    ·
    <a href="[https://github.com/othneildrew/Best-README-Template/issues](https://github.com/CWKrahtz/source-code/issues)">Report Bug</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#future-implementations">Future Implementations</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project was created using react native. This app is meant to create competitions for everyone to contribute to and to test your knowledge of different languages. 
This is just a starting point for the app, the app does need refinement and there are a few future implementations I want to add.

This project mainly focused on creating a React Native application with Google Firebase's database and auth services. The user needs to be able to create a new account, stay signed in when closing and opening the app, and sign out only when told to.
Any user should be able to create a competition and compete while it is available. If the competition time is over the user should see the leaderboard with the users who competed in the event.

The app is aimed to allow multiple users to be logged in (on different devices) and to compete in at least one competition or to create a competition.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [ReactNative](https://reactnative.dev/docs/environment-setup)
* [Firestore](https://firebase.google.com/docs/firestore)
* [VisualStudioCode](https://code.visualstudio.com/)
* [Expo](https://expo.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
  [![Signup Screen][signup-screenshot]](https://github.com/CWKrahtz/source-code)
  [![Login Screen][login-screenshot]](https://github.com/CWKrahtz/source-code)
  [![Profile Screen][profile-screenshot]](https://github.com/CWKrahtz/source-code)
  [![Create CompScreen][create-screenshot]](https://github.com/CWKrahtz/source-code)
  [![Competitions Screen][comp-screenshot]](https://github.com/CWKrahtz/source-code)
  [![Single Comp Screen][single-screenshot]](https://github.com/CWKrahtz/source-code)
  [![Leaderboard Screen][leader-screenshot]](https://github.com/CWKrahtz/source-code)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Future Implementations -->
## Future Implementations
Here are some of the things I would like to tackle on next time I work on the project
* Profile Screen
  * Display of competitions entered with amount correct.
  * Display competitions user created.
* Competition Screen
  * Display time stamp the competitions end.
  * Order competitions from new to old.
  * display active competitions
  * create screen to display past competitions
* Create Competition Screen
  * Validate all fields are entered
  * Validate that answer is equal to at one answer
  * Improve date and time picker with screen styling
 
 <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Christian Krahtz - [@krahtz424](https://instagram.com/krahtz424) - 221198@virtualwindow.co.za

Project Link: [https://github.com/CWKrahtz/source-code](https://github.com/CWKrahtz/source-code)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Pages](https://pages.github.com)
* [React Native](https://reactnative.dev/docs/environment-setup)
* [Firestore](https://firebase.google.com/docs/firestore)
* [CS Strijdom](https://github.com/DanteCS25)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[comp-screenshot]: assets/screenshot.jpeg
[signup-screenshot]: assets/screenshot3.jpeg
[login-screenshot]: assets/screenshot2.jpeg
[profile-screenshot]: assets/screenshot4.jpeg
[create-screenshot]: assets/screenshot5.jpeg
[single-screenshot]: assets/screenshot6.jpeg
[leader-screenshot]: assets/screenshot7.jpeg
