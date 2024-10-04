class FeedModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.link = data.link;
    this.image_link = data.image_link;
    this.condition = data.condition;
    this.price = data.price;
    this.availability = data.availability;
    this.brand = data.brand;
    this.google_product_category = data.google_product_category;
  }

  toXML() {
    return {
      "g:id": this.id,
      "g:title": this.title,
      "g:description": this.description,
      "g:link": this.link,
      "g:image_link": this.image_link,
      "g:condition": this.condition,
      "g:price": this.price,
      "g:availability": this.availability,
      "g:brand": this.brand,
      "g:google_product_category": this.google_product_category,
    };
  }
}

module.exports = FeedModel;
