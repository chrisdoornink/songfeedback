# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 8) do

  create_table "comments", :force => true do |t|
    t.integer  "song_id"
    t.integer  "user_id"
    t.string   "comment"
    t.integer  "thumbsup"
    t.integer  "thumbsdown"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "feedbacks", :force => true do |t|
    t.integer  "song_id"
    t.integer  "user_id"
    t.integer  "vocals"
    t.integer  "songwriting"
    t.integer  "musicianship"
    t.integer  "creativity"
    t.integer  "production"
    t.integer  "overall"
    t.string   "comments"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "songs", :force => true do |t|
    t.string   "title"
    t.string   "artist"
    t.string   "description"
    t.integer  "user_id"
    t.string   "totalcomments",      :default => "0"
    t.integer  "reviews",            :default => 0
    t.float    "overall",            :default => 0.0
    t.float    "vocals",             :default => 0.0
    t.float    "songwriting",        :default => 0.0
    t.float    "musicianship",       :default => 0.0
    t.float    "creativity",         :default => 0.0
    t.float    "production",         :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "audio_file_name"
    t.string   "audio_content_type"
    t.integer  "audio_file_size"
    t.datetime "audio_updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password"
    t.string   "email"
    t.integer  "plays",      :default => 0
    t.integer  "reviews",    :default => 0
    t.integer  "recs",       :default => 0
    t.float    "harsh",      :default => 0.0
    t.integer  "uploads",    :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "token"
    t.integer  "score",      :default => 0
    t.integer  "commented",  :default => 0
  end

end
