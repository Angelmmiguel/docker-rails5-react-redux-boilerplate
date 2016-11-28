class Api::V1::BaseController < ApplicationController
  include ActionController::Serialization

  def hello
    render json: { title: 'React and Rails' }
  end
end
