class PasswordMailer < ActionMailer::Base
  default :from => "donotreply@songfeedback.com"
  
  def reminder_email(email)
    @password  = "specialword"
    mail(:to => email,
         :subject => "Song Feedback Password Reminder")
  end
    
end
