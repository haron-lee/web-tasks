const saveBtn = document.getElementById("save_btn");

let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

//* note를 loacalStorage에 저장

function saveNote() {
  const listTitle = document.getElementById("title");
  const listContent = document.getElementById("content");
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  allMemo.push({ title, content, len: allMemo.length });
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  // 저장하기 누르면 내부 value값은 없어지게
  listTitle.value = "";
  listContent.value = "";

  render();
}

function render() {
  const noteDisplay = document.getElementById("note_display");
  noteDisplay.innerHTML = "";

  for (const item of allMemo) {
    const saveBox = document.createElement("div");
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("p");
    const saveId = document.createElement("p");
    const deleteMemoBtn = document.createElement("button");

    saveBox.classList.add("list");
    saveId.classList.add("list-id");
    saveTitle.classList.add("list-title");
    saveContent.classList.add("list-content");
    deleteMemoBtn.classList.add("list-delete");

    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    saveId.textContent = item.len + 1;
    deleteMemoBtn.textContent = "삭제";
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");

    saveBox.appendChild(saveId);
    saveBox.appendChild(saveTitle);
    saveBox.appendChild(saveContent);
    saveBox.appendChild(deleteMemoBtn);
    noteDisplay.appendChild(saveBox);
  }
}

function remove() {
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  }
  // 삭제하고 한번더 세팅
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}

// new note누르면은 note안의 내용이 clear되기

// 목록중의 하나 누르면은 모달처럼 펼쳐지기

saveBtn.addEventListener("click", saveNote);
