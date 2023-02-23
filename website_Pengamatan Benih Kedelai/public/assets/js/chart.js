//fungsi chart
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
    }

//chart suhu
var ctx_suhu = document.getElementById('chart_suhu').getContext('2d');
var chart_suhu = new Chart(ctx_suhu, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: [],
            backgroundColor: [
                'rgba(123,63,0, 1)'
            ],
            borderColor: [
                'rgba(123,63,0, 0.7)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{legend:{display: false}},
        scales: {
        y:{beginAtZero: true},
        x:{ticks: {display: false}},
        }
    }
    });

var valueRef = firebase.database().ref('DHT11').limitToLast(20);
valueRef.on('child_added', (snapshot) => {
    var list_suhu = snapshot.val();
    var suhu = list_suhu;
    var list_suhu1 = parseFloat(list_suhu.replace('°C',''))
    addData(chart_suhu, suhu, list_suhu1);
});

//chart intensitas Cahaya
var ctx = document.getElementById('chart_cahaya').getContext('2d');
var chart_cahaya = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Intensitas',
            data: [],
            backgroundColor: [
                'rgba(123,63,0, 1)'
            ],
            borderColor: [
                'rgba(123,63,0, 0.7)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{legend:{display: false}},
        scales: {
        y:{beginAtZero: true},
        x:{ticks: {display: false}},
        }
    }
    });

var valueRef = firebase.database().ref('/Sensor Light Intensity/Cahaya').limitToLast(20);
valueRef.on('child_added', (snapshot) => {
    var time = snapshot.val();
    var temperature = time;
    var newStr = parseFloat(time.replace(' lx',''))
    addData(chart_cahaya, temperature, newStr);
});

//chart kondisi cahaya
var ycahaya = {
    1 : 'Gelap',
    2 : 'Terang',
}
var ctx_kondisicahaya = document.getElementById('chart_kondisicahaya').getContext('2d');
var chart_kondisicahaya = new Chart(ctx_kondisicahaya, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'kondisi',
            data: [],
            backgroundColor: [
                'rgba(123,63,0, 1)'
            ],
            borderColor: [
                'rgba(123,63,0, 0.7)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{legend:{display: false}},
        scales: {
        y:{beginAtZero: true,
            ticks: {
            callback: function(value) {
                return ycahaya[value];}
        }},
        x:{ticks: {display: false}},
        }
    }
    });

var valueRef = firebase.database().ref('/Sensor Light Intensity/Kondisi').limitToLast(20);
valueRef.on('child_added', (snapshot) => {
    var list_kondisicahaya = snapshot.val();
    var kondisicahaya = list_kondisicahaya;
    if (list_kondisicahaya == "Gelap"){
        var new_kondisicahaya = 1
    }
    else{
        var new_kondisicahaya = 2
    }
    addData(chart_kondisicahaya, kondisicahaya, new_kondisicahaya);
});

//chart tanah
var ctx = document.getElementById('chart_tanah').getContext('2d');
var chart_tanah = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Kelembaban',
            data: [],
            backgroundColor: [
                'rgba(123,63,0, 1)'
            ],
            borderColor: [
                'rgba(123,63,0, 0.7)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{legend:{display: false}},
        scales: {
        y:{beginAtZero: true},
        x:{ticks: {display: false}},
        }
    }
    });

var valueRef = firebase.database().ref('/Sensor Soil Moisture/Kelembaban Tanah').limitToLast(20);
valueRef.on('child_added', (snapshot) => {
    var time = snapshot.val();
    var temperature = time;
    var newStr = parseFloat(time.replace('%',''))
    addData(chart_tanah, temperature, newStr);
});

//chart kondisi tanah
var yLabels = {
    1 : 'Media Kering',
    2 : 'Media Basah',
}
var ctx_kondisi = document.getElementById('chart_kondisitanah').getContext('2d');
var chart_kondisitanah = new Chart(ctx_kondisi, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'kondisi',
            data: [],
            backgroundColor: [
                'rgba(123,63,0, 1)'
            ],
            borderColor: [
                'rgba(123,63,0, 0.7)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{legend:{display: false}},
        scales: {
        y:{beginAtZero: true,
            ticks: {
            callback: function(value, index, values) {
                return yLabels[value];}
        }},
        x:{ticks: {display: false}},
        }
    }
    });

var valueRef = firebase.database().ref('/Sensor Soil Moisture/Kondisi').limitToLast(20);
valueRef.on('child_added', (snapshot) => {
    var list_kondisi = snapshot.val();
    var kondisitanah = list_kondisi;
    if (list_kondisi == "Tanah Kering"){
        var new_kondisi = 1
    }
    else{
        var new_kondisi = 2
    }
    addData(chart_kondisitanah, kondisitanah, new_kondisi);
});