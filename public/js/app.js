$(document).on("click", ".articleTitle", function () {
  //assign and id to the article clicked to collect correct data
  var thisId = $(this).attr("data-id");

  //ajax call to get the article by id
  $.ajax({
      method: "GET",
      url: "/" + thisId
  }).then(function (data) {
      //will not appear if undefined so give data.note a placeholder value
      var appendingInfo = "";
      //build variable for the information below in order to get a note per entry
      appendingInfo += '<h3 class="thisArticleTitle">' + data.title + '</h3><form><input id="noteTitle" type="text" style="width:100%; margin-bottom:10px;" placeholder="Title of Comment Here..."' +
          '><textarea id="noteBody" cols="30" rows="10" placeholder="Type your comment here..." maxlength="200"></textarea>' +
          '<input id="btnSubmit" type="submit" data-id="' + data._id + '" class="btn btn-warning" style="width:100%;"></form><div class="seePrevious">Previous comment made about...<span id="commentMadeTitle"><strong>' + data.title + '</strong></span><hr>';
          for (var j = 0; j < data.notes.length; j++) {
              //must go through loop to collect all articles
              appendingInfo += '<span><strong>Comment '+[j+1]+' </strong><br><br><i>Title:<br><span class="replaceTitle'+ [j+1] +'" id="replaceTitle">'+ data.notes[j].title + '</span></i><br>Comment:<br><span class="replaceBody replaceBody'+[j+1]+'" id="replaceBody">' + data.notes[j].body + '</span><br><span class="replaceEdit'+[j+1]+'"><button class="btn btn-warning" id="editNote" data-body="'+ data.notes[j].body +'" data-title="'+ data.notes[j].title +'" data-id="'+data.notes[j]._id+'" data-num="'+[j+1]+'">Edit Comment</button></span><button class="btn btn-warning" id="deleteNote" data-articleId="'+data._id+'" data-id="'+data.notes[j]._id+'">Delete Comment</button><span class="replaceEdit"></span><br><hr>';
          }
      allInfo = appendingInfo + '</div>';
      //append variable here
      $(".notes").html(allInfo)
  });
});

//when click on the btnSubmit then send the note
$(document).on("click", "#btnSubmit", function () {
  // take the id associated with the btn
  var thisId = $(this).attr("data-id");
  // POST request for the notes
  $.ajax({
      method: "POST",
      url: "/" + thisId,
      data: {
          // Value taken from title input
          title: $("#noteTitle").val(),
          // Value taken from note textarea
          body: $("#noteBody").val()
      }
  }).then(function (data) {
      // show the data sent
  });

  // Remove all previous entries
  $("#noteTitle").val("");
  $("#noteBody").val("");
});

//on click edit note
$(document).on("click", "#editNote", function() {
    //get all attributes attached to the data
  articleId = $(this).attr("data-articleId")
  noteId = $(this).attr("data-id")
  editTitle = $(this).attr("data-title")
  editBody = $(this).attr("data-body")
  //attach a number associated with the comment to differentiate the button
  num = $(this).attr("data-num")
  //replate certain attributes with the correct buttons
  $(".replaceTitle"+num).html("<textarea class='textTitle'>"+ editTitle +"</textarea>")
  $(".replaceBody"+num).html("<textarea class='textBody'>"+ editBody +"</textarea>")
  $(".replaceEdit"+num).html("<button class='btn btn-warning' id ='saveNoteChanges'>Save Changes</button>");
  
  $(document).on("click", "#saveNoteChanges", function() {
    // ajax call to post edited note...
  $.ajax({
     method: "POST", 
     url: "/notes/"+ noteId, 
     data: {
         title : $(".textTitle").val(), 
         body: $(".textBody").val()
     }
  }).then(function(){
      //send back to home window
      window.location.replace("/")
  });
  });

});
//when click on delete note...
$(document).on("click", "#deleteNote", function() {
//collect the data attached to the button for the correct ids
 buttonId =  $(this).attr("data-id")
 articleId = $(this).attr("data-articleId")
 //ajax call to delete note
  $.ajax({
      method: "DELETE", 
      url: "/notes/" + buttonId, 
  });
  //send back to home window
  window.location.replace("/")
});