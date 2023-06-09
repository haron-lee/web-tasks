const saveBtn = document.getElementById('save_btn');
const listTitle = document.getElementById('title');
const listContent = document.getElementById('content');

let allMemo = JSON.parse(localStorage.getItem('allMemo'));
allMemo = allMemo ?? [];
render();

//* note를 localStorage에 저장
function saveNote() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const modifyIdx = saveBtn.getAttribute('data-idx');

  // title과 content가 비어있다면 알림이 가게끔
  if (title === '' || content === '') {
    alert('제목 또는 내용을 작성해주세요');
  }
  // saveBtn이 "저장하기"여야하고, title과 content에 내용이 있어야 저장 실행
  if (saveBtn.textContent === '저장하기' && !(!title || !content)) {
    allMemo.push({ title, content, len: allMemo.length });
    localStorage.setItem('allMemo', JSON.stringify(allMemo));
    // 저장하기 누르면 내부 value값은 없어지게
    listTitle.value = '';
    listContent.value = '';
  } else if (saveBtn.textContent === '수정하기' && modifyIdx !== null) {
    allMemo[modifyIdx].title = title;
    allMemo[modifyIdx].content = content;
    localStorage.setItem('allMemo', JSON.stringify(allMemo));
    listTitle.value = '';
    listContent.value = '';
    saveBtn.textContent = '저장하기';
    saveBtn.removeAttribute('data-idx');
  }
  render();
}

function render() {
  const noteDisplay = document.getElementById('note_display');
  noteDisplay.innerHTML = '';

  for (const item of allMemo) {
    const saveBox = document.createElement('li');
    const saveTitle = document.createElement('h2');
    const saveContent = document.createElement('p');
    const saveId = document.createElement('p');
    const btnBox = document.createElement('div');
    const modifyBtn = document.createElement('button');
    const deleteMemoBtn = document.createElement('button');

    saveBox.classList.add('list');
    saveId.classList.add('list-id');
    saveTitle.classList.add('list-title');
    saveContent.classList.add('list-content');
    btnBox.classList.add('box-btn');
    modifyBtn.classList.add('list-modify');
    deleteMemoBtn.classList.add('list-delete');

    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    saveId.textContent = item.len + 1;
    modifyBtn.textContent = '수정';
    modifyBtn.setAttribute('id', item.len);
    modifyBtn.setAttribute('onclick', 'modify()');
    deleteMemoBtn.textContent = '삭제';
    deleteMemoBtn.setAttribute('id', item.len);
    deleteMemoBtn.setAttribute('onclick', 'remove()');

    saveBox.appendChild(saveId);
    saveBox.appendChild(saveTitle);
    saveBox.appendChild(saveContent);
    btnBox.appendChild(modifyBtn);
    btnBox.appendChild(deleteMemoBtn);
    saveBox.appendChild(btnBox);
    // noteDisplay.appendChild(saveBox);
    // 최신목록이 위로 올라가게끔 하기
    noteDisplay.insertBefore(saveBox, noteDisplay.firstChild);
  }
}

//* modal 구현하기
const lists = document.querySelectorAll('.list .list-title');
const listsContent = document.querySelectorAll('.list .list-content');

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.remove();
};

saveBtn.addEventListener('click', saveNote);

lists.forEach((list) => {
  list.addEventListener('click', () => {
    const modal = document.createElement('article');
    const titleBox = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const modalContent = document.createElement('p');
    const closeBtn = document.createElement('button');

    modal.classList.add('modal');
    titleBox.classList.add('title-box');
    modalTitle.classList.add('modal-title');
    modalContent.classList.add('modal-content');
    closeBtn.classList.add('close-btn');

    closeBtn.setAttribute('onclick', 'closeModal()');

    modal.appendChild(titleBox);
    titleBox.appendChild(modalTitle);
    titleBox.appendChild(closeBtn);
    modal.appendChild(modalContent);
    container.appendChild(modal);
    // 클릭된 list-title의 textContent와, 형제의 textContent가져오기
    modalTitle.textContent = list.textContent;
    modalContent.textContent = list.nextElementSibling.textContent;
    console.log(list);
  });
});

const modify = () => {
  const idx = allMemo.findIndex((item) => item.len == event.srcElement.id);
  if (idx !== -1) {
    listTitle.value = allMemo[idx].title;
    listContent.value = allMemo[idx].content;
    saveBtn.textContent = '수정하기';
    // 수정 버튼의 id를 변경하여 수정할 항목을 식별하도록 함
    saveBtn.setAttribute('data-idx', idx);
  }
};

function remove() {
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  }
  // 삭제하고 한번더 세팅
  localStorage.setItem('allMemo', JSON.stringify(allMemo));
  render();
}

document.querySelector('#newNote').addEventListener('click', () => {
  if (listTitle.value || listContent.value) {
    listTitle.value = '';
    listContent.value = '';
  }
});

//* Notification
const notification = document.querySelector('#noti-container');
const showNotification = () => {
  notification.style.display = 'block';
};

const hideNotification = () => {
  notification.style.display = 'none';
};

setTimeout(showNotification, 5000);
setTimeout(hideNotification, 9000);
