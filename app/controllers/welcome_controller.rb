class WelcomeController < ApplicationController
  before_filter :get_user_info

  def get_user_info
    @user_info = user_auth
    if !@user_info.nil?
      @username = @user_info["username"]
    end
  end

  def index



    @title = "Songs will play here."
    @artist = "Choose a song on the right to get started."
    @desc = ""



  end

  def show
  end

end
