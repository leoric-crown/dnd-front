const store = {
  encounters: {
    count: 2,
    encounters: [
        {
            status: "Active",
            _id: "5bfdf0365acdd5702c8256de",
            name: "The Real Witching Hour",
            request: {
                type: "GET",
                url: "http://localhost:5000/encounters/5bfdf0365acdd5702c8256de"
            }
        },
        {
            status: "Preparing",
            _id: "5bfdf07f5fe93e72d85a1aad",
            name: "The Twilight Zone",
            request: {
                type: "GET",
                url: "http://localhost:5000/encounters/5bfdf07f5fe93e72d85a1aad"
            }
        }
    ],
    activeEncounter: {
      status: "Active",
      _id: "5bfdf0365acdd5702c8256de",
      name: "The Real Witching Hour"
    },
    characters: [
        {
            _id: "5bfe24bf76d50e138049b9fd",
            condition: "5c0341053028504714df1945",
            name: "Rhuuan",
            level: 5,
            armorclass: 15,
            hitpoints: 60,
            maxhitpoints: 60,
            player: true,
            request: {
                type: "GET",
                url: "http://localhost:5000/characters/5bfe24bf76d50e138049b9fd"
            }
        },
        {
            _id: "5c0383af7abffa1980c663bc",
            name: "Luthien",
            level: 5,
            armorclass: 19,
            hitpoints: 60,
            maxhitpoints: 60,
            condition: null,
            player: true,
            request: {
                type: "GET",
                url: "http://localhost:5000/characters/5c0383af7abffa1980c663bc"
            }
        }
    ],
    conditions: [
        {
            fromApi: true,
            _id: "5c0341053028504714df1945",
            name: "Blinded",
            desc: [
                "• A blinded creature can’t see and automatically fails any ability check that requires sight.",
                "• Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage."
            ],
            request: {
                type: "GET",
                url: "http://localhost:5000/conditions/5c0341053028504714df1945"
            }
        },
        {
            fromApi: true,
            _id: "5c0341053028504714df1948",
            name: "Charmed",
            desc: [
                "• A charmed creature can’t attack the charmer or target the charmer with harmful abilities or magical effects.",
                "• The charmer has advantage on any ability check to interact socially with the creature."
            ],
            request: {
                type: "GET",
                url: "http://localhost:5000/conditions/5c0341053028504714df1948"
            }
        }
    ]

  }
}
