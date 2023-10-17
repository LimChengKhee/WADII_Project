<template>
  <div class="parent-container">
    <div class="header">
      <div class="container-fluid mt-5 ms-5 mb-3">
        <div class="row">
          <div class="col">
            <h2 style="text-align: center">Search accomodation</h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p style="text-align: center">Search for accomodation deals for {} in {}</p>
          </div>
        </div>
      </div>

      <div class="container-fluid ms-5 mb-3">
        <div class="row">
          <div class="col">
            <!--inputted value in it-->
            <input type="text" value="Singapore" class="w-100" />
          </div>
          <div class="col">
            <input type="date" value="13th September 2023" class="w-100" />
          </div>
        </div>
      </div>
    </div>
    <div class="card_section" v-if="mounted">
      <FlightCard
        v-for="flight in this.hotelsInCities.data.itineraries"
        :flightNumberO="flight.legs[0].segments[0].flightNumber"
        :alternateIdO ="flight.legs[0].segments[0].marketingCarrier.alternateId"
        :carrierNameO="flight.legs[0].carriers.marketing[0].name"

        :flightNumberD="flight.legs[1].segments[0].flightNumber"
        :alternateIdD ="flight.legs[1].segments[0].marketingCarrier.alternateId"
        :carrierNameD="flight.legs[1].carriers.marketing[0].name"

        :departure="flight.legs[0].segments[0].departure"
        :originDisplayCode="flight.legs[0].segments[0].origin.displayCode"
        :originName="flight.legs[0].segments[0].origin.name"
        :originCity="flight.legs[0].origin.city"
        :duration="flight.legs[0].durationInMinutes"
        :arrival="flight.legs[0].arrival"
        :destinationDisplayCode="flight.legs[0].segments[0].destination.displayCode"
        :destinationCity="flight.legs[0].destination.city"
        :totalPrice="flight.price.formatted"
        :tag = "flight.tags"
      ></FlightCard>
    </div>
    <div class="spinner_section d-flex flex-column" v-if="!mounted">
      <div
        class="spinner-border mt-5"
        style="margin: 0 auto; height: 200px; width: 200px"
        role="status"
      ></div>
      <p class="mt-2" style="text-align: center">Loading...Please give us a second</p>
    </div>
  </div>
</template>
<script>
import FlightCard from '../components/FlightCard.vue'
import axios from 'axios'

