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
            <div class="col-4"></div>
            <div class="col-2 me-3">
              <!--inputted value in it-->
              <input type="text" value="Singapore" />
            </div>
            <div class="col-3">
              <input type="date" value="13th September 2023" />
            </div>
            <div class="col-3">
              <!-- human logos in it -->
            </div>
          </div>
        </div>
  
        <div class="container-fluid filter-button">
          <div class="row ms-4">
            <div class="col-3"></div>
            <!--PRICE FILTER-->
            <div class="col-2">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button">
                Price Per Night
              </button>
            </div>
  
            <div class="col-1">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button">
                Rating
              </button>
              <!--slider-->
            </div>
  
            <div class="col-1 mx-4" style="padding-left: 0px">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button">
                Star Rating
              </button>
            </div>
  
            <div class="col-1 mx-4" style="padding-left: 0px">
              <input type="text" class="search" />
              <!--Search text box-->
            </div>
  
            <!--Pending search button-->
          </div>
        </div>
      </div>
      <div class="card_section" v-if="mounted">
        <FlightCard v-for="hotel in this.hotelsInCities" :hotel_name="hotel.hotel_name"
          :distance_to_cc_formatted="hotel.distance_to_cc_formatted" :review_score="hotel.review_score"
          :review_score_word="hotel.review_score_word" :number_of_reviews="hotel.review_nr"
          ::price_per_night="hotel.composite_price_breakdown.gross_amount_per_night.value"
          :photo_url="hotel.max_1440_photo_url"
          :currency="hotel.composite_price_breakdown.gross_amount_per_night.currency" :updated_object="hotel"
          :district="hotel.district" :city="hotel.city"></FlightCard>
      </div>
      <div class="spinner_section d-flex flex-column" v-if="!mounted">
        <div class="spinner-border mt-5" style="margin: 0 auto;height:200px;width:200px;" role="status">
        </div>
        <p class="mt-2" style="text-align: center;">Loading...Please give us a second</p>
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
        false_data: [{
          "genius_discount_percentage": 0,
          "review_score": 8.3,
          "composite_price_breakdown": {
            "benefits": [],
            "charges_details": {
              "mode": "all_included",
              "translated_copy": "Includes taxes and charges",
              "amount": {
                "value": 0,
                "currency": "SGD"
              }
            },
            "net_amount": {
              "value": 1200,
              "currency": "SGD"
            },
            "gross_amount": {
              "value": 1425.6,
              "currency": "SGD"
            },
            "gross_amount_hotel_currency": {
              "currency": "SGD",
              "value": 1425.6
            },
            "included_taxes_and_charges_amount": {
              "currency": "SGD",
              "value": 225.6
            },
            "product_price_breakdowns": [
              {
                "gross_amount_hotel_currency": {
                  "currency": "SGD",
                  "value": 1425.6
                },
                "included_taxes_and_charges_amount": {
                  "value": 225.6,
                  "currency": "SGD"
                },
                "charges_details": {
                  "amount": {
                    "currency": "SGD",
                    "value": 0
                  },
                  "translated_copy": "Includes taxes and charges",
                  "mode": "all_included"
                },
                "benefits": [],
                "gross_amount": {
                  "value": 1425.6,
                  "currency": "SGD"
                },
                "net_amount": {
                  "value": 1200,
                  "currency": "SGD"
                },
                "all_inclusive_amount": {
                  "value": 1425.6,
                  "currency": "SGD"
                },
                "items": [
                  {
                    "item_amount": {
                      "currency": "SGD",
                      "value": 105.6
                    },
                    "details": "8 % Tax",
                    "name": "Tax",
                    "kind": "charge",
                    "base": {
                      "percentage": 8,
                      "kind": "percentage"
                    },
                    "inclusion_type": "included"
                  },
                  {
                    "inclusion_type": "included",
                    "name": "Service charge",
                    "details": "10 % Service charge",
                    "item_amount": {
                      "currency": "SGD",
                      "value": 120
                    },
                    "base": {
                      "kind": "percentage",
                      "percentage": 10
                    },
                    "kind": "charge"
                  }
                ],
                "gross_amount_per_night": {
                  "currency": "SGD",
                  "value": 475.2
                },
                "excluded_amount": {
                  "value": 0,
                  "currency": "SGD"
                }
              }
            ],
            "excluded_amount": {
              "currency": "SGD",
              "value": 0
            },
            "all_inclusive_amount": {
              "currency": "SGD",
              "value": 1425.6
            },
            "items": [
              {
                "inclusion_type": "included",
                "kind": "charge",
                "base": {
                  "percentage": 8,
                  "kind": "percentage"
                },
                "item_amount": {
                  "value": 105.6,
                  "currency": "SGD"
                },
                "details": "8 % Tax",
                "name": "Tax"
              },
              {
                "details": "10 % Service charge",
                "item_amount": {
                  "currency": "SGD",
                  "value": 120
                },
                "name": "Service charge",
                "kind": "charge",
                "base": {
                  "kind": "percentage",
                  "percentage": 10
                },
                "inclusion_type": "included"
              }
            ],
            "gross_amount_per_night": {
              "value": 475.2,
              "currency": "SGD"
            }
          },
          "district_id": 1421,
          "city_in_trans": "in Singapore",
          "checkout": {
            "from": "",
            "until": "12:00"
          },
          "bwallet": {
            "hotel_eligibility": 0
          },
          "city_trans": "Singapore",
          "address_trans": "7500A Beach Road, The Plaza",
          "default_wishlist_name": "Singapore",
          "districts": "1421,2871",
          "unit_configuration_label": "<b>Hotel room</b>: 2 beds",
          "review_recommendation": "",
          "min_total_price": 1425.6,
          "block_ids": [
            "2513501_148416469_0_2_0"
          ],
          "distances": [
            {
              "icon_name": "bui_geo_pin",
              "icon_set": null,
              "text": "‎Bugis‬ • ‎1.4 km from centre‬"
            },
            {
              "icon_name": "bui_baby_cot",
              "icon_set": null,
              "text": "‎This property has free cots available‬"
            }
          ],
          "cc_required": 1,
          "mobile_discount_percentage": 0,
          "checkin": {
            "until": "",
            "from": "15:00"
          },
          "latitude": 1.30007047125904,
          "native_ads_cpc": 0,
          "external_reviews": {
            "score": 9,
            "num_reviews": 11,
            "should_display": "",
            "score_word": "Superb"
          },
          "url": "https://www.booking.com/hotel/sg/parkroyal-on-beach-road.html",
          "extended": 0,
          "has_free_parking": 1,
          "address": "7500A Beach Road, The Plaza",
          "country_trans": "Singapore",
          "price_is_final": 1,
          "distance": "1.43",
          "native_ad_id": "",
          "native_ads_tracking": "",
          "currencycode": "SGD",
          "city_name_en": "Singapore",
          "matching_units_configuration": {
            "matching_units_common_config": {
              "unit_type_id": 24,
              "localized_area": null
            }
          },
          "children_not_allowed": 0,
          "district": "Bugis",
          "review_nr": 1406,
          "class_is_estimated": 0,
          "hotel_include_breakfast": 0,
          "is_free_cancellable": 1,
          "main_photo_id": 81717256,
          "is_no_prepayment_block": 1,
          "badges": [],
          "longitude": 103.860569894314,
          "is_smart_deal": 0,
          "currency_code": "SGD",
          "cc1": "sg",
          "is_geo_rate": "",
          "review_score_word": "Very good",
          "zip": "199591",
          "distance_to_cc": "1.45",
          "countrycode": "sg",
          "in_best_district": 0,
          "accommodation_type": 204,
          "is_beach_front": 0,
          "hotel_facilities": "505,444,147,2,506,3,441,52,11,8,6,420,423,493,46,244,7,500,48,499,425,199,241,81,496,247,220,16,418,440,194,497,124,443,245,491,421,54,258,108,158,63,449,145,501,240,446,468,445,23,504,53,27,254,44,111,198,433,442,251,133,257,301,47,435,454,436,161,461,451,242,104,439,467,110,459,134,91,489,219,49,51,200,456,253,203,485,109,455,448,492,160,22,502,450,305,256,460,119,255,205,55,5",
          "wishlist_count": 0,
          "type": "property_card",
          "updated_checkout": null,
          "is_mobile_deal": 0,
          "distance_to_cc_formatted": "1.4 km",
          "preferred": 1,
          "preferred_plus": 0,
          "city": "Singapore",
          "id": "property_card_25135",
          "main_photo_url": "https://cf.bstatic.com/xdata/images/hotel/square60/81717256.jpg?k=a343735ea14d420d9aae532d276396215d86330280158c1d2cd9a6861922f63d&o=",
          "selected_review_topic": null,
          "class": 4,
          "soldout": 0,
          "updated_checkin": null,
          "has_swimming_pool": 1,
          "hotel_has_vb_boost": 1,
          "ufi": -73635,
          "default_language": "en",
          "hotel_name": "PARKROYAL on Beach Road, Singapore",
          "timezone": "Asia/Singapore",
          "is_city_center": 0,
          "cant_book": 0,
          "price_breakdown": {
            "has_tax_exceptions": 0,
            "sum_excluded_raw": "0.00",
            "all_inclusive_price": 1425.6,
            "has_incalculable_charges": 0,
            "currency": "SGD",
            "gross_price": "1425.60",
            "has_fine_print_charges": 0
          },
          "is_genius_deal": 0,
          "accommodation_type_name": "Hotel",
          "hotel_name_trans": "PARKROYAL on Beach Road, Singapore",
          "hotel_id": 25135,
          "max_photo_url": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/81717256.jpg?k=a343735ea14d420d9aae532d276396215d86330280158c1d2cd9a6861922f63d&o=",
          "max_1440_photo_url": "https://cf.bstatic.com/xdata/images/hotel/1440x1440/81717256.jpg?k=a343735ea14d420d9aae532d276396215d86330280158c1d2cd9a6861922f63d&o=",
          "Description": {
            "languagecode": "en",
            "descriptiontype_id": 7,
            "description": "The name on the credit card used for the booking should correspond to the guest staying at the property. For reservations made by a third party, you will need to complete an authorisation form and present a copy of the person's ID and credit card.  The payable total price may be increased by 1% due to the GST increase in 2024.",
            "extra_lines": {
              "imp_info": "Please inform PARKROYAL on Beach Road, Singapore in advance of your expected arrival time. You can use the Special Requests box when booking, or contact the property directly with the contact details provided in your confirmation.\n\nGuests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply.\n\n"
            }
          }
        },{
          "genius_discount_percentage": 0,
          "review_score": 8.3,
          "composite_price_breakdown": {
            "benefits": [],
            "charges_details": {
              "mode": "all_included",
              "translated_copy": "Includes taxes and charges",
              "amount": {
                "value": 0,
                "currency": "SGD"
              }
            },
            "net_amount": {
              "value": 1200,
              "currency": "SGD"
            },
            "gross_amount": {
              "value": 1425.6,
              "currency": "SGD"
            },
            "gross_amount_hotel_currency": {
              "currency": "SGD",
              "value": 1425.6
            },
            "included_taxes_and_charges_amount": {
              "currency": "SGD",
              "value": 225.6
            },
            "product_price_breakdowns": [
              {
                "gross_amount_hotel_currency": {
                  "currency": "SGD",
                  "value": 1425.6
                },
                "included_taxes_and_charges_amount": {
                  "value": 225.6,
                  "currency": "SGD"
                },
                "charges_details": {
                  "amount": {
                    "currency": "SGD",
                    "value": 0
                  },
                  "translated_copy": "Includes taxes and charges",
                  "mode": "all_included"
                },
                "benefits": [],
                "gross_amount": {
                  "value": 1425.6,
                  "currency": "SGD"
                },
                "net_amount": {
                  "value": 1200,
                  "currency": "SGD"
                },
                "all_inclusive_amount": {
                  "value": 1425.6,
                  "currency": "SGD"
                },
                "items": [
                  {
                    "item_amount": {
                      "currency": "SGD",
                      "value": 105.6
                    },
                    "details": "8 % Tax",
                    "name": "Tax",
                    "kind": "charge",
                    "base": {
                      "percentage": 8,
                      "kind": "percentage"
                    },
                    "inclusion_type": "included"
                  },
                  {
                    "inclusion_type": "included",
                    "name": "Service charge",
                    "details": "10 % Service charge",
                    "item_amount": {
                      "currency": "SGD",
                      "value": 120
                    },
                    "base": {
                      "kind": "percentage",
                      "percentage": 10
                    },
                    "kind": "charge"
                  }
                ],
                "gross_amount_per_night": {
                  "currency": "SGD",
                  "value": 475.2
                },
                "excluded_amount": {
                  "value": 0,
                  "currency": "SGD"
                }
              }
            ],
            "excluded_amount": {
              "currency": "SGD",
              "value": 0
            },
            "all_inclusive_amount": {
              "currency": "SGD",
              "value": 1425.6
            },
            "items": [
              {
                "inclusion_type": "included",
                "kind": "charge",
                "base": {
                  "percentage": 8,
                  "kind": "percentage"
                },
                "item_amount": {
                  "value": 105.6,
                  "currency": "SGD"
                },
                "details": "8 % Tax",
                "name": "Tax"
              },
              {
                "details": "10 % Service charge",
                "item_amount": {
                  "currency": "SGD",
                  "value": 120
                },
                "name": "Service charge",
                "kind": "charge",
                "base": {
                  "kind": "percentage",
                  "percentage": 10
                },
                "inclusion_type": "included"
              }
            ],
            "gross_amount_per_night": {
              "value": 475.2,
              "currency": "SGD"
            }
          },
          "district_id": 1421,
          "city_in_trans": "in Singapore",
          "checkout": {
            "from": "",
            "until": "12:00"
          },
          "bwallet": {
            "hotel_eligibility": 0
          },
          "city_trans": "Singapore",
          "address_trans": "7500A Beach Road, The Plaza",
          "default_wishlist_name": "Singapore",
          "districts": "1421,2871",
          "unit_configuration_label": "<b>Hotel room</b>: 2 beds",
          "review_recommendation": "",
          "min_total_price": 1425.6,
          "block_ids": [
            "2513501_148416469_0_2_0"
          ],
          "distances": [
            {
              "icon_name": "bui_geo_pin",
              "icon_set": null,
              "text": "‎Bugis‬ • ‎1.4 km from centre‬"
            },
            {
              "icon_name": "bui_baby_cot",
              "icon_set": null,
              "text": "‎This property has free cots available‬"
            }
          ],
          "cc_required": 1,
          "mobile_discount_percentage": 0,
          "checkin": {
            "until": "",
            "from": "15:00"
          },
          "latitude": 1.30007047125904,
          "native_ads_cpc": 0,
          "external_reviews": {
            "score": 9,
            "num_reviews": 11,
            "should_display": "",
            "score_word": "Superb"
          },
          "url": "https://www.booking.com/hotel/sg/parkroyal-on-beach-road.html",
          "extended": 0,
          "has_free_parking": 1,
          "address": "7500A Beach Road, The Plaza",
          "country_trans": "Singapore",
          "price_is_final": 1,
          "distance": "1.43",
          "native_ad_id": "",
          "native_ads_tracking": "",
          "currencycode": "SGD",
          "city_name_en": "Singapore",
          "matching_units_configuration": {
            "matching_units_common_config": {
              "unit_type_id": 24,
              "localized_area": null
            }
          },
          "children_not_allowed": 0,
          "district": "Bugis",
          "review_nr": 1406,
          "class_is_estimated": 0,
          "hotel_include_breakfast": 0,
          "is_free_cancellable": 1,
          "main_photo_id": 81717256,
          "is_no_prepayment_block": 1,
          "badges": [],
          "longitude": 103.860569894314,
          "is_smart_deal": 0,
          "currency_code": "SGD",
          "cc1": "sg",
          "is_geo_rate": "",
          "review_score_word": "Very good",
          "zip": "199591",
          "distance_to_cc": "1.45",
          "countrycode": "sg",
          "in_best_district": 0,
          "accommodation_type": 204,
          "is_beach_front": 0,
          "hotel_facilities": "505,444,147,2,506,3,441,52,11,8,6,420,423,493,46,244,7,500,48,499,425,199,241,81,496,247,220,16,418,440,194,497,124,443,245,491,421,54,258,108,158,63,449,145,501,240,446,468,445,23,504,53,27,254,44,111,198,433,442,251,133,257,301,47,435,454,436,161,461,451,242,104,439,467,110,459,134,91,489,219,49,51,200,456,253,203,485,109,455,448,492,160,22,502,450,305,256,460,119,255,205,55,5",
          "wishlist_count": 0,
          "type": "property_card",
          "updated_checkout": null,
          "is_mobile_deal": 0,
          "distance_to_cc_formatted": "1.4 km",
          "preferred": 1,
          "preferred_plus": 0,
          "city": "Singapore",
          "id": "property_card_25135",
          "main_photo_url": "https://cf.bstatic.com/xdata/images/hotel/square60/81717256.jpg?k=a343735ea14d420d9aae532d276396215d86330280158c1d2cd9a6861922f63d&o=",
          "selected_review_topic": null,
          "class": 4,
          "soldout": 0,
          "updated_checkin": null,
          "has_swimming_pool": 1,
          "hotel_has_vb_boost": 1,
          "ufi": -73635,
          "default_language": "en",
          "hotel_name": "PARKROYAL on Beach Road, Singapore",
          "timezone": "Asia/Singapore",
          "is_city_center": 0,
          "cant_book": 0,
          "price_breakdown": {
            "has_tax_exceptions": 0,
            "sum_excluded_raw": "0.00",
            "all_inclusive_price": 1425.6,
            "has_incalculable_charges": 0,
            "currency": "SGD",
            "gross_price": "1425.60",
            "has_fine_print_charges": 0
          },
          "is_genius_deal": 0,
          "accommodation_type_name": "Hotel",
          "hotel_name_trans": "PARKROYAL on Beach Road, Singapore",
          "hotel_id": 25135,
          "max_photo_url": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/81717256.jpg?k=a343735ea14d420d9aae532d276396215d86330280158c1d2cd9a6861922f63d&o=",
          "max_1440_photo_url": "https://cf.bstatic.com/xdata/images/hotel/1440x1440/81717256.jpg?k=a343735ea14d420d9aae532d276396215d86330280158c1d2cd9a6861922f63d&o=",
          "Description": {
            "languagecode": "en",
            "descriptiontype_id": 7,
            "description": "The name on the credit card used for the booking should correspond to the guest staying at the property. For reservations made by a third party, you will need to complete an authorisation form and present a copy of the person's ID and credit card.  The payable total price may be increased by 1% due to the GST increase in 2024.",
            "extra_lines": {
              "imp_info": "Please inform PARKROYAL on Beach Road, Singapore in advance of your expected arrival time. You can use the Special Requests box when booking, or contact the property directly with the contact details provided in your confirmation.\n\nGuests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply.\n\n"
            }
          }
        }]
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
        this.hotelsInCities = this.false_data;
        console.log(this.hotelsInCities);
  
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
  