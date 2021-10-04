export default class Button {
  constructor(label="Button", id="button", emoji=null, style=1) {
    this.label = label;
    this.custom_id = id;
    this.style = style;
    if(typeof emoji == "string") {
      this.emoji = {
        id: null,
        name: emoji
      }
    } else {
      this.emoji = emoji;
    }
  }
  
  toObject() {
    const { label, custom_id, style, emoji } = this;
    return {
      label, custom_id, style, emoji, type: 2
    }
  }
}