# PRG08-Deelproduct

## Balloon popper
Live version: https://omniscientjv.github.io/PRG08-Deelproduct/dist/

### Running the project

Checkout/download/fork the project. Run `npm install` in the root folder. After that run `node server.js`. The game is now playable at (your IP) *:8000.

Alternatively you can serve the contents of the `dist` folder using any webserver (serving using the file:// protocol does not work because of CORS).

The source code can be compiled using a Typescript transpiler. By default the `tsconfig.json` is configured to be ES5 compatible.

### UML
![UML](uml.png?raw=true "UML")

**Singleton**
See the Game class.

**Interface & strategy pattern**
See the Collider interface and BoxCollider for implementation.

**Static utility method**
Used in the cMath class and Vector2 class.

**Inheritance, composition, encapsulation**
Used throughout, see Scene, GameScene GameObject, Player for example.

## Peer Review Week 4

### Beoordeling

[x] De code voor het deelproduct staat op je eigen GitHub
[x] Er is een live page waar de game speelbaar is
[ ] Het deelproduct moet werkend zijn zonder bugs/foutmeldingen  --> Misschien niet echt een bug, maar er wordt "game over" gelogd als een ballon de bovenkant bereikt, maar het spel gaat gewoon door.
[x] Het project bevat een Readme bestand met installatie instructies. Deze instructies stellen de gebruiker in staat om het deelproduct te installeren en te openen.
[x] Er is een klassendiagram voor het eindproduct. Hierin is aangegeven welke onderdelen al werkend zijn.
[x] Het Readme bestand legt uit waar de onderstaande programmeerprincipes zijn toegepast in het project
[x] Het deelproduct maakt gebruik van:
- [x] interface
- [x] static utility method
- [x] singleton
- [x] strategy
[x] En van technieken uit PRG01-4:
- [x] Encapsulation, Composition, Inheritance

Beoordeling: voldoende.

### Edits

Ik heb de "Game Over" log in Balloon vervangen door een aanroep van de nieuwe "gameOver" method in Game, die nu ook alleen nog "Game Over" logt. Hier zou je echter extra "Game Over-functionaliteit" aan toe kunnen voegen, waardoor je deze functionaliteit in zijn geheel in één functie opneemt. Dit maakt gebruikt van de al ingebouwde singleton door de aanroep van Game.instance().