export default class ActionRow {
  constructor(...initialComponents) {
    if(Array.isArray(initialComponents[0])) this.components = initialComponents[0];
    else this.components = initialComponents;

  }
  
  toObject() {
    let components = this.components.map(component => component.toObject());
    return {
      type: 1,
      components
    }
  }
}