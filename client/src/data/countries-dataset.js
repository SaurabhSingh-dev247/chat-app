import countries from "world-countries";

const PHONE_COUNTRIES = countries
  .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
  .map((c) => ({
    name: c.name.common,
    iso2: c.cca2,
    dialCode: `${c.idd.root}${c.idd.suffixes[0]}`,
    flag: `https://flagcdn.com/w20/${c.cca2.toLowerCase()}.png`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default PHONE_COUNTRIES;
