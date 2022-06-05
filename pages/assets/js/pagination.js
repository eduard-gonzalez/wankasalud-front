var total_records;
var perpage = 6;
var total_pages;

$(document).ready(function(){
	var pagenum = 1;
    
    createpagination(pagenum);
	fetch_data(perpage,pagenum);
    $(document).on('click','.totop',function(event) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
     });

});

function createpagination(pagenum){
    $.ajax({
        type:'get',
        url:'https://wankasalud.com/admin/api/video_data',
        dataType:'json',
        success:function(data){
            
            total_records = data.datavideos.total;
            total_pages = Math.round(total_records / perpage);
             $("#page_container").html("");
    
    if(pagenum == 1){
        $("#page_container").append("<li class='page-item disabled previous'><a href='javascript:void(0)' class='page-link'><</a></li>");
    }else{
        $("#page_container").append("<li class='page-item totop' onclick='makecall("+(pagenum-1)+")'><a href='javascript:void(0)' class='page-link'><</a></li>");
    }
    
    var i=0;
    for(i=0; i <= 2; i++){
        if(pagenum == (pagenum+i)){
            $("#page_container").append("<li class='page-item disabled'><a href='javascript:void(0)' class='page-link'>"+(pagenum+i)+"</a></li>");
        }else{
            if((pagenum+i)<=total_pages){
                $("#page_container").append("<li class='page-item totop' onclick='makecall("+(pagenum+i)+")'><a href='javascript:void(0)' class='page-link'>"+(pagenum+i)+"</a></li>");					
            }
        }
    }
    
    if(pagenum == total_pages){
        $("#page_container").append("<li class='page-item disabled'><a href='javascript:void(0)' class='page-link'>></a></li>");
    }else{
        $("#page_container").append("<li class='page-item next totop' onclick='makecall("+(pagenum+1)+")'><a href='javascript:void(0)' class='page-link'>></a></li>");
    }
        },error:function(){
                $(".100_list_container").html("error");
            }
        });
    
}


function fetch_data(perpage, pagenum){
	
    $.ajax({
        type:'get',
        url:'https://wankasalud.com/admin/api/video_data?per_page=15&page='+pagenum,
        dataType:'json',
        success:function(data){
            
           $(".100_list_container").html("");
            $.each( data.datavideos.data, function( key, value ) {
               var id_yt=  YouTubeGetID(value.video_url);
               var dateFormatString = convertDate(value.created_at);
                $(".100_list_container").append("<div class='col-lg-4 mb-5' data-aos='fade-up' data-aos-delay='100'><a href='https://www.youtube.com/embed/"+ id_yt +"?autoplay=1' data-fancybox data-type='iframe' class='d-block p-0 border-0'><div class='embed-container'><img class='embed-responsive-item' src='https://img.youtube.com/vi/" +id_yt +"/sddefault.jpg' alt='"+ value.title +"'><img class='icon icon-video-play' src='assets/img/icons/theme/media/dvd.svg' alt='decoration' data-inject-svg /></div><h5 class='mb-1 mt-3'>"+value.title+"</h5><div class='text-small text-muted'>"+dateFormatString+"</div></a></div>");
            });
        },
        error:function(){
            $(".100_list_container").html("error");
        }
    });
}

function makecall(pagenum){
	createpagination(pagenum);
    fetch_data(perpage,pagenum);
}

function YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}
function convertDate(fecha){
date = new Date(fecha);
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();
if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

var fechaconverter =year+'-' + month + '-'+dt;
return fechaconverter;
}