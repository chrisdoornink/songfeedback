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
      @number = Feedback.count(:conditions => {:song_id => params[:songId]})
      @vocals_avg = Feedback.average(:vocals, :conditions => {:song_id => params[:songId]})
      @songwriting_avg = Feedback.average(:songwriting, :conditions => {:song_id => params[:songId]})
      @musicianship_avg = Feedback.average(:musicianship, :conditions => {:song_id => params[:songId]})
      @creativity_avg = Feedback.average(:creativity, :conditions => {:song_id => params[:songId]})
      @production_avg = Feedback.average(:production, :conditions => {:song_id => params[:songId]})
      @overall_avg = Feedback.average(:overall, :conditions => {:song_id => params[:songId]})
      Song.update(params[:songId], {:reviews => @number, :vocals => @vocals_avg, :songwriting => @songwriting_avg, :musicianship => @musicianship_avg, :creativity => @creativity_avg, :production => @production_avg, :overall => @overall_avg})
      @reviews = Feedback.count(:conditions => {:user_id => @user_id})
      User.update(@user_id, {:reviews => (@reviews)})

    end

    render :layout => false
  end

  def override
    @old_reviews = Feedback.all(:conditions => { :song_id => params[:songId], :user_id => @user_id })
    Feedback.destroy(@old_reviews)
    Feedback.create(:song_id => params[:songId], :user_id => @user_id, :vocals => params[:vocals], :songwriting => params[:songwriting], :musicianship => params[:musicianship], :creativity => params[:creativity], :production => params[:production], :overall => params[:overall], :comments => params[:comments])
    @number = Feedback.count(:conditions => {:song_id => params[:songId]})
    @vocals_avg = Feedback.average(:vocals, :conditions => {:song_id => params[:songId]})
    @songwriting_avg = Feedback.average(:songwriting, :conditions => {:song_id => params[:songId]})
    @musicianship_avg = Feedback.average(:musicianship, :conditions => {:song_id => params[:songId]})
    @creativity_avg = Feedback.average(:creativity, :conditions => {:song_id => params[:songId]})
    @production_avg = Feedback.average(:production, :conditions => {:song_id => params[:songId]})
    @overall_avg = Feedback.average(:overall, :conditions => {:song_id => params[:songId]})
    Song.update(params[:songId], {:reviews => @number, :vocals => @vocals_avg, :songwriting => @songwriting_avg, :musicianship => @musicianship_avg, :creativity => @creativity_avg, :production => @production_avg, :overall => @overall_avg})

    render :layout => false
  end

end
