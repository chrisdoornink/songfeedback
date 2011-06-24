class User < ActiveRecord::Base
  has_many :songs
  has_many :comments
  has_many :feedbacks
end
