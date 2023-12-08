const db = require("./connection");
const { User, Product, Category, Game } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");
  await cleanDB("Game", "games");

  const categories = await Category.insertMany([
    { name: "Genesis" },
    { name: "Gameboy" },
    { name: "Playstation " },
    { name: "Xbox" },
    { name: "PC" },
  ]);

  console.log("categories seeded");

  const games = await Game.insertMany([
    {
      title: "Space Invaders",
      description: "Classic space Invaders",
      thumbnail: "cover.png",
      fileURL: "https://dwmkerr.github.io/spaceinvaders/",
    },
  ]);

  console.log("games seeded");

  const products = await Product.insertMany([
    {
      name: "Sonic the Hedgehog 3",
      description:
        "A blue hedgehog with supersonic speed must rescue animals from being turned into robots by a mad scientist",
      image: "sonicgenesis.jpg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 50,
    },
    {
      name: "CastleVania",
      description:
        "John Morris, armed with the fabled Vampire Killer whip, and Eric Lecarde, wielding the Alucard Spear, travel to various European countries to hunt Bartley down and prevent Draculas revival.",
      image: "Castlevania_Bloodlines.jpg",
      category: categories[0]._id,
      price: 1.99,
      quantity: 20,
    },
    {
      name: "Super Mario Bros 3",
      category: categories[1]._id,
      description:
        "The game was designed to resemble the Pokémon anime series, with the player receiving a Pikachu as their starter Pokémon, and their rival starting with an Eevee",
      image: "super-mario-bros-3-coverart.png",
      price: 7.99,
      quantity: 20,
    },
    {
      name: "Pokemon [Yellow version]",
      category: categories[1]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image: "pokemon.png",
      price: 3.99,
      quantity: 2,
    },
    {
      name: "Street Fighter 2",
      category: categories[1]._id,
      description:
        "Eight fighters from around the world compete to get the chance to take on the evil dictator M. Bison. Choose a character and engage your opponents in one-on-one close quarter street combat in a series of best-two-out-of-three matches",
      image: "streetfighter2.png",
      price: 14.99,
      quantity: 10,
    },
    {
      name: "Metal Gear Solid",
      category: categories[2]._id,
      description:
        "stealth action game directed by Hideo Kojima, developed by Konami Computer Entertainment Japan and published by Konami for the PlayStation 2 in 2001. It is the fourth game in the Metal Gear series produced and directed by Kojima and is the direct sequel of Metal Gear Solid. ",
      image: "metalgearsolidsonsof.jpg",
      price: 8.99,
      quantity: 3,
    },
    {
      name: "Resident Evil",
      category: categories[2]._id,
      description:
        " Players control Chris Redfield and Jill Valentine, members of the elite task force S.T.A.R.S., who must escape a mansion infested with zombies and other monsters",
      image: "residentevil.jpg",
      price: 2.99,
      quantity: 2,
    },
    {
      name: "Halo: Combat Evolved",
      category: categories[3]._id,
      description:
        "Super-soldier John-117, Master Chief of the United Nations Space Command, must battle a genocidal alien race known as the Covenant following his violent crash-landing on Halo, an ancient and mysterious ring-world.",
      image: "halo.jpeg",
      price: 9.99,
      quantity: 4,
    },
    {
      name: "Silent Hill",
      category: categories[2]._id,
      description:
        "The game follows Harry Mason as he searches for his missing adopted daughter in the eponymous fictional American town of Silent Hill; stumbling upon a cult conducting a ritual to revive a deity it worships, he discovers her true origin.",
      image: "silenthill.jpg",
      price: 1.99,
      quantity: 4,
    },
    {
      name: "Splinter cell: Pandora tomorrow",
      category: categories[3]._id,
      description:
        "This game follows NSA Agent Sam Fisher, a 'Splinter Cell' in the anti-terrorist group Third Echelon, as he is taken on missions to stop a terrorist gang called Darah Dan Doa, whose leader has become unstoppable due to a scheme he calls Pandora Tomorrow.",
      image: "splintercell.jpg",
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Rome",
      category: categories[4]._id,
      description:
        "The game's main campaign takes place from 270 BC to 14 AD, showcasing the rise and final centuries of the Republican period and the early decades of the imperial period of Ancient Rome. Gameplay is split between real-time tactical battles and a turn-based strategic campaign.",
      image: "Rome.jpg",
      price: 3.99,
      quantity: 3,
    },
    {
      name: "Counter-Strike",
      category: categories[4]._id,
      description:
        "Counter-Strike is an objective-based, multiplayer tactical first-person shooter. Two opposing teams—the Terrorists and the Counter Terrorists—compete in game modes to complete objectives, such as securing a location to plant or defuse a bomb and rescuing or guarding hostages.",
      image: "counterstrike.png",
      price: 0.99,
      quantity: 8,
    },
  ]);

  console.log("products seeded");

  await User.create({
    firstName: "Paul",
    lastName: "Cervantes",
    email: "paulcervantes2244@gmail.com",
    password: "1234five",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
