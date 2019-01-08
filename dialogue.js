var dialogue = document.getElementById("dialogue");
var optionsContainer = document.getElementById("options");

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
    id: "hub",
    dialogue: "Is there something I can help you with?",
    options: [
      { optionText: "How was this page made?", leadsTo: "explain-page" },
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
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(option.optionText));
    li.className = "clickable option";
    li.onclick = function(clicked) {
      renderDialogue(option.leadsTo);
    };
    optionsContainer.appendChild(li);
  });
}

renderDialogue("root");
