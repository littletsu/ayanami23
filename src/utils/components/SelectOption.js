export default class SelectOption {
  constructor(label="SelectOption", value="value", description=null, emoji=null, renDefault=null) {
    this.label = label;
    this.value = value;
    this.description = description;
    if(typeof emoji == "string") {
      this.emoji = {
        id: null,
        name: emoji
      }
    } else {
      this.emoji = emoji;
    }
    this.renDefault = renDefault;
  }
  
  toObject() {
    const { label, value, description, emoji, renDefault } = this;
    return {
      label, value, description, emoji, default: renDefault
    }
  }
}