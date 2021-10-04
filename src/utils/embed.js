export default class Embed {
  constructor(title, description, color) {
    this.title = title;
    this.description = description;
    this.color = color;
    this.thumbnail = { url: null };
    this.fields = [];
    this.author = { name: null, url: null, icon_url: null };
    this.footer = { text: null };
    this.image = { url: null };
  }
  
  toObject() {
    let { title, description, color, fields, author, footer, thumbnail, image } = this;
    
    return {
      title, description, color, fields, author, footer, thumbnail, image
    }
  }
  
  pushField(name, value, inline=false) {
    this.fields.push({ 
      name, value, inline
    })
  }

  randomColor() {
    this.color = Math.floor(Math.random()*16777215);
  }
}