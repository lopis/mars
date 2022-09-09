![image](https://user-images.githubusercontent.com/2715751/188812893-c452ed60-5f4d-45e6-9b7a-b5de22c44337.png)

# Planet B <sup>alpha</sup>

We fucked up. Earth is dead. Time for planet B.

We carbon-credited our environment to death. We let AI make all decisions. We out-farmed ourselves out of arable land. Our sky is full of space junk. The water, the ice, the heat and the cold are all in the wrong places and most people are dying.

Somehow in the last years the world governments managed to put aside their differences and join forces to move Humanity to mars. The ultra rich wanted it all for themselves until they realized you can't run a city with just CEOs.

## Game mechanics

ℹ️ The game UI is not optimized for mobile phones. A landscape screen with at least 1280x800 is recommended.

In this glocal co-op game you're one of Mars' managers.
Any number of players can join simultaneously to help deal with every day tasks like:

- Build houses for the refugees
- Welcome refugee ships and move them to houses
- Build varied buildings and collect resources from them
  - Buildings can only be built next to your colony, or connected by paths
- Move resources where they are needed.

You will face several problems:

- The more people are crammed together, the more likely riots emerge. When riots start, people will die.
- Without enough resources, people will also riot.
- Natural disasters can occur that disrupt comms or destroy infrastructure
  - Dust storms will cut communication off with that area
- You might need to decide to let some people out to save your residents...

There's a chat function to communicate with other people online.

### Game map

The map represents the planet Mars. There are 3 types of areas:

- Red tiles, aka "Open Plains" where you can build houses and solar plants
- Blue tiles around the mountains, or "Rocky areas" where you can build mines and nuclear plants
- White tiles, or "Glaciar" where you can harvest water

There are the mountains where you can't build anything.

## Ready to play?

[![image](https://user-images.githubusercontent.com/2715751/189384391-bff972ce-673c-4b16-8036-b905ead261df.png)](https://mars-planet-b.herokuapp.com/)

(it may take a moment to warm up the first time)

## Development

Run `yarn` to install dependencies and then run `yarn dev` to run the server locally.

Access the game client via <http://localhost:3000/>.

To build a production release, run `yarn build` and then run it with `yarn start`.

To create a zip of the game run `yarn postbuild`.
