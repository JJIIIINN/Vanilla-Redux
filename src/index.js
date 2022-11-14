import { createStore } from "redux"

const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD = "ADD"
const MINUS = "MINUS"

const addToDo = (text) => {
    return {
        type: ADD,
        text
    }
}

const deleteToDo = (id) => {
    return {
        type: MINUS,
        id
    }
}

const countModifier = (count = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...count]
        case MINUS:
            return count.filter(toDo => toDo.id !== action.id)
        default:
            return count
    }
}

const countStore = createStore(countModifier)

countStore.subscribe(() => {
    console.log(countStore.getState())
})

const dispatchAddToDo = (text) => {
    countStore.dispatch(addToDo(text))
}

const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id)
    countStore.dispatch(deleteToDo(id))
}

const paintToDos = () => {
    const toDos = countStore.getState()
    ul.innerHTML = ""
    toDos.forEach(toDo => {
        const li = document.createElement("li")
        const btn = document.createElement("button")
        btn.innerText = "DEL"
        btn.addEventListener("click", dispatchDeleteToDo)
        li.id = toDo.id
        li.innerText = toDo.text
        li.appendChild(btn)
        ul.appendChild(li)
    })
}

countStore.subscribe(paintToDos)

const onSubmit = e => {
    e.preventDefault()
    const toDo = input.value
    input.value = ""
    dispatchAddToDo(toDo)
}
form.addEventListener("submit", onSubmit)