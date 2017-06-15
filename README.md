# PRG08-Eindproduct

## Balloon popper
Live version: https://omniscientjv.github.io/PRG08-Deelproduct/dist/

### Running the project

Checkout/download/fork the project. Run `npm install` in the root folder. After that run `node server.js`. The game is now playable at (your IP) *:8000.

Alternatively you can serve the contents of the `dist` folder using any webserver (serving using the file:// protocol does not work because of CORS).

The source code can be compiled using a Typescript transpiler. By default the `tsconfig.json` is configured to be ES5 compatible.

### UML
![UML](uml.png?raw=true "UML")

**Namespaces**
I have used namespaces as an example to seperate the 'engine' or Core logic from the actual game (see Game, GameObject, Scene etc).

**Singleton**
See the Game, AudioManager and ScoreManager class.

**Interface & strategy pattern**
See the Collider interface and BoxCollider for implementation.

**Observer**
See the Observer and Subject interfaces. For implementation, see the ScoreText class (Observer) and ScoreManager (Subject) classes.

**Static utility method**
Used in the cMath class and Vector2 class.

**Inheritance, composition, encapsulation**
Used throughout, see Scene, GameScene GameObject, Player for example.

**Polymorphism**
Is used throughout the application. See the Collider and GameObject classes for concrete examples.

**Enumerations**
A statemachine-ish system is implemented for the 'Scenes' system. See the Game, Scene, GameScene and GameOverScene for implementation details.

**External library**
I have implemented Howler (https://github.com/goldfire/howler.js) for cross-browser audio support.

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

## Peer Review Week 7

### Beoordeling

- [x] Klassendiagram: nog niet helemaal aangepast, maar goed genoeg.
- [x] Speelbare game met begin en eind, zonder bugs: het spel begint gelijk (zonder beginscherm o.i.d.), maar er is een eindscherm en er zijn geen bugs.
- [x] Gebruik een library: Howler gebruikt om de geluiden toe te voegen voor ballonnen die kapot gaan.
- [x] Encapsulation, composition, inheritance: door het project heen goed geïmplementeerd.
- [x] Singleton, Observer, Strategy: alledrie op een goede manier geïmplementeerd.
- [x] Interface, static, abstract: op een juiste manier door het project heen geïmplementeerd.
- [x] Namespaces, polymorphism, enumerations: alledrie goed toegepast.
- [x] Game Loop: goed toegepast.
- [x] README.md file waarin bovenstaande wordt toegelicht: ben je nu aan het lezen!

Beoordeling: voldoende!