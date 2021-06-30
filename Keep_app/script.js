const addButton = document.querySelector("#add");

const updatelocalstorage = () =>{
    const textareadata = document.querySelectorAll('textarea');
    const notes = [];
    textareadata.forEach((note) =>{
        return notes.push(note.value)
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') =>{
    const note = document.createElement("div");
    note.classList.add("container","note");

    const htmlData = `
    <div class="row">
         
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="area ${text ? "hidden" : ""}"></textarea>
            
            <div class="col ml-2 operation">
            <button type="button" class="edit btn btn-success ml-2"><i class="fas fa-edit"></i></button>
            <button type="button" class="delete btn btn-warning"><i class="fas fa-trash-alt"></i></button>
          </div>
        
        </div>
        `;
    note.insertAdjacentHTML("afterbegin", htmlData);

    const editButton = note.querySelector('.edit');
    const dltButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    dltButton.addEventListener('click', ()=>{
        note.remove();
        updatelocalstorage();
    })

    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', ()=>{
        mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });

    textarea.addEventListener('change', (event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updatelocalstorage();
    })

    document.body.appendChild(note);

}

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){ notes.forEach( (note)=> addNewNote(note))};

addButton.addEventListener("click", () => addNewNote());