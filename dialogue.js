var dialogue = document.getElementById("dialogue");
var optionsContainer = document.getElementById("options");

var gameState = {
  playerHasGem: false
};

var calledNTimes = function(n) {
  var called = 0;
  return function() {
    called++;
    return called >= n;
  };
};

var dialogueTree = [
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
        requirement: function() {
          return !gameState.playerHasGem;
        },
        callback: function() {
          gameState.playerHasGem = true;
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

function changeDialogue(newText) {
  dialogue.textContent = newText;
}

function clearOptions() {
  optionsContainer.innerHTML = "";
}

function clicked(e) {
  changeDialogue(e.target.textContent);
  clearOptions();
}

function renderDialogue(id) {
  var dialogue = dialogueTree.find(function(element) {
    return element.id === id;
  });

  clearOptions();
  changeDialogue(dialogue.dialogue);
  dialogue.options.forEach(function(option) {
    if (option.requirement != null && !option.requirement()) {
      return;
    }
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(option.optionText));
    li.className = "clickable option";
    li.onclick = function(clicked) {
      if (option.callback != null) {
        option.callback(option);
      }
      renderDialogue(option.leadsTo);
    };
    optionsContainer.appendChild(li);
  });
}

renderDialogue("root");
