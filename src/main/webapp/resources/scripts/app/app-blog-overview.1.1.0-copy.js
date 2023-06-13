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
	let firstData = []
	let chartList=[]
	let keys=[]
	$.get("/getDataList?pointer="+pointer, function(dataList){
	    for (const key in dataList[0]) {  keys.push(key)  }
	    for(let v=0;v<keys.length;v++){
	    	chartList=[]
	    	for(let i=0;i<dataList.length;i++){
	    		for(let j=1;j<32;j++){
	    			const dateArray = dataList[i].DATE.split('-');
		    		const date = Number(dateArray[2]);
		    		if(date === j){
		    	    	chartList.push(dataList[i][keys[v]])
		    	    }
	    		}
	    		
		    }
		    firstData.push(chartList)
	    }
	    
	    
	    for (let i = 0; i < dataList.length; i++) {
		    const dateArray = dataList[i].DATE.split('-'); // ex) 2022-05-31을 ['2022', '05', '31']로 나누기
		    const date = Number(dateArray[2]); // 날짜 정보 추출 (day)
		    if (date === 31) { // 해당 day가 31인 데이터만 추출
		        list.push(dataList[i]);
		    }
		}
	    
	    
	    
	    
	    
	    console.log("확인값: ", Number(dataList[0]['DATE'].substr(8, 2)))
	    var data1_list= [123,150,200,300,500,400,800,210,700,800];
		var data2_list= [50,60,70,80,90,100,115,80,130,160,300,77];
		
		var buttons = document.getElementsByClassName('myButton');
		Array.from(buttons).forEach(function(button, idx){
		  button.addEventListener('click', function() {
		    $(this).toggleClass('btn-light');
		    bouData.datasets[idx].hidden = !bouData.datasets[idx].hidden;
		    BlogOverviewChart.update();
		  });
		});
		
	    var bouCtx = document.getElementsByClassName('blog-overview-chart')[0];
	    
	    var bouData = {
	      labels: Array.from(new Array(30), function (_, i) {
	        return i === 0 ? 1 : i; 
	      }),
		  datasets: [{
		      label: keys[0],
		      fill: 'start',
		      data: data1_list,
		      backgroundColor: 'rgba(0,123,255,0.1)',
		      borderColor: 'rgba(0,123,255,1)',
		      pointBackgroundColor: '#ffffff',
		      pointHoverBackgroundColor: 'rgb(0,123,255)',
		      borderWidth: 1.5,
		      pointRadius: 0,
		      pointHoverRadius: 3
		    }, {
		      label: keys[2],
		      fill: 'start',
		      data: data2_list,
		      backgroundColor: 'rgba(255,65,105,0.1)',
		      borderColor: 'rgba(255,65,105,1)',
		      pointBackgroundColor: '#ffffff',
		      pointHoverBackgroundColor: 'rgba(255,65,105,1)',
		      borderDash: [3, 3],	
		      borderWidth: 1,
		      pointRadius: 0,
		      pointHoverRadius: 2,
		      pointBorderColor: 'rgba(255,65,105,1)'
		    }]
	  		  };
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
	        	  labelString: '날짜'
	          },
	          gridLines: false, // grid 가 필요할때 지우자
	          ticks: {
	            callback: function (tick, index) {
	              return tick;  // index % 7 !== 0 ? '' : tick;
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
	    
	}, "json");
	
	
	
	

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