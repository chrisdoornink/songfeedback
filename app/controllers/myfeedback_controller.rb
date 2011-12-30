class MyfeedbackController < ApplicationController
  before_filter :get_user_info

  def get_user_info
    @user_info = user_auth
    if !@user_info.nil?
      @username = @user_info["username"]
    end
  end


  def index
    render :layout => false
  end

  def mysongs

    @songs = Song.find_all_by_user_id(@user_info["id"])
    @vocals = Song.average("vocals")
    @songwriting = Song.average("songwriting")
    @musicianship = Song.average("musicianship")
    @creativity = Song.average("creativity")
    @production = Song.average("production")
    @overall = Song.average("overall")

    @song_ids = Array.new

    @song_count = Song.count
    
    render :layout => false

  end

  def upload
    @song = Song.new
    render :layout => false
  end

  def create
    @song = Song.create( params[:song] )
    @uploads = Song.count(:conditions => {:user_id => @user_id})
    User.update(@user_id, {:uploads => (@uploads)})
    redirect_to "/#/myfeedback/success?song=" + @song["id"].to_s
  end

  def success
    @songid = params[:song]
    render :layout => false
  end

end
