$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'api/v1/ideas.json',
    success: function (ideas) {
      $.each(ideas, function (index, idea) {
        $('#ideas').prepend(
          "<div class='idea col s10 offset-s1' data-id='"
          + idea.id
          + "'> <ul class='idea-list'>"
          + "<li><div class='col s10'><h4>"
          + "<span class='idea-title'>"
          + idea.title
          + "</span>"
          + "</h4>"
          + "</div>"
          + "<div class='col s2'>"
          + "<h5> quality: "
          + "<div id='quality'>"
          + idea.quality
          + '</div>'
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
          + "</div></li>"
          + "</ul>"
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
          + "<div class='col s2'>"
          + "<h5> quality: "
          + "<div id='quality'>"
          + newIdea.quality
          + '</div>'
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
        title: $('#idea-title').val(),
        body: $('#idea-body').val()
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

  function increaseQuality(quality) {
    if (quality === 'swill') {
      return {quality: 'plausible'}
    } else if (quality === 'plausible') {
      return {quality: 'genius'}
    } else {
      return {quality: 'genius'}
    }
  }

  $('#ideas').delegate('#increase-quality', 'click', function () {
    var $idea = $(this).closest('.idea');
    var quality = $idea.find('#quality')[0];
    var ideaParams = {
      idea: increaseQuality(quality.innerHTML)
    };

    $.ajax({
      type: 'PUT',
      url: 'https://ideabox100.herokuapp.com/api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data: ideaParams,
      success: function () {
        $idea.find('#quality')[0].innerHTML = ideaParams['idea']['quality']
      }
    });
  });

  $("#filter").keyup(function () {
    var filter = $(this).val();

    $(".idea-list").each(function () {
      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
      }
    });
  });


  function decreaseQuality(quality) {
    if (quality === 'genius') {
      return {quality: 'plausible'}
    } else if (quality === 'plausible') {
      return {quality: 'swill'}
    } else {
      return {quality: 'swill'}
    }
  }

  $('#ideas').delegate('#decrease-quality', 'click', function () {
    var $idea = $(this).closest('.idea');
    var quality = $idea.find('#quality')[0];

    var ideaParams = {
      idea: decreaseQuality(quality.innerHTML)
    };

    $.ajax({
      type: 'PUT',
      url: 'https://ideabox100.herokuapp.com/api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data: ideaParams,
      success: function () {
        $idea.find('#quality')[0].innerHTML = ideaParams['idea']['quality']
      }
    });
  });

  function truncate(body) {
    if (body.length > 100) {
      return body.split(' ').slice(0, 99).join(' ') + "...";
    } else {
      return body.split(' ').slice(0, 99).join(' ');
    }
  }
});
