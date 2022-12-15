class ThemeStore {

    mode = 'light'
    tabBorderTopColor = "rgba(0,0,0,.2)"
    tabBarDisplay = 'flex';
    baseProps = {
        textColor: this.mode === 'light' ? 'black' : 'white',
        bgColor: this.mode === 'light' ? 'white' : 'black',
        borderColor: this.mode === 'light' ? 'black' : 'white',

    }

    setTabBorderTopColor = (value) => {
        this.tabBorderTopColor = value
    }
    setMode = (value) => {
        this.mode = value
    }
    setBaseProps = (value) => {
        this.baseProps = value
    }

    loadThemeForMode = () => {
        this.setBaseProps(
            ...{
                textColor: this.mode === 'light' ? 'black' : 'white',
                bgColor: this.mode === 'light' ? 'white' : 'black',
                borderColor: this.mode === 'light' ? 'black' : 'white',
            }
        )
    }

    toggleMode = () => {
        this.setMode(this.mode === 'light' ? 'dark' : 'light')
        this.loadThemeForMode()
    }
    turnOffTabBar = () => {
        this.tabBarDisplay = 'none'
    }
}

const themeStore = new ThemeStore()
export default themeStore