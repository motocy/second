/*
 |--------------------------------------------------------------------------
 | Shards Dashboards: Blog Overview Template
 |--------------------------------------------------------------------------
 */

'use strict';

(function ($) {
  $(document).ready(function () {

    //
    // Blog Overview Users
    //
	
	let ranColor = ['rgba(45,124,233,0.1)','rgba(255,65,105,0.1)','rgba(118,67,151,0.1)','rgba(238,60,70,0.1)'
					,'rgba(14,112,98,0.1)','rgba(88,224,255,0.1)','rgba(253,208,43,0.1)','rgba(163,44,158,0.1)'
					,'rgba(255,90,67,0.1)','rgba(197,225,165,0.1)']
	let ranColor2 = ['rgba(45,124,233,1)','rgba(255,65,105,1)','rgba(118,67,151,1)','rgba(238,60,70,1)'
					,'rgba(14,112,98,1)','rgba(88,224,255,1)','rgba(253,208,43,1)','rgba(163,44,158,1)'
					,'rgba(255,90,67,1)','rgba(197,225,165,1)']
	
	let pointer = document.getElementById('pointer').value
	console.log("포인터: ",pointer)
	let date = document.getElementById('blog-overview-date-range-1')

	const keyData = document.getElementById('keyData').getAttribute('data-list').slice(1, -1).split(", ");
	console.log("keyData:",keyData)
	const dataLists= keyData.map(key => document.getElementById(key).getAttribute('data-list'));

	var updatedArr = dataLists.map(function(item) {
	  try {
	    return JSON.parse(item);
	  } catch (error) {
	    return item.slice(1,-1).split(", ");
	  }
	});
	
	// 날짜형식 변환
	//const dateObj = new Date(date.value);
	//const newDate = dateObj.toISOString().slice(0, 10);
	
	var list_obj={}
	$.each(updatedArr,function(idx,data){
		list_obj[keyData[idx]]=data;
	});
	console.log(list_obj)



	var list_obj_date = {};
	var list_obj_num = {};
	
	$.each(list_obj.DATE, function(idx, data){
	  var key = data.trim().substring(0, 10);
	  list_obj_date[key] = [];
	  list_obj_date[key].push(data.trim());
	});
	
	$.each(list_obj, function(key, value){
	  //if (key === "DATE") return;
	
	  list_obj_num[key] = {};
	
	  $.each(list_obj[key], function(idx, data){
	    var obj_key = list_obj.DATE[idx].trim().substring(0, 10);
	
	    if (!(obj_key in list_obj_num[key])){
	      list_obj_num[key][obj_key] = [];
	    }
	
	    list_obj_num[key][obj_key].push(data);
	  });
	});
	console.log("여기:" ,list_obj_num)
	
	let dateData = Object.keys(list_obj_date)
	
	
    var bouCtx = document.getElementsByClassName('blog-overview-chart')[0];
    
	let labelsArray = Array.from(new Array(700), (_, i) => i + 1);
	
	var bouCtx = document.getElementsByClassName('blog-overview-chart')[0];
	let bouData = { labels: labelsArray, datasets: [] };
	
	for (let i = 0; i < keyData.length; i++) {
	  bouData.datasets.push({
	    label: keyData[i%10],
	    fill: 'start',
	    backgroundColor: ranColor[i%10],
	    borderColor: ranColor2[i%10],
	    pointBackgroundColor: '#ffffff',
	    pointHoverBackgroundColor: ranColor2[i%10],
	    borderWidth: 1.5,
	    pointRadius: 0,
	    pointHoverRadius: 3,
	    data: list_obj_num[keyData[i]][dateData[0]]
	  });
	}
	
    var bouOptions = {
      responsive: true,
      legend: {
        position: 'top'
      },
      elements: {
        line: {
          tension: 0.3
        },
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [{
          scaleLabel: {
        	  display: true,
        	  labelString: '시간'
          },
          gridLines: false, // grid 가 필요할때 지우자
          ticks: {
            callback: function (tick, index) {
              return index % 10 !== 0 ? '' : tick;
            }
          }
        }],
        yAxes: [{
       	  scaleLabel: {
         	  display: true,
         	  labelString: '값'
          },
          gridLines: false, // grid 가 필요할때 지우자
          ticks: {
            suggestedMax: 45,
            callback: function (tick, index, ticks) {
              if (tick === 0) {
                return tick;
              }
              return tick > 999 ? (tick/ 1000).toFixed(1) + 'K' : tick;
            }
          }
        }]
      },
      hover: {
        mode: 'nearest',
        intersect: false
      },
      tooltips: {
        custom: false,
        mode: 'nearest',
        intersect: false
      }
    };
	
    window.BlogOverviewChart = new Chart(bouCtx, {
      type: 'LineWithLine',
      data: bouData,
      options: bouOptions
    });

    var aocMeta = BlogOverviewChart.getDatasetMeta(0);
    aocMeta.data[0]._model.radius = 0;
    aocMeta.data[bouData.datasets[0].data.length - 1]._model.radius = 0;

    window.BlogOverviewChart.render();
	    
	
	let hiddenStatus = bouData.datasets.map(dataset => false); // 초기값: 모든 데이터가 보이는 상태
    
	var buttons = document.getElementsByClassName('myButton');
	Array.from(buttons).forEach(function(button, idx) {
	  button.addEventListener('click', function() {
	    $(this).toggleClass('btn-light');
	    bouData.datasets[idx].hidden = !bouData.datasets[idx].hidden;
	    hiddenStatus[idx] = bouData.datasets[idx].hidden; // hiddenStatus 배열 업데이트
	
	    let visibleDataLength = bouData.datasets
	        .map((dataset, idx) => ({hidden: dataset.hidden, idx: idx}))
	        .filter(obj => !obj.hidden)
	        .map(obj => bouData.datasets[obj.idx].data.length)
	        .reduce((acc, cur) => Math.max(acc, cur), 0); // 숨겨지지 않은 데이터의 길이 중 가장 큰 값 구하기
	
	    dataLength = visibleDataLength; // dataLength 변수 업데이트
	    bouData.labels = Array.from(new Array(dataLength), (_, i) => i + 1); // labels 배열 재생성
	
	    BlogOverviewChart.update();
	  });
	});
	

  });
})(jQuery);

	 
/*
	'rgba(118,67,151,0.1)'  보라색 
	'rgba(238,60,70,0.1)'   빨간색 
	'rgba(14,112,98,0.1)'   청록색 
	'rgba(88,224,255,0.1)'  하늘색 
	'rgba(253,208,43,0.1)'  노란색 
	'rgba(163,44,158,0.1)'  보라색 
	'rgba(255,90,67,0.1)'   주황색
	'rgba(197,225,165,0.1)' 연두색 
	'rgba(45,124,233,0.1)'  파란색 
	'rgba(255,65,105,0.1)'  분홍색 
*/