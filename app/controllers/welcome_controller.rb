class WelcomeController < ApplicationController
  def index
    @title = "Songs will play here."
    @artist = "Choose a song on the right to get started."
    @desc = ""
    @username = "chrisdoornink@gmail.com"
    @eventual_username = User.find(1)
  end

  def show
  end

end
