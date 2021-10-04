export default class SelectMenu {
  constructor(id="select_menu", placeholder="Placeholder", ...selectOptions) {
    this.custom_id = id;
    this.placeholder = placeholder;
    if(Array.isArray(selectOptions[0])) this.options = selectOptions[0];
    else this.options = selectOptions;
    this.min_values = 1;
    this.max_values = 1;
  }
  
  toObject() {
    const options = this.options.map(option => option.toObject());
    const { custom_id, placeholder, min_values, max_values } = this;
    return {
      type: 3, custom_id, placeholder, min_values, max_values, options
    }
  }
}