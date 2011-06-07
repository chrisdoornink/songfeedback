class AuthenticationController < ApplicationController
  def login
    if params[:username] && params[:password]
      @user_info = User.find_by_username(params[:username])
      if !@user_info.nil?
        if @user_info["password"] == params[:password]
          @user_id = @user_info["id"]
          @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
          User.update(@user_id, {:token => @token_new})
          cookies[:authenticate] = {:value => @token_new, :expires => 1.days.from_now, :domain => nil}
          redirect_to "/welcome/index"
        else
          puts "password was wrong"
        end
      end
    end
  end

  def index

  end

end
