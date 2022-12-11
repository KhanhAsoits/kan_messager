class ThemeStore {

    mode = 'light'
    baseProps = {
        textColor: this.mode === 'light' ? 'black' : 'white',
        bgColor: this.mode === 'light' ? 'white' : 'black',
        borderColor: this.mode === 'light' ? 'black' : 'white',
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
}
const themeStore = new ThemeStore()
export default themeStore