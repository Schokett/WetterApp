export async function getSavedLocations() {
  // Stadt, Land, Temp, wetter lage, highest and tief aus dem Localstorage
  const dataLocalStorage = [
    {
      locations: {
        city: "Reykjavík",
        country: "Island",
        temp_c: 4,
        condition_text: "Schneeschauer",
        maxtemp_c: 6,
        mintemp_c: -2,
      },
    },
    {
      locations: {
        city: "Kyōto",
        country: "Japan",
        temp_c: 22,
        condition_text: "Heiter",
        maxtemp_c: 26,
        mintemp_c: 15,
      },
    },
    {
      locations: {
        city: "Kapstadt",
        country: "Südafrika",
        temp_c: 18,
        condition_text: "Teilweise bewölkt",
        maxtemp_c: 21,
        mintemp_c: 12,
      },
    },
    {
      locations: {
        city: "Vancouver",
        country: "Kanada",
        temp_c: 14,
        condition_text: "Leichter Regen",
        maxtemp_c: 16,
        mintemp_c: 9,
      },
    },
  ];
  return {
    dataLocalStorage,
  };
}
