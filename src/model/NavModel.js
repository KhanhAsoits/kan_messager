import {makeAutoObservable} from "mobx";

class NavModel {
    appNav = null

    constructor(props) {
        makeAutoObservable(this)

    }

    setAppNav = (val) => {
        this.appNav = val
    }

}

const navModel = new NavModel()
export default navModel