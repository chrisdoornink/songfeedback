class AuthenticationController < ApplicationController
require 'net/smtp'

  def index
  end

  def login
    @error_message = nil
    if params[:username] && params[:password]
      @user_info = User.find_by_email(params[:username])
      if !@user_info.nil?
        if @user_info["password"] == params[:password]
          @user_id = @user_info["id"]
          @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
          User.update(@user_id, {:token => @token_new})
          cookies[:authenticate] = {:value => @token_new, :expires => 1.years.from_now, :domain => nil}
          redirect_to "/"
        else
          @error_message = "Incorrect password"
        end
      else
        @error_message = "Incorrect email address"
      end
    else
      @error_message = nil
    end
    @not_logged = true
  end

  def register
    @error_message = nil
    if params[:username] && params[:password] && params[:email]
      @user_info = User.find_by_username(params[:username])
      @email_info = User.find_by_email(params[:email])
      if @user_info.nil? && @email_info.nil?  
        @user_info = User.create(:username => params[:username], :password => params[:password], :email => params[:email])
        @user_id = @user_info["id"]
        @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
        User.update(@user_id, {:token => @token_new})
        cookies[:authenticate] = {:value => @token_new, :expires => 1.years.from_now, :domain => nil}
        redirect_to "/"
      else
        if @user_info.nil?
          @error_message = "Email address is already registered"
        else
          @error_message = "Username is taken, try another one"
        end
      end
    end
    @not_logged = true
  end

  def logout
    cookies.delete :authenticate
    redirect_to "/authentication/login"
  end
  
  def forgot_password
    render :layout => false
  end

  def send_reminder
    PasswordMailer.reminder_email(params[:email]).deliver
  end
end