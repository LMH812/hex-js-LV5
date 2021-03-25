const url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
let allData;
axios.get(url)
.then(response => {
    allData = response.data.data;
    // console.log(response);
    rendon();
    traveled(allData);
    chartData();
})
.catch(err => {
    alert('伺服器錯誤，請重新整理');
})
let data = [];

function rendon() {
    allData.forEach(item => {
        data.push(item)
    });
    let location = '';
    location = `<option value="全部地區">全部地區</option>`;
    for (let i = 0; i < data.length; i++) {
        location += `<option value="${data[i].area}">${data[i].area}</option>`
    }
    $('#locationSearch').append(location);
}
function traveled(e) {
    let travel = '';
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
    
    $('.location').html(travel);
}
//選到地區搜尋 不加total
$('#locationSearch').change((e) => {
    let selectVal = e.target.value;
    let arr = [];
    let total = '';
    allData.forEach(item => {
        if (selectVal == item.area) {
            arr.push(item);
        } else if (selectVal == '全部地區' || selectVal == '地區搜尋') {
            arr.push(item);
        }
    })
    if (selectVal !== '地區搜尋') {
        total = `本次搜尋共 ${arr.length} 筆資料`;
    }
    $('.total').text(total);
    traveled(arr);
})

$('.submit').click(() => {
    let updateData = {};
    updateData.name = $('#ticketName').val();
    updateData.imgUrl = $('#imgName').val();
    updateData.area = $('#location').val();
    updateData.price = $('#ticketPrice').val();
    updateData.group = $('#ticketGroup').val();
    updateData.rate = $('#ticketRate').val();
    updateData.description = $('#ticketDiscription').val();
    allData.push(updateData);
    traveled(allData);
    $('#ticketName').val("");
    $('#imgName').val("");
    $('#location').val("");
    $('#ticketPrice').val("");
    $('#ticketGroup').val("");
    $('#ticketRate').val("");
    $('#ticketDiscription').val("");
})
// 篩選資料變陣列 [['高雄', 數量],['台中', 數量],['台北', 數量]]
function chartData() {
    let chartData = {};
    allData.forEach(item => {
        if (chartData[item.area] == undefined) {
            chartData[item.area] = 1;
        } else {
            chartData[item.area] += 1;
        }
    })
    let newChartData = [];
    let areaTitle = Object.keys(chartData);
    areaTitle.forEach(item => {
        let chartColumns = [];
        chartColumns.push(item)
        chartColumns.push(chartData[item])
        newChartData.push(chartColumns)
    })
    c3.generate({
        bindto: '.chart',
        data: {
        columns: newChartData,
        type: 'donut',
        },
        donut: {
            label: {
                show:false,
            },
            title: "套票地區比重",
            width: 20,
        }
    });
    
}
// 寄不出去
// $('.form-btn').click(function(e) {
//     e.preventDefault();
//     let ticketName = $('#ticketName').val().trim()
//     let imgName= $('#imgName').val().trim()
//     let location= $('#location').val().trim()
//     let ticketPrice = $('#ticketPrice').val().trim()
//     let ticketGroup = $('#ticketGroup').val().trim()
//     let ticketRate= $('#ticketRate').val().trim()
//     let ticketDiscription = $('#ticketDiscription').val().trim()
//     axios({
//         method: 'post',
//         url: url,
//         data: {
//             name: ticketName,
//             imgUrl: imgName,
//             area: location,
//             description: ticketDiscription,
//             group: ticketGroup,
//             price: ticketPrice,
//             rate: ticketRate,
//         }
//     })
// })
