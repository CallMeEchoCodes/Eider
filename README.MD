<div id="top"></div>


<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CallMeEchoCodes/Eider">
    <img src="https://cdn.discordapp.com/attachments/858855894204678206/874463500276232222/eider-transparent.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Eider</h3>

  <p align="center">
    The extra fluff on Discord that you never knew you needed
    <br />
    <a href="https://github.com/CallMeEchoCodes/Eider"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CallMeEchoCodes/Eider/issues">Report Bug</a>
    ·
    <a href="https://github.com/CallMeEchoCodes/Eider/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Eider is a discord bot i made because i couldnt find a (good) open source [Carl-Bot](https://carl.gg/) alternative. <br />
Eider is nowhere near done but i hope it can provide some use to you guys making bots. Feel free to steal my code just try to credit me

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Typescript](https://www.typescriptlang.org)
* [Discord.js](https://discord.js.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* pnpm
  ```sh
  npm install pnpm -g
  ```

### Installation

1. Clone the repo
  ```sh
  git clone https://github.com/CallMeEchoCodes/Eider.git
  ```
2. Install Dependencies
  ```sh
  pnpm i
  ```
3. Fill out `src/config.json`
  ```json
  {
    "token":"DISCORD_BOT_TOKEN",
    "clientID":"DISCORD_BOT_USERID",
    "guildID":"DISCORD_GUILD_ID"
  }
   ```
4. Build the bot
  ```sh
  pnpx tsc
  ```

5. Run `Deploy.ts`
  ```sh
  node ./build/Deploy.js
  ```

6. Run the bot!
  ```sh
  node ./build/index.js
  ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
See the [open issues](https://github.com/CallMeEchoCodes/Eider/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[![Discord Presence](https://lanyard-profile-readme.vercel.app/api/379035005231300608)](https://discord.com/users/379035005231300608)


Project Link: [https://github.com/CallMeEchoCodes/Eider](https://github.com/CallMeEchoCodes/Eider)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [llsc12](https://github.com/llsc12) for helping me in my early discord bot making days

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/CallMeEchoCodes/Eider.svg?style=for-the-badge
[contributors-url]: https://github.com/CallMeEchoCodes/Eider/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CallMeEchoCodes/Eider.svg?style=for-the-badge
[forks-url]: https://github.com/CallMeEchoCodes/Eider/network/members
[stars-shield]: https://img.shields.io/github/stars/CallMeEchoCodes/Eider.svg?style=for-the-badge
[stars-url]: https://github.com/CallMeEchoCodes/Eider/stargazers
[issues-shield]: https://img.shields.io/github/issues/CallMeEchoCodes/Eider.svg?style=for-the-badge
[issues-url]: https://github.com/CallMeEchoCodes/Eider/issues
[license-shield]: https://img.shields.io/github/license/CallMeEchoCodes/Eider.svg?style=for-the-badge
[license-url]: https://github.com/CallMeEchoCodes/Eider/blob/master/LICENSE
