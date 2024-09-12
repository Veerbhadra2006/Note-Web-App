const left = document.querySelector(".left");
const addBtn = document.querySelector(".add-Btn");
const textarea = document.querySelector("#textarea");
const head = document.querySelector(".head");
const saveBtn = document.querySelector(".save");
const contDel = document.querySelector(".cont-del");

let currentNote = null;

addBtn.addEventListener("click", function () {
  textarea.value = "";
  head.value = "";
  currentNote = null; // Clear current note reference
});

saveBtn.addEventListener("click", function () {
  const noteText = textarea.value.trim();
  const heading = head.value.trim();

  if (noteText === "" && heading === "") {
    alert("Please input content before saving.");
    return;
  }

  if (currentNote) {
    // Update existing note
    currentNote.querySelector("h2").textContent = heading || "Untitled";
    currentNote.querySelector("p").textContent = noteText;
  } else {
    // Create a new note
    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = `
      <div class="note-library flex">
        <div class="note-name">
          <h2>${heading || "Untitled"}</h2>
          <p style="display: none;">${noteText}</p>
          <div class="left-option">
            <img class="open" src="images/view.svg" alt="open note">
            <img class="delete" src="images/trash.svg" alt="delete note">
          </div>
        </div>
      </div>
    `;

    left.appendChild(note);

    note.querySelector(".open").addEventListener("click", function () {
      textarea.value = note.querySelector("p").textContent;
      head.value = note.querySelector("h2").textContent;
      currentNote = note; // Set the note as the one being edited
    });

    note.querySelector(".delete").addEventListener("click", function () {
      note.remove();
      if (currentNote === note) {
        currentNote = null; // Clear current note reference if deleted
      }
      textarea.value = "";
      head.value = "";
    });
  }

  textarea.value = "";
  head.value = "";
  currentNote = null; // Clear current note reference after saving
});

contDel.addEventListener("click", function () {
  textarea.value = "";
  head.value = "";
});
