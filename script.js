const subcontainer = document.querySelector(".sub-cont");
const allSeats = document.querySelectorAll(".row .seat");
const movieSelect = document.getElementById("movie");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
let reservedSeats = [];
let selSeatCount = 0;
let movieValue = 0;

//LOCAL STORAGE YAPISI, {KEY : VALUE}
const data = {
    1: {"reserved": [12, 16, 21, 19], "value": 20},
    2: {"reserved": [15, 12, 1, 34], "value": 22},
    3: {"reserved": [1, 16, 18, 33], "value": 25}
};
// local storage içerisine data set edilir.
for (const key in data) {
    localStorage.setItem(key, JSON.stringify(data[key]));
}

//film seçilmemişse tüm seatler reserved olsun.
for(seat of allSeats){
    seat.classList.add("reserved");
}


movieSelect.addEventListener("change", (event) => {
    //film değiştirme işlemi yapılırsa seatlerin classlarını kaldır.
    for(seat of allSeats){
        seat.classList.remove("selected");
        seat.classList.remove("reserved");
    }
    const selectedOption = event.target.selectedOptions[0];
    updateStatus(selectedOption);
});

const updateStatus = (selectedMovie) =>{
    selSeatCount = 0; // dropdown'dan seçimlerde selected seat 0'lansın.
    seatCountInfos();
    payment();

    if(localStorage.getItem(`${selectedMovie.id}`) != null){
        var storedData = JSON.parse(localStorage.getItem(`${selectedMovie.id}`));
        // "reserved" kısmına erişmek için
        reservedSeats = storedData.reserved;
        // "value" kısmına erişmek için
        movieValue = storedData.value;
    }

    if (reservedSeats.length != 0){
        for(seat of reservedSeats){
            allSeats[seat].classList.add("reserved");
        }
    }
}

subcontainer.addEventListener("click",(e) =>{
    if(e.target.classList.contains("seat")){
        if(!e.target.classList.contains("reserved")){

            if(!e.target.classList.contains("selected")){
                e.target.classList.add("selected");
                selSeatCount++;
                seatCountInfos();
                payment()
            }
            else if(e.target.classList.contains("selected")){
                e.target.classList.remove("selected");
                selSeatCount--;
                seatCountInfos();
                payment();
            }
        }
    }
});

const seatCountInfos = () =>{
    count.innerText = selSeatCount;  
}

const payment = () =>{
    amount.innerText = movieValue * selSeatCount;
}