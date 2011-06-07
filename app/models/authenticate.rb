class Authenticate
  require 'rubygems'

  def self.verify

    @token = get_auth
    @token_sliced = @token.partition("-")
    @user_id = @token_sliced[0]

    if User.exists?(@user_id)
      if (@token == User.find(@user_id).token)
        @user_info = User.find(@user_id)
        @token_new = @user_id.to_s + "-".to_s + Time.current.usec.to_s
        User.update(@user_id, {:token => @token_new})
        cookies[:authenticate] = {:value => @token_new, :expires => 1.days.from_now, :domain => nil}
      else
        redirect_to "/authentication/login"
      end
    else
      redirect_to "/authentication/login"
    end

  end

end

