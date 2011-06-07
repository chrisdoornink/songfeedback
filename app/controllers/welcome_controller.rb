class WelcomeController < ApplicationController
  def index

    @token = cookies[:authenticate] ? cookies[:authenticate] : ""
    @token_sliced = @token.partition("-")
    @user_id = @token_sliced[0]

    #get rid of this once login is integrated
    @user_id = 1
    if User.exists?(@user_id)
    #  if (@token == User.find(@user_id).token)
        @user_info = User.find(@user_id)
        @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
        User.update(@user_id, {:token => @token_new})
        cookies[:authenticate] = {:value => @token_new, :expires => 1.days.from_now, :domain => nil}
    #  else
    #    redirect_to "/authentication/login"
    #  end
    else
      redirect_to "/authentication/login"
    end

    #@username = @user_info["username"]
    @title = "Songs will play here."
    @artist = "Choose a song on the right to get started."
    @desc = ""

    @eventual_username = User.find(1)

  end

  def show
  end

end
