<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/header.jsp" %>

<!-- Style -->
<style>
.input-group-append {
	cursor:pointer;}
</style>
<!-- End Style -->

<!-- Script -->
<script>
$(document).ready(function(){
	$('button[id^=myButton]').each(function(idx){
		$(this).click(function() {
		    $(this).toggleClass('btn-light');
		    bouData.datasets[idx].hidden = !bouData.datasets[idx].hidden;
		    BlogOverviewChart.update();
		});
	});
	$('#register').click(function(){
		$('.modal').modal('show')
	})
    $("#submitButton").click(function () {
        console.log("클릭함")
        var data = $("#insert")[0]
        var formData = new FormData(data);

        $.ajax({
          type: "post",
          url: "http://127.0.0.1:5000/insert",
          dataType: "json",
          contentType: false,
          processData: false,
          data: formData,
          success(result) {
            console.log(result)
          }
        });
      });
	
	var data1_list= [123,150,200,300,500,400,800,210,700,800];
	var data2_list= [50,60,70,80,90,100,115,80,130,160,300,77];
	 
	// chart 생성
	$('#blog-overview-date-range').datepicker({});
    var bouCtx = document.getElementsByClassName('blog-overview-chart')[0];
    var bouData = {
      labels: Array.from(new Array(30), function (_, i) {
        return i === 0 ? 1 : i; 
      }),
	  datasets: [{
		      label: '경사 데이터',
		      fill: 'start',
		      data: data1_list,
		      backgroundColor: 'rgba(0,123,255,0.1)',
		      borderColor: 'rgba(0,123,255,1)',
		      pointBackgroundColor: '#ffffff',
		      pointBackgroundColor: 'rgb(0,123,255)',
		      borderWidth: 1.5,
		      pointRadius: 0,
		      pointHoverRadius: 3
		    }, {
		      label: '위치 데이터',
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
              //return index % 7 !== 0 ? '' : tick;
              return tick;
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
	
    $(".input-group-append").click(function(){
    	var startDate = $("#blog-overview-date-range-1").val()
    	var endDate = $("#blog-overview-date-range-2").val()
    	console.log("버튼이눌렸어", startDate, endDate)
    })
    
})
</script>
<!-- End Script -->

<!-- Page Header -->
<div class="page-header row no-gutters py-4">
  <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
    <span class="text-uppercase page-subtitle">Detail</span>
    <h3 class="page-title text-bold">상세 화면</h3>
  </div>
</div>
<!-- End Page Header -->

<!-- Body -->
<body class="h-100">
	<div class="container-fluid">
		<div class="main-content-container container-fluid px-4">
			<div class="row">
				<!-- Chart Stats -->
				<div class="col-lg-8 col-md-12 col-sm-12 mb-4">
					<div class="card card-small">
						<div class="card-header border-bottom">
							<h5 class="m-0">차트</h5>
						</div>
						<div class="card-body pt-0">
							<div class="row border-bottom py-2 bg-light">
								<div class="col-12 col-sm-6">
									<div id="blog-overview-date-range" class="input-daterange input-group input-group-sm my-auto ml-auto mr-auto ml-sm-auto mr-sm-0" style="max-width: 350px;">
										<input type="text" class="input-sm form-control" name="start" placeholder="Start Date" id="blog-overview-date-range-1">
										<input type="text" class="input-sm form-control" name="end" placeholder="End Date" id="blog-overview-date-range-2">
										<span class="input-group-append">
											<span class="input-group-text">
												<i class="material-icons"></i>
											</span>
										</span>
									</div>
								</div>
							</div>
							<canvas height="130" style="max-width: 100% !important;" class="blog-overview-chart"></canvas>
						</div>
					</div>
				</div>
				<!-- End Chart Stats -->
				
        		<!-- Button -->
        		<div class="col-lg-4">
					<div class="card mb-3">
						<div class="card-body pt-3 pb-3">
							<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-secondary col-lg-12 mb-0 btn-lg btn-block">등 록</button>
						</div>
					</div>
					<div class="card">
						<div class="card-header pt-3 pb-3">
							<h5 class="card-title mb-0">차트 데이터 선택</h5>
						</div>
						<div class="card-body pt-3 pb-3">
							<h6 class="card-subtitle mb-2 text-muted">데이터를 선택하여 필요한 데이터만 보실 수 있습니다.</h6>
							<div role="group" aria-label="Small button group">
								<c:forEach var="good" items="${list}">
								</c:forEach>
									<button type="button" class="btn btn-secondary" id="myButton">경사 데이터</button>
									<button type="button" class="btn btn-secondary" id="myButton">위치 데이터</button>
								
							</div>
						</div>
					</div>
				</div>
				<!-- End Button -->
				
				<!-- List -->
				<div class="row pl-3">
					<div class="col-12 col-lg-12 col-xxl-12 d-flex">
						<div class="card flex-fill">
							<div class="card-header pl-3">
								<h5 class="mb-0">데이터</h5>
							</div>
							
							<table class="table table-hover my-0">
								<thead>
									<tr>
										<th>Name</th>
										<th class="d-none d-xl-table-cell">Start Date</th>
										<th class="d-none d-xl-table-cell">End Date</th>
										<th class="d-none d-md-table-cell">Assignee</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Project Apollo</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">Vanessa Tucker</td>
										<td><span class="badge bg-success">Done</span></td>
									</tr>
									<tr>
										<td>Project Fireball</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">William Harris</td>
										<td><span class="badge bg-danger">Cancelled</span></td>
									</tr>
									<tr>
										<td>Project Hades</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">Sharon Lessman</td>
										<td><span class="badge bg-success">Done</span></td>
									</tr>
									<tr>
										<td>Project Nitro</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">Vanessa Tucker</td>
										<td><span class="badge bg-warning">In progress</span></td>
									</tr>
									<tr>
										<td>Project Phoenix</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">William Harris</td>
										<td><span class="badge bg-success">Done</span></td>
									</tr>
									<tr>
										<td>Project X</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">Sharon Lessman</td>
										<td><span class="badge bg-success">Done</span></td>
									</tr>
									<tr>
										<td>Project Romeo</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">Christina Mason</td>
										<td><span class="badge bg-success">Done</span></td>
									</tr>
									<tr>
										<td>Project Wombat</td>
										<td class="d-none d-xl-table-cell">01/01/2021</td>
										<td class="d-none d-xl-table-cell">31/06/2021</td>
										<td class="d-none d-md-table-cell">William Harris</td>
										<td><span class="badge bg-warning">In progress</span></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!-- End List -->
				
			</div>
		</div>
	</div>
</body>
<!-- End Body -->

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-xl">
  	<form id="insert" enctype="multipart/form-data">
	    <div class="modal-content">
	      <div class="modal-header">
	        <!-- Modal Header -->
	        <div class="page-header row no-gutters py-4">
			  <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
			    <span class="text-uppercase page-subtitle">Register</span>
			    <h3 class="page-title text-bold">등록 페이지</h3>
			  </div>
			</div>
			<!-- End Modal Header -->
	      </div>
	      <div class="modal-body">
			<!-- Modal Body -->
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-lg-12">
						<div class="card">
							<div class="card-body pt-3 pb-0"> 
								<label for="name" class="col-lg-4">성명</label>
								<input type="text" class="col-lg-6" name="name" placeholder="성명">
							</div>
							<div class="card-body pt-3 pb-0">
								<label for="phone" class="col-lg-4">전화번호</label>
								<input type="tel" class="col-lg-6" name="phone" placeholder="전화번호">
							</div>
							<div class="card-body pt-3 pb-0">
								<label for="email" class="col-lg-4">이메일주소</label>
								<input type="email" class="col-lg-6" name="email" placeholder="이메일 주소">
							</div>
							<div class="card-body pt-3 pb-3">
								<label for="password" class="col-lg-4">비밀번호</label>
								<input type="password" class="col-lg-6" name="password" placeholder="비밀번호">
							</div>
						</div>
						<div class="card">
							<div class="card-body pt-3 pb-0">
								<label for="uploadFile" class="col-lg-3"><b>파일첨부</b></label>
								<input type="file" class="col-lg-8" name="file[]" multiple>
								<span class="col-lg-12">파일첨부시 확장자가 'tilt'인 것과</span><br>
								<span class="col-lg-12">아닌 것 으로 구분하세요</span>
								<div class="uploadResult" id="uploadResult">
									<ul></ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- End Modal Body -->
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
	        <button type="button" class="btn btn-primary" id="submitButton">저장</button>
	      </div>
	    </div>
    </form>
  </div>
</div>
<!-- End Modal -->

<%@ include file="../include/footer.jsp" %>