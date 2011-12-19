class WelcomeController < ApplicationController
  before_filter :get_user_info



  def get_user_info
    @user_info = user_auth
    if !@user_info.nil?
      @username = @user_info["username"]
    end
  end

  def index
    @recent = Song.order("created_at DESC").limit(5)
    @least = Song.order("reviews ASC").limit(5)
    @top = Song.order("overall DESC").limit(5)
  end

  def show
  end

  def user_stats
    render :layout => false
  end

  def about
    render :layout => false
  end

  def contact
    render :layout => false
  end

  def send_contact_message
    ContactMailer.contact_email(params[:email], params[:message]).deliver
  end

  def privacy
    render :layout => false
  end

  def terms
    render :layout => false
  end

end
