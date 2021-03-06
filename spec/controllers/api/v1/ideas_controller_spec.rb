require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :controller do
  let!(:idea) { Idea.create(title: "Idea", body: "This is the best idea")}

  it "receives a successful response when requesting @ideas in json" do
    get :index, format: :json

    data = JSON.parse(response.body, symbolize_names: true)

    expect(response.status).to eq(200)
    expect(data.first[:id]).to eq(idea.id)
    expect(data.first[:title]).to eq(idea.title)
    expect(data.first[:body]).to eq(idea.body)
  end

  it "renders the index template" do
    get :index
    expect(response).to render_template("index")
  end

  it "creates a new idea from the database" do
    expect { post :create, format: :json, idea: { title: "Second idea", body: "This is another idea" }
    }.to change(Idea, :count)
  end

  it "deletes an idea from the database" do
    expect { delete :destroy, format: :json, id: idea.id
    }.to change(Idea, :count)
  end
  
  it "updates an existing idea in the database" do
    put :update, format: :json, id: idea.id, idea: { title: "What", body: "Hey" }

    idea.reload

    expect(response.status).to eq(204)
    expect(idea.title).to eq("What")
    expect(idea.body).to eq("Hey")
  end
end
