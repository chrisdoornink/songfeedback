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
    if @user_id != ""
      @duplicate_test = Feedback.all(:conditions => { :song_id => params[:songId], :user_id => @user_id })
      if @duplicate_test.length > 0
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
        unless params[:comments] == nil || params[:comments] == "null"
          Comment.create(:song_id => params[:songId], :user_id => @user_id, :comment => params[:comments])
        end
        @comment_number = Comment.count(:conditions => {:song_id => params[:songId]})
        Song.update(params[:songId], {:reviews => @number, :totalcomments => @comment_number, :vocals => @vocals_avg, :songwriting => @songwriting_avg, :musicianship => @musicianship_avg, :creativity => @creativity_avg, :production => @production_avg, :overall => @overall_avg})
        @reviews = Feedback.count(:conditions => {:user_id => @user_id})
        @comments = Comment.count(:conditions => {:user_id => @user_id})
        User.update(@user_id, {:reviews => (@reviews), :commented => (@comments), :score => ((@reviews*4)+(@comments))})

        @user_critiques = Feedback.find_all_by_user_id(@user_id)
        @score = 0
        @user_critiques.each do |critique|
          @songs_average = Song.find(critique.song_id)
          @score = @score+(critique.overall-@songs_average["overall"])
        end
        @score = ((@score/@reviews)*3)+5
        User.update(@user_id, {:harsh => (@score)})

      end
    else
      @message = "logged_out"
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
    unless params[:comments] == nil || params[:comments] == "null"
      Comment.create(:song_id => params[:songId], :user_id => @user_id, :comment => params[:comments])
    end
    @comment_number = Comment.count(:conditions => {:song_id => params[:songId]})
    Song.update(params[:songId], {:reviews => @number, :totalcomments => @comment_number, :vocals => @vocals_avg, :songwriting => @songwriting_avg, :musicianship => @musicianship_avg, :creativity => @creativity_avg, :production => @production_avg, :overall => @overall_avg})

    @user_critiques = Feedback.find_all_by_user_id(@user_id)
    @score = 0
    @user_critiques.each do |critique|
      @songs_average = Song.find(critique.song_id)
      @score = @score+(critique.overall-@songs_average["overall"])
    end
    @reviews = Feedback.count(:conditions => {:user_id => @user_id})
    @score = ((@score/@reviews)*3)+5
    User.update(@user_id, {:harsh => (@score)})
    @reviews = Feedback.count(:conditions => {:user_id => @user_id})
    @comments = Comment.count(:conditions => {:user_id => @user_id})
    User.update(@user_id, {:reviews => (@reviews), :commented => (@comments), :score => ((@reviews*4)+(@comments))})


    render :layout => false
  end

  def current_stats
    @current_song = Song.find(params[:songId])
    @vocals = Song.average("vocals")
    @songwriting = Song.average("songwriting")
    @musicianship = Song.average("musicianship")
    @creativity = Song.average("creativity")
    @production = Song.average("production")
    @overall = Song.average("overall")
    render :layout => false
  end

end
