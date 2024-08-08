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
    "Hello all, this web app is a little project I made a few years ago for last year's ACE showcase and am now officially hosting for some time. I have not finished this project and will likely not in the future unfortunately as I have moved on to tackling different projects that I will release in the upcoming future. For any comp sci or coding enthusiasts,  this specific project public on my github @ieatyoursushi repository: chatthread_api. Enjoy! (questions or concerns): gabewkung@ucsb.edu) <span class='textToggle'> <u>read less</u> </span>",
    "Hello all, this web app is a little project I made a few years ago for last year's ACE showcase and am now officially hosting for some time. I have not finished this project and will likely not in the future unfortunately <span class='textToggle'> <u>read more</u> </span>"
);
textToggler.initialize();
export {TextToggler}