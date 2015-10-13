require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :controller do
  let!(:idea) { Idea.create(title: "Idea", body: "This is the best idea")}

  it "receives a successful response" do
    get 'index', format: json

    expect(response.status).to eq(200)
  end

  it "renders the index template" do
    get :index
    expect(response).to render_template("index")
  end

  it "assigns @ideas" do
    get :index
    expect(assigns(:ideas)).to eq([idea])
  end
end
