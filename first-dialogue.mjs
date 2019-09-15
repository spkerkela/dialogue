import {calledNTimes} from "./helpers.mjs"
const dialogueTree = [
  {
    id: "root",
    dialogue: "Hello",
    options: [
      { optionText: "Hello", leadsTo: "hub" },
      { optionText: "How are you", leadsTo: "well" },

      { optionText: "Goodbye", leadsTo: "bye" }
    ]
  },
  {
    id: "give-gem",
    dialogue: "Sure, here you go!",
    options: [{ optionText: "Thanks!", leadsTo: "hub" }]
  },
  {
    id: "hub",
    dialogue: "Is there something I can help you with?",
    options: [
      { optionText: "How was this page made?", leadsTo: "explain-page" },
      {
        optionText: "Have we been talking for long enough?",
        leadsTo: "alternative-end",
        requirement: calledNTimes(3)
      },
      {
        optionText: "Can you give me a gem?",
        leadsTo: "give-gem",
        requirement: function(state) {
          return !state.playerHasGem;
        },
        callback: function(state) {
          state.playerHasGem = true;
        }
      },
      { optionText: "Nope, bye", leadsTo: "bye" }
    ]
  },
  {
    id: "explain-page",
    dialogue: "Well it's made with javascript",
    options: [
      { optionText: "Sure, but how exactly?", leadsTo: "explain-more" },
      { optionText: "Cool, I have something else to ask", leadsTo: "hub" },
      { optionText: "Ok, see ya", leadsTo: "bye" }
    ]
  },
  {
    id: "explain-more",
    dialogue:
      "You can find the source at https://github.com/spkerkela/dialogue",
    options: [
      { optionText: "Cool, I have something else to ask", leadsTo: "hub" },
      { optionText: "Ok, see ya", leadsTo: "bye" }
    ]
  },
  {
    id: "well",
    dialogue: "I am good thanks",
    options: [
      { optionText: "Great", leadsTo: "hub" },
      { optionText: "All right laters", leadsTo: "bye" }
    ]
  },
  {
    id: "bye",
    dialogue: "Bye",
    options: []
  },
  {
    id: "alternative-end",
    dialogue: "Yes I believe so. Laters",
    options: []
  }
];

export default dialogueTree;