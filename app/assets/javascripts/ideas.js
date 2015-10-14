$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'api/v1/ideas.json',
    success: function (ideas) {
      //console.table(ideas)
      $.each(ideas, function (index, idea) {
        $('#ideas').prepend(
          "<div class='idea col s10 offset-s1' data-id='"
          + idea.id
          + "'> <div class='col s10'><h4>"
          + idea.title
          + "</h4>"
          + "</div>"
          + "<div class='col s2 quality'>"
          + "<h5> quality: "
          + idea.quality
          + "</h5>"
          + "</div>"
          + "<div class='col s10'>"
          + "<p>"
          + idea.body
          + "</p>"
          + "<button id='delete-idea' name='delete-button' class='waves-effect waves-teal btn-flat delete-button'>Delete</button>"
          + "</div>"
          + "<div class='col s2'>"
          + "<button id='decrease-quality' name='decrease-button' class='btn-floating btn-large waves-effect waves'>-</button> "
          + "<button id='increase-quality' name='increase-button' class='btn-floating btn-large waves-effect waves'>+</button>"
          + "</div>"
          + "</div>"
        )
      });
    }
  });

  $('#create-idea').on('click', function () {
    var ideaParams = {
      idea: {
        title: $('#idea-title').val(),
        body: $('#idea-body').val()
      }
    };

    $.ajax({
      type: 'POST',
      url: 'api/v1/ideas.json',
      data: ideaParams,
      success: function (newIdea) {
        $('#ideas').prepend(
          "<div class='idea col s10 offset-s1' data-id='"
          + idea.id
          + "'> <div class='col s10'><h4>"
          + idea.title
          + "</h4>"
          + "</div>"
          + "<div class='col s2 quality'>"
          + "<h5> quality: "
          + idea.quality
          + "</h5>"
          + "</div>"
          + "<div class='col s10'>"
          + "<p>"
          + idea.body
          + "</p>"
          + "<button id='delete-idea' name='delete-button' class='waves-effect waves-teal btn-flat delete-button'>Delete</button>"
          + "</div>"
          + "<div class='col s2'>"
          + "<button id='decrease-quality' name='decrease-button' class='btn-floating btn-large waves-effect waves'>-</button> "
          + "<button id='increase-quality' name='increase-button' class='btn-floating btn-large waves-effect waves'>+</button>"
          + "</div>"
          + "</div>"
        )
      }
    });
    $('.idea-form').val("")
  });

  $('#ideas').delegate('#delete-idea', 'click', function () {
    var $idea = $(this).closest('.idea');

    $.ajax({
      type: 'DELETE',
      url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success: function () {
        $idea.remove();
      },
      error: function () {
        $idea.remove();
      }
    });
  });
});

// JS METHODS:

//toggle $('.some-selector').toggle()

// if you give toggle an argument, it will evaluate the truthiness of the argument
// if it is true it will show it, if it is false it will hide it

// So, instead of:

// if (whateverCondition) {
//$('.some-selector').show()
// else {
//$('.some-selector').hide();
//}

//$('some-selector').toggle(inspiration.title.indexOf(searchTerm) ! == -1);

//.css


// USING BIND

//// $.getJson('url', successFunction () {
//  console.log(Success!)
//}, failureFunction () {
//  alert(FAIL!)
//});

// using promise object:

//// $.getJson('api/v1/whatever');
//  .then(function (idea) {
//  addIdeaToThePage(idea)
//})
//  .fail(function (errorMessage) {
//  alert(errorMessage);
//});

//$.post('api/vq/whatevers', { title: 'My Idea', body: "wowowo"});
