//boilerplate class used for the read more / read less function of a text

let string1 = "Hello all, this is the new beta release of "
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
    `${string1} Freakstagram, by Freakbook Inc. Enjoy! (We apologize for any inconveniences with the app) <span class='textToggle'> <u>read less</u> </span>`,
    `${string1} <span class='textToggle'> <u>read more</u> </span>`
);
textToggler.initialize();
export {TextToggler}