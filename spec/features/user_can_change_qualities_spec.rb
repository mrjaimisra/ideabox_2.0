require 'rails_helper'

RSpec.feature "User can increase an ideas quality", type: :feature do
  let!(:idea) { Idea.create(title: "The title", body: "The body")}

  scenario "successfully", js: true do
    visit root_path

    expect(page).to have_content("The title")
    expect(page).to have_content("swill")

    click_on "+", wait: 2

    expect(page).to have_content("plausible")

    click_on "+", wait: 2

    expect(page).to have_content("genius")

    click_on "+", wait: 2

    expect(page).to have_content("genius")

    click_on "-", wait: 2

    expect(page).to have_content("plausible")

    click_on "+", wait: 2

    expect(page).to have_content("genius")

    click_on "-", wait: 2

    expect(page).to have_content("plausible")
  end
end
