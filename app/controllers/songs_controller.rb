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
    @songs = Song.order("reviews ASC").limit(15)
  end

  def top
    @songs = Song.order("overall DESC").limit(15)
  end

  def random
  end

  def genre
  end

  def feedback
    @testing = Feedback.all(:conditions => { :song_id => params[:songId], :user_id => @user_id })

    if @testing.length > 0
      @message = "dupe"
    else
      @message = "first"
      Feedback.create(:song_id => params[:songId], :user_id => @user_id, :vocals => params[:vocals], :songwriting => params[:songwriting], :musicianship => params[:musicianship], :creativity => params[:creativity], :production => params[:production], :overall => params[:overall], :comments => params[:comments])
      @reviewed = Song.find(params[:songId])
      Song.update(params[:songId], {:reviews => (@reviewed["reviews"]+1)})
    end

    render :layout => false
  end

  def override
    @old_reviews = Feedback.all(:conditions => { :song_id => params[:songId], :user_id => @user_id })
    Feedback.destroy(@old_reviews)
    Feedback.create(:song_id => params[:songId], :user_id => @user_id, :vocals => params[:vocals], :songwriting => params[:songwriting], :musicianship => params[:musicianship], :creativity => params[:creativity], :production => params[:production], :overall => params[:overall], :comments => params[:comments])
    render :layout => false
  end

end
