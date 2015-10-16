require 'rails_helper'

RSpec.feature "User can add ideas", type: :feature do
  scenario "successfully", js: true do
    visit root_path
    click_on "Add An Idea"

    fill_in "Title", with: "Title"
    fill_in "Body", with: "Anything"
    click_on "Save"

    expect(page).to have_content("Title")
    expect(page).to have_content("Anything")
    expect(page).to have_content("swill")

    fill_in "Title", with: "Title"
    fill_in "Body", with: "Something"
    click_on "Save"

    expect(page).to have_content("Something")
    expect(page).to have_content("Title")
  end

  scenario "unsuccessfully without a title", js: true do
    visit root_path
    click_on "Add An Idea"

    fill_in "Title", with: ""
    fill_in "Body", with: "Something"
    click_on "Save"

    expect(page).to_not have_content("Something")
    expect(page).to_not have_content("swill")
  end

  scenario "unsuccessfully without a body", js: true do
    visit root_path
    click_on "Add An Idea"

    fill_in "Title", with: "Title"
    fill_in "Body", with: ""
    click_on "Save"

    expect(page).to_not have_content("Title")
    expect(page).to_not have_content("swill")
  end
end
