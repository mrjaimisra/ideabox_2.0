require 'rails_helper'

RSpec.feature "Idea bodies are truncated to 100 chars", type: :feature do

  scenario "successfully for a long body", js: true do
    visit root_path

    fill_in "Title", with: "Title"
    fill_in "Body", with: (1..100).map { |num| num }.to_s
    click_on "Save"

    expect(page).to have_content("...")
    expect(page).to have_content("99")
    expect(page).to_not have_content("100")
  end

  scenario "and does not add an ellipses to a short body", js: true do
    visit root_path

    fill_in "Title", with: "Title"
    fill_in "Body", with: "Body"
    click_on "Save"

    expect(page).to have_content("Body")
    expect(page).to_not have_content("...")
  end
end
