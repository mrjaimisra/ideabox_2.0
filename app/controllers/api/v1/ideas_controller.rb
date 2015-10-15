class Api::V1::IdeasController < ApplicationController
  respond_to :json, :xml, :html

  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def edit
    @idea = Idea.find(params[:id])
    respond_with @idea
  end

  def update
    respond_with Idea.update(params[:id], idea_params), location: nil
  end

  private

    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end
end
