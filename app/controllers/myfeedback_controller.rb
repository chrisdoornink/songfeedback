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
    Song.update(1, {:vocals => 1.3, :songwriting => 2, :musicianship => 0, :creativity => 4, :production => 4.1})
    Song.update(2, {:vocals => 3.1, :songwriting => 2.5, :musicianship => 0, :creativity => 4, :production => 4.2})
    Song.update(3, {:vocals => 5.0, :songwriting => 3, :musicianship => 2.1, :creativity => 4, :production => 4.3})
    Song.update(4, {:vocals => 4.6, :songwriting => 4.6, :musicianship => 4.9, :creativity => 4, :production => 4})
    Song.update(5, {:vocals => 3.6, :songwriting => 2.2, :musicianship => 3, :creativity => 4, :production => 4})
    Song.update(6, {:vocals => 4.1, :songwriting => 0.7, :musicianship => 3, :creativity => 4, :production => 4})
    Song.update(7, {:vocals => 3.4, :songwriting => 0, :musicianship => 3, :creativity => 4, :production => 4})
    Song.update(8, {:vocals => 4, :songwriting => 2, :musicianship => 3, :creativity => 4, :production => 4})
    Song.update(9, {:vocals => 1, :songwriting => 2, :musicianship => 3, :creativity => 4, :production => 4})

    @songs = Song.find_all_by_user_id(@user_info["id"])
    @vocals = Song.average("vocals")
    @songwriting = Song.average("songwriting")
    @musicianship = Song.average("musicianship")
    @creativity = Song.average("creativity")
    @production = Song.average("production")
    @overall = Song.average("overall")

    @song_ids = Array.new

    @song_count = Song.count


  end

  def upload
#    Song.update(8, {:feedbacks => 1, :overall => 4})

    @song = Song.new

  end

  def create
    @song = Song.create( params[:song] )
  end

end
