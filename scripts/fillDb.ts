import PhoneNumber from "awesome-phonenumber";
import bcrypt from "bcrypt";
import faker from "faker/locale/fr";
import Mongoose from "mongoose";
import { AdminModel, PlayerModel } from "../src/models";

const fillPlayers = async (num) => {
  let password = "123456";
  password = await bcrypt.hash(password, 10);
  const parisLat = 48.85341;
  const parisLng = 2.3488;
  for (let i = 0; i < num; i += 1) {
    const avatar = faker.image.avatar();
    let mobile = faker.phone.phoneNumber();
    let pn = new PhoneNumber(mobile);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const lat = parseFloat(String(parisLat + faker.random.number(1000) * 0.00001 * sign)).toFixed(5);
    const lng = parseFloat(String(parisLng + faker.random.number(1000) * 0.00001 * sign)).toFixed(5);

    while (!pn.isMobile()) {
      mobile = faker.phone.phoneNumber();
      pn = new PhoneNumber(mobile);
    }

    const player = new PlayerModel({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password,
      address: faker.address.streetAddress(true),
      location: [lng, lat],
      avatar: {
        original: avatar,
        sm: avatar,
        md: avatar,
        lg: avatar,
      },
      mobile: {
        international: pn.getNumber("international"),
        national: pn.getNumber("national"),
        countryCode: "+" + pn.getCountryCode(),
        regionCode: pn.getRegionCode(),
      },
      mainPosition: faker.random.arrayElement([
        "Gardien",
        "Arrière latéral",
        "Libéro",
        "Milieu défensif",
        "Milieu offensif",
        "Avant-centre",
        "Attaquant",
      ]),
      emailVerified: true,
      mobileVerified: true,
    });
    console.log(player);
    try {
      await player.save();
    } catch (e) {
      console.log(e);
    }
  }
};
const fillAdmins = async (num) => {
  let password = "123456";
  password = await bcrypt.hash(password, 10);
  const parisLat = 48.85341;
  const parisLng = 2.3488;
  for (let i = 0; i < num; i += 1) {
    const avatar = faker.image.avatar();
    let mobile = faker.phone.phoneNumber();
    let pn = new PhoneNumber(mobile);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const lat = parseFloat(String(parisLat + faker.random.number(1000) * 0.00001 * sign)).toFixed(5);
    const lng = parseFloat(String(parisLng + faker.random.number(1000) * 0.00001 * sign)).toFixed(5);

    while (!pn.isMobile()) {
      mobile = faker.phone.phoneNumber();
      pn = new PhoneNumber(mobile);
    }

    const player = new AdminModel({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password,
      address: faker.address.streetAddress(true),
      location: [lng, lat],
      avatar: {
        original: avatar,
        sm: avatar,
        md: avatar,
        lg: avatar,
      },
      mobile: {
        international: pn.getNumber("international"),
        national: pn.getNumber("national"),
        countryCode: "+" + pn.getCountryCode(),
        regionCode: pn.getRegionCode(),
      },
      permission: i === 0 ? "SUPER_ADMIN" : "ADMIN",
      emailVerified: true,
      mobileVerified: true,
    });
    console.log(player);
    try {
      await player.save();
    } catch (e) {
      console.log(e);
    }
  }
};
function fillDb() {
  return Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: process.env.DB_NAME,
  })
    .then(async () => {
      console.log("connected");
      await fillPlayers(1);
      await fillAdmins(10);
      return;
    })
    .catch((e) => console.log(e));
}
fillDb();
