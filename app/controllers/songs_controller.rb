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
    @songs = Song.order("created_at DESC").limit(15)
  end

  def least_rated
    @songs = Song.order("feedbacks ASC").limit(15)
  end

  def top
    @songs = Song.order("overall DESC").limit(15)
  end

  def random
  end

  def genre
  end

  def feedback
    Feedback.create(:song_id => params[:songId], :user_id => @user_id, :vocals => params[:vocals], :songwriting => params[:songwriting], :musicianship => params[:musicianship], :creativity => params[:creativity], :production => params[:production], :overall => params[:overall], :comments => params[:comments])
  end

end
