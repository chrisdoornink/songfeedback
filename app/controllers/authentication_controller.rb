class AuthenticationController < ApplicationController
  def login
    if params[:username] || params[:password]
      #if username and password both clear then assign a cookie and redirect to welcome page
      #and dont forget to uncomment the other stuff on the welcome page

      redirect_to "/welcome/index"
    end

  end

  def index

  end

end
