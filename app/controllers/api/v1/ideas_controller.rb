class Api::V1::IdeasController < ApplicationController
  respond_to :json, :xml

  def index
    @ideas = Idea.all
    # respond_with Idea.all

    respond_to do |format|
      format.html do
        render :index
      end
      format.json { render json: @ideas.to_json }
    end
  end

end
