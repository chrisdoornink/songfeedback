class PasswordMailer < ActionMailer::Base
  default :from => "donotreply@songfeedback.com"
  
  def reminder_email(email)
    @user  = User.find_by_email(email)
    mail(:to => email,
         :subject => "Song Feedback Password Reminder")
  end
    
end