export default {
  name: 'Flight',
  components: {
    // importing components from other places
    FlightCard
  },
  data() {
    // local repository of information
    return {
      hotelsInCities: {},
      mounted: false,
      false_data: {
    "status": true,
    "timestamp": 1691008981566,
    "sessionId": "25cee707-a873-4d0a-aeb2-4128a7ca0258",
    "data": {
      "context": {
        "status": "incomplete",
        "totalResults": 10
      },
      "itineraries": [
        {
          "id": "13542-2402201235--30598-0-12712-2402201550|12712-2402221810--30598-0-13542-2402230600",
          "price": {
            "raw": 419.18,
            "formatted": "$420"
          },
          "legs": [
            {
              "id": "13542-2402201235--30598-0-12712-2402201550",
              "origin": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 495,
              "stopCount": 0,
              "isSmallestStops": false,
              "departure": "2024-02-20T12:35:00",
              "arrival": "2024-02-20T15:50:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -30598,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                    "name": "Norse Atlantic Airways (UK)"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13542-12712-2402201235-2402201550--30598",
                  "origin": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T12:35:00",
                  "arrival": "2024-02-20T15:50:00",
                  "durationInMinutes": 495,
                  "flightNumber": "701",
                  "marketingCarrier": {
                    "id": -30598,
                    "name": "Norse Atlantic Airways (UK)",
                    "alternateId": "I)",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -30598,
                    "name": "Norse Atlantic Airways (UK)",
                    "alternateId": "I)",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402221810--30598-0-13542-2402230600",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 410,
              "stopCount": 0,
              "isSmallestStops": false,
              "departure": "2024-02-22T18:10:00",
              "arrival": "2024-02-23T06:00:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -30598,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                    "name": "Norse Atlantic Airways (UK)"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-13542-2402221810-2402230600--30598",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T18:10:00",
                  "arrival": "2024-02-23T06:00:00",
                  "durationInMinutes": 410,
                  "flightNumber": "702",
                  "marketingCarrier": {
                    "id": -30598,
                    "name": "Norse Atlantic Airways (UK)",
                    "alternateId": "I)",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -30598,
                    "name": "Norse Atlantic Airways (UK)",
                    "alternateId": "I)",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "eco": {
            "ecoContenderDelta": 13.232994
          },
          "tags": [
            "cheapest",
            "shortest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.998502
        },
        {
          "id": "13554-2402200750--32753-1-12712-2402201355|12712-2402222110--32753-1-13554-2402231130",
          "price": {
            "raw": 527.97,
            "formatted": "$528"
          },
          "legs": [
            {
              "id": "13554-2402200750--32753-1-12712-2402201355",
              "origin": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 665,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T07:50:00",
              "arrival": "2024-02-20T13:55:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13554-11154-2402200750-2402200910--32753",
                  "origin": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T07:50:00",
                  "arrival": "2024-02-20T09:10:00",
                  "durationInMinutes": 80,
                  "flightNumber": "151",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201110-2402201355--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T11:10:00",
                  "arrival": "2024-02-20T13:55:00",
                  "durationInMinutes": 465,
                  "flightNumber": "105",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402222110--32753-1-13554-2402231130",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 560,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T21:10:00",
              "arrival": "2024-02-23T11:30:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402222110-2402230850--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T21:10:00",
                  "arrival": "2024-02-23T08:50:00",
                  "durationInMinutes": 400,
                  "flightNumber": "106",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13554-2402231010-2402231130--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T10:10:00",
                  "arrival": "2024-02-23T11:30:00",
                  "durationInMinutes": 80,
                  "flightNumber": "158",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "second_cheapest",
            "second_shortest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.58567
        },
        {
          "id": "13554-2402200750--32753-1-12712-2402201355|12712-2402221700--32753-1-13554-2402230805",
          "price": {
            "raw": 527.97,
            "formatted": "$528"
          },
          "legs": [
            {
              "id": "13554-2402200750--32753-1-12712-2402201355",
              "origin": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 665,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T07:50:00",
              "arrival": "2024-02-20T13:55:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13554-11154-2402200750-2402200910--32753",
                  "origin": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T07:50:00",
                  "arrival": "2024-02-20T09:10:00",
                  "durationInMinutes": 80,
                  "flightNumber": "151",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201110-2402201355--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T11:10:00",
                  "arrival": "2024-02-20T13:55:00",
                  "durationInMinutes": 465,
                  "flightNumber": "105",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402221700--32753-1-13554-2402230805",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 605,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T17:00:00",
              "arrival": "2024-02-23T08:05:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402221700-2402230425--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T17:00:00",
                  "arrival": "2024-02-23T04:25:00",
                  "durationInMinutes": 385,
                  "flightNumber": "104",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13554-2402230640-2402230805--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T06:40:00",
                  "arrival": "2024-02-23T08:05:00",
                  "durationInMinutes": 85,
                  "flightNumber": "152",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "second_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.564918
        },
        {
          "id": "13542-2402201300--32753-1-12712-2402201940|12712-2402221700--32753-1-13542-2402230755",
          "price": {
            "raw": 529.03,
            "formatted": "$530"
          },
          "legs": [
            {
              "id": "13542-2402201300--32753-1-12712-2402201940",
              "origin": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 700,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T13:00:00",
              "arrival": "2024-02-20T19:40:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13542-11154-2402201300-2402201425--32753",
                  "origin": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T13:00:00",
                  "arrival": "2024-02-20T14:25:00",
                  "durationInMinutes": 85,
                  "flightNumber": "237",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201640-2402201940--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T16:40:00",
                  "arrival": "2024-02-20T19:40:00",
                  "durationInMinutes": 480,
                  "flightNumber": "107",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402221700--32753-1-13542-2402230755",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 595,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T17:00:00",
              "arrival": "2024-02-23T07:55:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402221700-2402230425--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T17:00:00",
                  "arrival": "2024-02-23T04:25:00",
                  "durationInMinutes": 385,
                  "flightNumber": "104",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13542-2402230630-2402230755--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T06:30:00",
                  "arrival": "2024-02-23T07:55:00",
                  "durationInMinutes": 85,
                  "flightNumber": "230",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "third_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.552902
        },
        {
          "id": "13554-2402201215--32753-1-12712-2402201940|12712-2402222110--32753-1-13554-2402231130",
          "price": {
            "raw": 527.97,
            "formatted": "$528"
          },
          "legs": [
            {
              "id": "13554-2402201215--32753-1-12712-2402201940",
              "origin": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 745,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T12:15:00",
              "arrival": "2024-02-20T19:40:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13554-11154-2402201215-2402201335--32753",
                  "origin": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T12:15:00",
                  "arrival": "2024-02-20T13:35:00",
                  "durationInMinutes": 80,
                  "flightNumber": "159",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201640-2402201940--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T16:40:00",
                  "arrival": "2024-02-20T19:40:00",
                  "durationInMinutes": 480,
                  "flightNumber": "107",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402222110--32753-1-13554-2402231130",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 560,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T21:10:00",
              "arrival": "2024-02-23T11:30:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402222110-2402230850--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T21:10:00",
                  "arrival": "2024-02-23T08:50:00",
                  "durationInMinutes": 400,
                  "flightNumber": "106",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13554-2402231010-2402231130--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T10:10:00",
                  "arrival": "2024-02-23T11:30:00",
                  "durationInMinutes": 80,
                  "flightNumber": "158",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "second_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.549767
        },
        {
          "id": "13542-2402201300--32753-1-12712-2402201940|12712-2402222110--32753-1-13542-2402231220",
          "price": {
            "raw": 529.03,
            "formatted": "$530"
          },
          "legs": [
            {
              "id": "13542-2402201300--32753-1-12712-2402201940",
              "origin": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 700,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T13:00:00",
              "arrival": "2024-02-20T19:40:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13542-11154-2402201300-2402201425--32753",
                  "origin": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T13:00:00",
                  "arrival": "2024-02-20T14:25:00",
                  "durationInMinutes": 85,
                  "flightNumber": "237",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201640-2402201940--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T16:40:00",
                  "arrival": "2024-02-20T19:40:00",
                  "durationInMinutes": 480,
                  "flightNumber": "107",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402222110--32753-1-13542-2402231220",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 610,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T21:10:00",
              "arrival": "2024-02-23T12:20:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402222110-2402230850--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T21:10:00",
                  "arrival": "2024-02-23T08:50:00",
                  "durationInMinutes": 400,
                  "flightNumber": "106",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13542-2402231055-2402231220--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T10:55:00",
                  "arrival": "2024-02-23T12:20:00",
                  "durationInMinutes": 85,
                  "flightNumber": "236",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "third_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.546571
        },
        {
          "id": "13554-2402201215--32753-1-12712-2402201940|12712-2402221700--32753-1-13554-2402230805",
          "price": {
            "raw": 527.97,
            "formatted": "$528"
          },
          "legs": [
            {
              "id": "13554-2402201215--32753-1-12712-2402201940",
              "origin": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 745,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T12:15:00",
              "arrival": "2024-02-20T19:40:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13554-11154-2402201215-2402201335--32753",
                  "origin": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T12:15:00",
                  "arrival": "2024-02-20T13:35:00",
                  "durationInMinutes": 80,
                  "flightNumber": "159",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201640-2402201940--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T16:40:00",
                  "arrival": "2024-02-20T19:40:00",
                  "durationInMinutes": 480,
                  "flightNumber": "107",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402221700--32753-1-13554-2402230805",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 605,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T17:00:00",
              "arrival": "2024-02-23T08:05:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402221700-2402230425--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T17:00:00",
                  "arrival": "2024-02-23T04:25:00",
                  "durationInMinutes": 385,
                  "flightNumber": "104",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13554-2402230640-2402230805--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T06:40:00",
                  "arrival": "2024-02-23T08:05:00",
                  "durationInMinutes": 85,
                  "flightNumber": "152",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "second_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.531441
        },
        {
          "id": "13554-2402200950--32753-1-11442-2402201605|11442-2402221735--32753-1-13554-2402230805",
          "price": {
            "raw": 578.71,
            "formatted": "$579"
          },
          "legs": [
            {
              "id": "13554-2402200950--32753-1-11442-2402201605",
              "origin": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "EWR",
                "name": "New York Newark",
                "displayCode": "EWR",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 675,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T09:50:00",
              "arrival": "2024-02-20T16:05:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13554-11154-2402200950-2402201115--32753",
                  "origin": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T09:50:00",
                  "arrival": "2024-02-20T11:15:00",
                  "durationInMinutes": 85,
                  "flightNumber": "155",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-11442-2402201305-2402201605--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "EWR",
                    "displayCode": "EWR",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York Newark",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T13:05:00",
                  "arrival": "2024-02-20T16:05:00",
                  "durationInMinutes": 480,
                  "flightNumber": "101",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "11442-2402221735--32753-1-13554-2402230805",
              "origin": {
                "id": "EWR",
                "name": "New York Newark",
                "displayCode": "EWR",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LHR",
                "name": "London Heathrow",
                "displayCode": "LHR",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 570,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T17:35:00",
              "arrival": "2024-02-23T08:05:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "11442-11154-2402221735-2402230510--32753",
                  "origin": {
                    "flightPlaceId": "EWR",
                    "displayCode": "EWR",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York Newark",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T17:35:00",
                  "arrival": "2024-02-23T05:10:00",
                  "durationInMinutes": 395,
                  "flightNumber": "100",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13554-2402230640-2402230805--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LHR",
                    "displayCode": "LHR",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Heathrow",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T06:40:00",
                  "arrival": "2024-02-23T08:05:00",
                  "durationInMinutes": 85,
                  "flightNumber": "152",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "third_shortest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.525736
        },
        {
          "id": "13542-2402201105--32753-1-12712-2402201940|12712-2402221700--32753-1-13542-2402230755",
          "price": {
            "raw": 529.03,
            "formatted": "$530"
          },
          "legs": [
            {
              "id": "13542-2402201105--32753-1-12712-2402201940",
              "origin": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 815,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T11:05:00",
              "arrival": "2024-02-20T19:40:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13542-11154-2402201105-2402201230--32753",
                  "origin": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T11:05:00",
                  "arrival": "2024-02-20T12:30:00",
                  "durationInMinutes": 85,
                  "flightNumber": "233",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201640-2402201940--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T16:40:00",
                  "arrival": "2024-02-20T19:40:00",
                  "durationInMinutes": 480,
                  "flightNumber": "107",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402221700--32753-1-13542-2402230755",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 595,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T17:00:00",
              "arrival": "2024-02-23T07:55:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402221700-2402230425--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T17:00:00",
                  "arrival": "2024-02-23T04:25:00",
                  "durationInMinutes": 385,
                  "flightNumber": "104",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13542-2402230630-2402230755--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T06:30:00",
                  "arrival": "2024-02-23T07:55:00",
                  "durationInMinutes": 85,
                  "flightNumber": "230",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "third_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.507807
        },
        {
          "id": "13542-2402201105--32753-1-12712-2402201940|12712-2402222110--32753-1-13542-2402231220",
          "price": {
            "raw": 529.03,
            "formatted": "$530"
          },
          "legs": [
            {
              "id": "13542-2402201105--32753-1-12712-2402201940",
              "origin": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "destination": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "durationInMinutes": 815,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-20T11:05:00",
              "arrival": "2024-02-20T19:40:00",
              "timeDeltaInDays": 0,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "13542-11154-2402201105-2402201230--32753",
                  "origin": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T11:05:00",
                  "arrival": "2024-02-20T12:30:00",
                  "durationInMinutes": 85,
                  "flightNumber": "233",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-12712-2402201640-2402201940--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "departure": "2024-02-20T16:40:00",
                  "arrival": "2024-02-20T19:40:00",
                  "durationInMinutes": 480,
                  "flightNumber": "107",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            },
            {
              "id": "12712-2402222110--32753-1-13542-2402231220",
              "origin": {
                "id": "JFK",
                "name": "New York John F. Kennedy",
                "displayCode": "JFK",
                "city": "New York",
                "isHighlighted": false
              },
              "destination": {
                "id": "LGW",
                "name": "London Gatwick",
                "displayCode": "LGW",
                "city": "London",
                "isHighlighted": false
              },
              "durationInMinutes": 610,
              "stopCount": 1,
              "isSmallestStops": false,
              "departure": "2024-02-22T21:10:00",
              "arrival": "2024-02-23T12:20:00",
              "timeDeltaInDays": 1,
              "carriers": {
                "marketing": [
                  {
                    "id": -32753,
                    "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    "name": "Aer Lingus"
                  }
                ],
                "operationType": "fully_operated"
              },
              "segments": [
                {
                  "id": "12712-11154-2402222110-2402230850--32753",
                  "origin": {
                    "flightPlaceId": "JFK",
                    "displayCode": "JFK",
                    "parent": {
                      "flightPlaceId": "NYCA",
                      "displayCode": "NYC",
                      "name": "New York",
                      "type": "City"
                    },
                    "name": "New York John F. Kennedy",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "departure": "2024-02-22T21:10:00",
                  "arrival": "2024-02-23T08:50:00",
                  "durationInMinutes": 400,
                  "flightNumber": "106",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                },
                {
                  "id": "11154-13542-2402231055-2402231220--32753",
                  "origin": {
                    "flightPlaceId": "DUB",
                    "displayCode": "DUB",
                    "parent": {
                      "flightPlaceId": "DUBL",
                      "displayCode": "DUB",
                      "name": "Dublin",
                      "type": "City"
                    },
                    "name": "Dublin",
                    "type": "Airport"
                  },
                  "destination": {
                    "flightPlaceId": "LGW",
                    "displayCode": "LGW",
                    "parent": {
                      "flightPlaceId": "LOND",
                      "displayCode": "LON",
                      "name": "London",
                      "type": "City"
                    },
                    "name": "London Gatwick",
                    "type": "Airport"
                  },
                  "departure": "2024-02-23T10:55:00",
                  "arrival": "2024-02-23T12:20:00",
                  "durationInMinutes": 85,
                  "flightNumber": "236",
                  "marketingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  },
                  "operatingCarrier": {
                    "id": -32753,
                    "name": "Aer Lingus",
                    "alternateId": "EI",
                    "allianceId": 0
                  }
                }
              ]
            }
          ],
          "isSelfTransfer": false,
          "isProtectedSelfTransfer": false,
          "farePolicy": {
            "isChangeAllowed": false,
            "isPartiallyChangeable": false,
            "isCancellationAllowed": false,
            "isPartiallyRefundable": false
          },
          "tags": [
            "third_cheapest"
          ],
          "isMashUp": false,
          "hasFlexibleOptions": false,
          "score": 0.502462
        }
      ],
      "messages": [],
      "filterStats": {
        "duration": {
          "min": 495,
          "max": 815
        },
        "airports": [
          {
            "city": "New York",
            "airports": [
              {
                "id": "JFK",
                "name": "New York John F. Kennedy"
              },
              {
                "id": "EWR",
                "name": "New York Newark"
              }
            ]
          },
          {
            "city": "London",
            "airports": [
              {
                "id": "LGW",
                "name": "London Gatwick"
              },
              {
                "id": "LHR",
                "name": "London Heathrow"
              }
            ]
          }
        ],
        "carriers": [
          {
            "id": -32753,
            "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
            "name": "Aer Lingus"
          },
          {
            "id": -30598,
            "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
            "name": "Norse Atlantic Airways (UK)"
          }
        ],
        "stopPrices": {
          "direct": {
            "isPresent": true,
            "formattedPrice": "$420"
          },
          "one": {
            "isPresent": true,
            "formattedPrice": "$528"
          },
          "twoOrMore": {
            "isPresent": false
          }
        }
      }
    }
  }
    }
  },
  computed: {
    // computed
  },

  // start of lifecycle
  async mounted() {
    await this.mountAllHotelInformation()
    this.mounted = true
  },

  methods: {
    // methods defined by ourselves
    async mountAllHotelInformation() {
      // get all the hotels within that city displayed.
      // const options = {
      //   method: 'GET',
      //   url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      //   params: {
      //     checkin_date: checkin_date,
      //     dest_type: 'city',
      //     units: 'metric',
      //     checkout_date: checkout_date,
      //     adults_number: adults_number,
      //     order_by: 'popularity',
      //     dest_id: dest_id,
      //     filter_by_currency: 'HNL',
      //     locale: 'en-gb',
      //     room_number: number_of_rooms,
      //     categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      //     include_adjacency: 'true'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
      //     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //   }
      // };
      // const options = {
      //   method: 'GET',
      //   url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      //   params: {
      //     checkin_date: '2023-09-27',
      //     dest_type: 'city',
      //     units: 'metric',
      //     checkout_date: '2023-09-30',
      //     adults_number: '2',
      //     order_by: 'popularity',
      //     dest_id: '-73635',
      //     filter_by_currency: 'HNL',
      //     locale: 'en-gb',
      //     room_number: '1',
      //     children_number: '2',
      //     children_ages: '5,0',
      //     categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      //     include_adjacency: 'true'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
      //     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //   }
      // }

      // const response = await axios.request(options)
      this.hotelsInCities = this.false_data
      console.log(this.hotelsInCities.data.itineraries,'test')

      // for (let hotel of this.hotelsInCities) {
      //   let hotel_id = hotel.hotel_id
      //   // fire an API call to get description
      //   const options = {
      //     method: 'GET',
      //     url: 'https://booking-com.p.rapidapi.com/v1/hotels/description',
      //     params: {
      //       hotel_id: hotel_id,
      //       locale: 'en-gb'
      //     },
      //     headers: {
      //       'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
      //       'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //     }
      //   }
      //   try {
      //     const response = await axios.request(options)
      //     hotel['Description'] = response.data
      //   } catch (error) {
      //     console.error(error)
      //   }
      // }
      // this.hotelsInCities = this.false_data;
    }
  }
}
</script>

<style scoped>
.banner {
  background-color: blue;
}
</style>
