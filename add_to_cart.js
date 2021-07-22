// $(document).ready(function(){
    
var cart = {};

function renderBody(itemid, selector = ".row") {
    const item_html = `<div class="col" style="margin-bottom:10px;">
                            <div class="card" style="width: 18rem; margin:0 auto;">
                            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                <img src="https://via.placeholder.com/150" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                <img src="https://via.placeholder.com/150" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                <img src="https://via.placeholder.com/150" class="d-block w-100" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            </div>
                            <div class="card-body">
                            <div class="d-flex flex-column justify-content-center">
                                <h5 class="card-title" style="text-align: center; margin:3px;">${itemid}</h5>
                                <button id="AddCart" class="btn btn-outline-success" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click!" style="margin:30px;"><i class="fas fa-cart-plus"></i> Add to cart.</button>
                            </div>
                            </div>
                        </div>    
                    </div>`;
    document.querySelector(selector).insertAdjacentHTML('beforeend', item_html);
}

function minus(ele){
    var itemid = $(ele).parents().siblings("p").text();
    cart[itemid] -= 1;
    if (cart[itemid]<1){
        $(ele).closest(".row").innerHTML = '';
        $(ele).closest(".row").remove();
        delete cart[itemid];
        if (Object.entries(cart).length === 0){
            $("#ShopCartBody").empty();
            const cart_html = `<p>Nothing in your cart.</p>`;
            document.querySelector("#ShopCartBody").insertAdjacentHTML('beforeend', cart_html);
        }
        
    }else{
        $(ele).siblings("input").attr("placeholder",cart[itemid]);
    }
    console.log($(ele));

}

    
function plus(ele){
    var itemid = $(ele).parents().siblings("p").text();
    // console.log(itemid); 
    cart[itemid] += 1;
    $(ele).siblings("input").attr("placeholder",cart[itemid]);
    // console.log(cart);
}

for (var i=1; i<5; i++){
    renderBody(itemid = i);
}

$( ".btn.btn-outline-success" ).click(function(){
    var item = $(this).siblings("h5").text();
    if (item in cart){
        cart[item] += 1;
    }else{
        cart[item] = 1;
    }
    console.log(cart);

    $('.toast').toast('show');
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    });
var toastElList = [].slice.call(document.querySelectorAll('.toast hide'))
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, option)
    });

$("#ShopCartBtn").click(function(){
    $("#ShopCartBody")[0].innerHTML = '';
    if (Object.entries(cart).length === 0){
        const cart_html = `<p>Nothing in your cart.</p>`;
        document.querySelector("#ShopCartBody").insertAdjacentHTML('beforeend', cart_html);
    }else{
        Object.keys(cart).forEach(key => {
            const cart_html = `<div class="row" style="margin-bottom:10px;">
            <div class="col-5">
                <div class="container">
                    <img src="https://via.placeholder.com/150" style="margin: 0 auto;" alt="...">
                </div>
            </div>
            <div class="col-5">
                <p>${key}</p>
                <div class="input-group mb-3 ">
                    <button class="btn btn-outline-secondary" type="button" id="btn-minus" onclick="minus(this)">-</button>
                    <input type="text" class="form-control" placeholder="${cart[key]}" aria-label="Example text with button addon" aria-describedby="button-addon1">
                    <button class="btn btn-outline-secondary" type="button" id="btn-add" onclick="plus(this)">+</button>
                </div>
            </div>
            </div>`;
        
        document.querySelector("#ShopCartBody").insertAdjacentHTML('beforeend', cart_html);
        
        });
        const pay_html = `<div class="row" style="margin-top:30px;">
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-secondary btn-lg" style="width:50%;">訂單結帳</button>
        </div>
        </div>`
        document.querySelector("#ShopCartBody").insertAdjacentHTML('beforeend', pay_html);
    }
}
    
);

    




// });


