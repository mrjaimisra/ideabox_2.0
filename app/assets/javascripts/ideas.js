$(document).ready(function () {
  $.ajax({
    type:     'GET',
    url:      'api/v1/ideas.json',
    success:  function (ideas) {
      //console.table(ideas)
      $.each(ideas, function (index, idea) {
        $('#ideas').append(
          "<div class='idea' data-id='"
          + idea.id
          + "'> <h3>"
          + idea.title
          + "</h5> <h5> quality: "
          + idea.quality
          + "</h6>"
          + "<p>"
          + idea.body
          + "</p>"
          + "<button id='delete-idea' name='delete-button' class='btn btn-default'>Delete</button>"
          + "</div>"
        )
      });
    }
  });

  $('#create-idea').on('click', function () {
    var ideaParams = {
      idea: { title: $('#idea-title').val(),
              body:  $('#idea-body').val() }
    };

    $.ajax({
      type:     'POST',
      url:      'api/v1/ideas.json',
      data:     ideaParams,
      success:  function (newIdea) {
        $('#ideas').append(
          "<div class='idea' data-id='"
          + newIdea.id
          + "'> <h3>"
          + newIdea.title
          + "</h5> <h5> quality: "
          + newIdea.quality
          + "</h6>"
          + "<p>"
          + newIdea.body
          + "</p>"
          + "</div>"
        )
      }
    });
  });

  $('#ideas').delegate('#delete-idea', 'click', function () {
    var $idea = $(this).closest('.idea');

    $.ajax({
      type:     'DELETE',
      url:      'api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success:  function () {
        $idea.remove()
      },
      error:    function () {
        $idea.remove()
      }
    });
  });
});
