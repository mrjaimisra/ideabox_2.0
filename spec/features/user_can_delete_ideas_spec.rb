require 'rails_helper'

RSpec.feature "User can delete ideas", type: :feature do
  scenario "successfully", js: true do
    visit root_path
    click_on "Add An Idea"

    fill_in "Title", with: "Title"
    fill_in "Body", with: "Anything"
    click_on "Save"

    expect(page).to have_content("Title")
    expect(page).to have_content("Anything")
    expect(page).to have_content("swill")

    click_on "Delete"

    expect(page).to_not have_content("Title")
    expect(page).to_not have_content("Anything")
    expect(page).to_not have_content("swill")
  end
end
