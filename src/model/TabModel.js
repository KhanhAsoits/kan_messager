import {makeAutoObservable} from "mobx";

class TabModel {
    activeTab = 1;

    constructor(props) {
        makeAutoObservable(this)
    }

    setActiveTab = (value) => {
        this.activeTab = value
    }
}

const tabStore = new TabModel()
export default tabStore