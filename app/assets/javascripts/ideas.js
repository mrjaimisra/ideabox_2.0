$(document).ready(function () {
  $('.add-form').pushpin({top: $('.add-form').offset().top});
  $('.add-form').css('background', 'rgba(224, 247, 250, 0.9)')
});

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
          + "<span class='idea-title'>"
          + idea.title
          + "</span>"
          + "</h4>"
          + "</div>"
          + "<div class='col s2 quality'>"
          + "<h5> quality: "
          + idea.quality
          + "</h5>"
          + "</div>"
          + "<div class='col s10'>"
          + "<p>"
          + truncate(idea.body)
          + "</p>"
          + "<button id='delete-idea' name='delete-button' class='waves-effect waves-teal btn-flat delete-button'>Delete</button>"
          + "<button id='edit-idea' name='edit-button' class='waves-effect waves-teal btn-flat edit-button'>View/Edit</button>"
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
          + newIdea.id
          + "'> <div class='col s10'><h4>"
          + "<span class='idea-title'>"
          + newIdea.title
          + "</span>"
          + "</h4>"
          + "</div>"
          + "<div class='col s2 quality'>"
          + "<h5> quality: "
          + newIdea.quality
          + "</h5>"
          + "</div>"
          + "<div class='col s10'>"
          + "<p>"
          + truncate(newIdea.body)
          + "</p>"
          + "<button id='delete-idea' name='delete-button' class='waves-effect waves-teal btn-flat delete-button'>Delete</button>"
          + "<button id='edit-idea' name='edit-button' class='waves-effect waves-teal btn-flat edit-button'>View/Edit</button>"
          + "</div>"
          + "<div class='col s2'>"
          + "<button id='decrease-quality' name='decrease-button' class='btn-floating btn-large waves-effect waves'>-</button> "
          + "<button id='increase-quality' name='increase-button' class='btn-floating btn-large waves-effect waves'>+</button>"
          + "</div>"
          + "</div>"
        )
      }
    });
    $('.idea-form').val("").trigger('autoresize')
  });

  $('#ideas').delegate('#edit-idea', 'click', function () {
    var $idea = $(this).closest('.idea');

    document.location.href = 'api/v1/ideas/' + $idea.attr('data-id') + '/edit';
  });

  $('#submit-edit-button').on('click', function () {
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    };

    $.ajax({
      type: 'PUT',
      url: 'https://ideabox100.herokuapp.com/api/v1/ideas/' + $('.idea-id').val(),
      data: ideaParams,
      success: function () {
        document.location.href = '/'
      },
      error: function () {
        alert('Title and Body cannot be blank')
      }
    });
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

function truncate(body) {
  if (body.length > 100) {
    return body.split(' ').slice(0, 99).join(' ') + "...";
  } else {
    return body.split(' ').slice(0, 99).join(' ');
  }
}

var ideaTitle = $('#idea-title').val();
var ideaBody = $('#idea-body').val();

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
