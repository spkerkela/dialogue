import dialogueTree from "./first-dialogue.mjs";
var dialogue = document.getElementById("dialogue");
var optionsContainer = document.getElementById("options");

var gameState = {
  playerHasGem: false
};

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
    if (option.requirement != null && !option.requirement(gameState)) {
      return;
    }
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(option.optionText));
    li.className = "clickable option";
    li.onclick = function(clicked) {
      if (option.callback != null) {
        option.callback(gameState);
      }
      renderDialogue(option.leadsTo);
    };
    optionsContainer.appendChild(li);
  });
}

renderDialogue("root");
