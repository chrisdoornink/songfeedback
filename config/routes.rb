Songfeedback::Application.routes.draw do

  get "authentication/login"
  get "authentication/logout"
  post "authentication/login"
  get "authentication/register"
  post "authentication/register"
  get "authentication/forgot_password"
  get "authentication/send_reminder"

  get "myfeedback/index"
  get "myfeedback/mysongs"
  get "myfeedback/upload"
  post "myfeedback/create"
  get "myfeedback/success"

  get "songs/index"
  get "songs/show"
  get "songs/recent"
  get "songs/least_rated"
  get "songs/top"
  get "songs/random"
  get "songs/genre"
  post "songs/feedback"
  post "songs/override"
  post "songs/leave_comment"
  get "songs/current_stats"

  get "welcome/index"
  get "welcome/show"
  get "welcome/user_stats"
  get "welcome/about"
  get "welcome/contact"
  get "welcome/send_contact_message"
  get "welcome/terms"
  get "welcome/privacy"

  match "songs/:id" => "songs#show"

  root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"
end