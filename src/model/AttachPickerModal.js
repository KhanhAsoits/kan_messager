import {makeAutoObservable} from "mobx";

class AttachPickerModal {
    onSend = false

    constructor() {
        makeAutoObservable(this)
    }

    setOnSend = (value) => {
        this.onSend = value
    }
}

const att = new AttachPickerModal()
export default att
