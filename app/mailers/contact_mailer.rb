class ContactMailer < ActionMailer::Base
  default :to => "info@songfeedback.com"

  def contact_email(email, message)
    @email = email
    user = User.find_by_email(email)
    if user
      @username = user["username"]
    else
      @username = "anonymous"
    end
    @message = message
    mail(:from => email,
         :subject => "Song Feedback Contact Form")
  end

end