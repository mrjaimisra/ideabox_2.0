$(document).ready(function () {
  $.ajax({
    type:     'GET',
    url:      'http://jaideabox.herokuapp.com/api/v1/ideas.json',
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
          + "</div>"
        )
      });
    }
  });
});
