class SongsController < ApplicationController
  before_filter :get_user_info

  def get_user_info
    @user_info = user_auth
    if !@user_info.nil?
      @username = @user_info["username"]
    end
  end

  def index
  end

  def recent
  end

  def least_rated
  end

  def top
  end

  def random
  end

  def genre
  end

end
