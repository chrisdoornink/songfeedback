class AuthenticationController < ApplicationController

  def index
  end

  def login
    if params[:username] && params[:password]
      @user_info = User.find_by_username(params[:username])
      if !@user_info.nil?
        if @user_info["password"] == params[:password]
          @user_id = @user_info["id"]
          @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
          User.update(@user_id, {:token => @token_new})
          cookies[:authenticate] = {:value => @token_new, :expires => 1.years.from_now, :domain => nil}
          redirect_to "/welcome/index"
        else
          #message about wrong password
        end
      else
        #message about wrong username
      end
    else
      #message about blank fields
    end
    @not_logged = true
  end

  def register
    if params[:username] && params[:password]
      @user_info = User.create(:username => params[:username], :password => params[:password], :email => params[:email])
      @user_id = @user_info["id"]
      @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
      User.update(@user_id, {:token => @token_new})
      cookies[:authenticate] = {:value => @token_new, :expires => 1.years.from_now, :domain => nil}
      redirect_to "/welcome/index"
    end
    @not_logged = true
  end

end