
$(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13) {
     var parameters = { search: $(this).val() };
     console.log(parameters)
       $.get( '/searching',parameters, function(data) {
         console.log(data)
       $('#results').html(data);
     });
    };
 });
});
