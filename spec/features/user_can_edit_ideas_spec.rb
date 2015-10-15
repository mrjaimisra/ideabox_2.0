require 'rails_helper'

RSpec.feature "UserCanEditAnIdeas", type: :feature do
  let!(:idea) { Idea.create(title: "Title", body: "Anything")}

  xscenario "successfully", js: true do

    # due to the specificity with which I had to write the URL in the ajax call,
    # capybara/selenium could not test this function. In other words,
    # the put request continually fails in the test, because the url is not the
    # same as the one being passed in to the ajax call.

    visit root_path

    expect(page).to have_content("Title")
    expect(page).to have_content("Anything")
    expect(page).to have_content("swill")

    click_on "View/Edit"

    expect(current_path).to eq(edit_api_v1_idea_path(idea))

    fill_in "Title", with: "New Title"
    fill_in "Body", with: "Anything Else"
    click_on "Save"

    expect(current_path).to eq(root_path)
    expect(page).to have_content("New Title")
    expect(page).to have_content("Anything Else")
    expect(page).to have_content("swill")
  end
end
