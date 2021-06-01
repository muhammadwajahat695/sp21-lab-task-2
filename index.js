$ (function(){
    $("#read").click(loadrecipes);
    $("#container").on("click",".btn-danger",handlebutton);
    $("#container").on("click",".btn-warning",handleupdate);
    $("#close").click(addrecipe);
    $("#updatesave").click(updatesave);
});

function updatesave(){
    var title = $("#updatetitle").val();
    var body = $("#updatebody").val();
    var id = $("#updateid").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"PUT",
        data:{title:title,body:body},
        success: function (response){
            loadrecipes();
            $("#updatemodal").modal("hide");
        }

    });

};
function handleupdate(){
    var btnclicked=$(this);
    var parent= btnclicked.closest(".styling");
    let id = parent.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id,function(response){
    $("#updateid").val(response._id);
    $("#updatetitle").val(response.title);
    $("#updatebody").val(response.body);
    $("#updatemodal").modal("show"); 
    });
};
function addrecipe(){
    var title = $("#Title").val();
    var body = $("#Body").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST",
        data:{title:title,body:body},
        success: function (response){
            loadrecipes();
            $("#modelId").modal("hide");
        }

    });
};
function handlebutton(){
    var btnclicked=$(this);
    var parent= btnclicked.closest(".styling");
    let id = parent.attr("data-id");
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"DELETE",
        success:function(){
            loadrecipes();
        }
    });

};
function loadrecipes(){

    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"GET",
        success:function(response){
            var a =$("#container")
            a.empty();
            for (var i=0;i<response.length;i++){
                a.append(`<div class="styling" data-id="${response[i]._id}"><h1>${response[i].title}</h1><p>${response[i].body}<btn class="btn btn-danger float-right">Delete</btn><btn class="btn btn-warning float-right">UPDATE</btn><p></div>`)
                
            }
            
        }
    });
};