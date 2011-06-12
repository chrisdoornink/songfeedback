class MyfeedbackController < ApplicationController
  before_filter :get_user_info

  def get_user_info
    @user_info = user_auth
    if !@user_info.nil?
      @username = @user_info["username"]
    end
  end


  def index
  end

  def mysongs
    @songs = Song.find_all_by_user_id(@user_info["id"])
  end

  def upload
#    Song.update(8, {:feedbacks => 1, :overall => 4})

    @song = Song.new

  end

  def create
    @song = Song.create( params[:song] )
  end

end
