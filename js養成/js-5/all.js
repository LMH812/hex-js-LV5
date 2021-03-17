const url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
let allData;
axios.get(url)
.then(response => {
    allData = response.data.data;
    rendon();
    traveled(allData);
})
let data = [];
function rendon() {
    allData.forEach(item => {
        data.push(item)
    });
    let location = '';
    for (let i = 0; i < data.length; i++) {
        location = `<option value="${data[i].area}">${data[i].area}</option>`
        $('#locationSearch').append(location)
    }
    // travel();
}
function traveled(e) {
    let travel = '';
    let total = `本次搜尋共 ${e.length} 筆資料`;
    for(let i = 0; i < e.length; i++) {
        travel += 
        `
        <div class="card">
            <div class="card-banner">
                <img src="${e[i].imgUrl}" alt="">
                <span>${e[i].area}</span>
            </div>
            <div class="card-body">
                <span class="score">${e[i].rate}</span>
                <div class="card-header">
                    <h2>${e[i].name}</h2>
                </div>
                <div class="card-txt">
                    ${e[i].description}
                </div>
                <div class="card-footer">
                    <p class="remaining">
                        <ion-icon name="alert-circle"></ion-icon>
                        剩下最後 ${e[i].group} 組
                    </p>
                    <p class="price">
                        <span>TWD</span>
                        ${e[i].price}
                    </p>
                </div>
            </div>
        </div>
        `
    }
    $('.total').text(total)
    $('.location').html(travel);
}

$('#locationSearch').change((e) => {
    let selectVal = e.target.value;
    let arr = [];
    allData.forEach(item => {
        if (selectVal == item.area) {
            arr.push(item)
        } else if (selectVal == '地區搜尋') {
            arr.push(item);
        }
    })
    traveled(arr);
})

$('.submit').click(()=> {
    let updateData = {};
    updateData.name = $('#ticketName').val();
    updateData.imgUrl = $('#imgName').val();
    updateData.area = $('#location').val();
    updateData.price = $('#ticketPrice').val();
    updateData.group = $('#ticketGroup').val();
    updateData.rate = $('#ticketRate').val();
    updateData.description = $('#ticketDiscription').val();
    allData.push(updateData);
    console.log(allData);
    travel();
    $('#ticketName').val() = '';
    $('#imgName').val() = '';
    $('#location').val() = '';
    $('#ticketPrice').val() = '';
    $('#ticketGroup').val() = '';
    $('#ticketRate').val() = '';
    $('#ticketDiscription').val() = '';
}) 

