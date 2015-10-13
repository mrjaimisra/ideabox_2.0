class Idea < ActiveRecord::Base
  validates :title, :body, :quality, presence: true

  enum quality: %w(swill plausible genius)
end
