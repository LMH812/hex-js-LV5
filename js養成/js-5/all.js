const url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
let allData;
axios.get(url)
.then(response => {
    allData = response.data.data;
    rendon();
    travel();
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
$('#locationSearch').change((e) => {
    let selectVal = e.target.value;
    let arr = [];
    console.log(selectVal);
    let total = '';
    let travel = '';
    allData.forEach((item) => {
        if (selectVal == item.area) {
            arr.push(item);
            total += `本次搜尋共 ${arr.length} 筆資料`
            travel += 
            `
            <div class="card">
                <div class="card-banner">
                    <img src="${item.imgUrl}" alt="">
                    <span>${item.area}</span>
                </div>
                <div class="card-body">
                    <span class="score">${item.rate}</span>
                    <div class="card-header">
                        <h2>${item.name}</h2>
                    </div>
                    <div class="card-txt">
                        ${item.description}
                    </div>
                    <div class="card-footer">
                        <p class="remaining">
                            <ion-icon name="alert-circle"></ion-icon>
                            剩下最後 ${item.group} 組
                        </p>
                        <p class="price">
                            <span>TWD</span>
                            ${item.price}
                        </p>
                    </div>
                </div>
            </div>
            `
        } else if (selectVal == '地區搜尋') {
            travel += 
            `
            <div class="card">
                <div class="card-banner">
                    <img src="${item.imgUrl}" alt="">
                    <span>${item.area}</span>
                </div>
                <div class="card-body">
                    <span class="score">${item.rate}</span>
                    <div class="card-header">
                        <h2>${item.name}</h2>
                    </div>
                    <div class="card-txt">
                        ${item.description}
                    </div>
                    <div class="card-footer">
                        <p class="remaining">
                            <ion-icon name="alert-circle"></ion-icon>
                            剩下最後 ${item.group} 組
                        </p>
                        <p class="price">
                            <span>TWD</span>
                            ${item.price}
                        </p>
                    </div>
                </div>
            </div>
            `
        }
    $('.location').html(travel);
    $('.total').html(total);
    })
})
function travel() {
    let travel = '';
    for(let i = 0; i < allData.length; i++) {
        travel += 
        `
        <div class="card">
            <div class="card-banner">
                <img src="${allData[i].imgUrl}" alt="">
                <span>${allData[i].area}</span>
            </div>
            <div class="card-body">
                <span class="score">${allData[i].rate}</span>
                <div class="card-header">
                    <h2>${allData[i].name}</h2>
                </div>
                <div class="card-txt">
                    ${allData[i].description}
                </div>
                <div class="card-footer">
                    <p class="remaining">
                        <ion-icon name="alert-circle"></ion-icon>
                        剩下最後 ${allData[i].group} 組
                    </p>
                    <p class="price">
                        <span>TWD</span>
                        ${allData[i].price}
                    </p>
                </div>
            </div>
        </div>
        `
    }
    $('.location').html(travel);
}

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

