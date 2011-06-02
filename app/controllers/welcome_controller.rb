class WelcomeController < ApplicationController
  def index
    @title = "Songs will play here."
    @artist = "Choose a song on the right to get started."
    @desc = ""
    @username = "chrisdoornink@gmail.com"
  end

  def show
  end

end
