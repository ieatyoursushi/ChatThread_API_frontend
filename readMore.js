//boilerplate class used for the read more / read less function of a text
class TextToggler {
    constructor(textElement, textToggle, textToggleAtt, readMode, expandedText, collapsedText) {
        this.textElement = textElement;
        this.textToggle = textToggle;
        this.textToggleAtt = textToggleAtt;
        this.readMode = readMode;
        this.expandedText = expandedText;
        this.collapsedText = collapsedText;
    }
    toggleText() {
        try {
            this.readMode = !this.readMode;
            console.log(this.readMode);
            if (this.readMode) {
                this.textElement.innerHTML = this.expandedText;
                this.textToggle = document.querySelector(this.textToggleAtt);
            } else {
                this.textElement.innerHTML = this.collapsedText;
                this.textToggle = document.querySelector(this.textToggleAtt);
            }
            this.textToggle.addEventListener("click", () => this.toggleText());
        } catch (error) {
            console.error(error);
        }
    }
    initialize() {
        this.textToggle.addEventListener("click", () => this.toggleText());
        this.textToggle.click();
    }
}
//new textToggler(HtmlElement textElement, HtmlElement readMoreSpan, String textToggleAtt, boolean readMode, String openString, String closeString).initialize();
const textToggler = new TextToggler(
    document.getElementById("disclai"),
    document.querySelector(".textToggle"),
    ".textToggle",
    true,
    "Experience the convenience of automatically updated content on this web app by enabling live-post mode, which allows you to access the latest posts as they are added by others without the inconvinience of refreshing. <span class='readMore'>Keep in mind that this feature may cause some performance issues on mobile devices and may result in the occurrence of bugs or even a crash. However, if you choose not to enable this feature, the web application will still function like a standard comments section. <span class='textToggle'> <u>read less</u> </span>",
    "Experience the convenience of automatically updated content on this web app by enabling live-post mode, which allows you to access the latest posts as they are added by others without the inconvinience of refreshing. <span class='textToggle'> <u>read more</u> </span>"
);
textToggler.initialize();
export {TextToggler}