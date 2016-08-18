class ApplicationController < ActionController::API
  def hello
    render json: { title: 'React and Rails' }
  end
end
