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

ActiveRecord::Schema.define(:version => 4) do

  create_table "comments", :force => true do |t|
    t.integer  "song_id"
    t.integer  "user_id"
    t.string   "comment"
    t.integer  "thumbsup"
    t.integer  "thumbsdown"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "songs", :force => true do |t|
    t.string   "title"
    t.string   "artist"
    t.string   "description"
    t.integer  "user_id"
    t.string   "location"
    t.integer  "feedbacks"
    t.float    "overall"
    t.float    "vocals"
    t.float    "songwriting"
    t.float    "musicianship"
    t.float    "creativity"
    t.float    "production"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password"
    t.string   "email"
    t.integer  "plays"
    t.integer  "feedbacks"
    t.integer  "recs"
    t.float    "harsh"
    t.integer  "uploads"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "token"
  end

end
