export async function getSavedLocations() {
  const dataLocalStorage = [
    {
      locations: {
        city: "Reykjavík",
        country: "Island",
        temp_c: 4,
        condition_text: "Schneeschauer",
        maxtemp_c: 6,
        mintemp_c: -2,
        condition_code: 1255,
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
        condition_code: 1003,
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
        condition_code: 1006,
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
        condition_code: 1183,
      },
    },
  ];
  return { dataLocalStorage };
}
