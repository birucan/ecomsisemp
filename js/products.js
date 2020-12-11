let products = "";
let cart = [];

if (JSON.parse(sessionStorage.getItem("cart"))) cart = JSON.parse(sessionStorage.getItem("cart"));

var addCart = (id, name, imgUrl, price) => {
  let index = cart.findIndex((el) => el.id === id);
  if (index >= 0) cart[index].quantity = parseInt(cart[index].quantity) + 1;
  else {
    product = { id, name, imgUrl, price, quantity: 1 };
    cart.push(product);
  }
  console.log(cart);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  document.querySelector("#cart-length").innerHTML = cart.length;
};
const otraCosa =(desc)=>{
  console.log("llegue desc "+desc);
  $("#myModal").modal();
document.querySelector("#modalDesc").innerHTML=desc
};


db.collection("products")
  .get()
  .then((resp) => {
    resp.forEach((doc) => {
      products += `<div class="col-md-6 col-lg-3">
  <div class="product-item">
    <div class="product-title">
      <a href="#">${doc.data().name}</a>
      </div>
      <div class="product-image">
      <a href="product-detail.html">
      <img src="${doc.data().imgUrl}" alt="Product Image">
      </a>
      <div class="product-action">
      <a onClick="addCart('${doc.id}','${doc.data().name}', '${doc.data().imgUrl}', '${doc.data().price}')"><i class="fa fa-cart-plus"></i></a>
      <a id="myBtn" onClick="otraCosa('${doc.data().desc}')"><i class="fa fa-heart"></i></a>
      </div>
      </div>
      <div class="product-price">
      <h6>Disponibles: ${doc.data().numAvailable}</h6>
      <h5><strong><span>$</span>${parseInt(doc.data().price).toFixed(3)}</h5></strong>
      <a class="btn" onClick="addCart('${doc.id}')"><i class="fa fa-shopping-cart"></i>Buy Now</a>
    </div>
  </div>
</div>`;
    });
    document.querySelector("#products-list").innerHTML = products;
  });
