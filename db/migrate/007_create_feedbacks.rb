class CreateFeedbacks < ActiveRecord::Migration
  def self.up
    create_table :feedbacks do |t|
      t.integer :song_id
      t.integer :user_id
      t.integer :vocals
      t.integer :songwriting
      t.integer :musicianship
      t.integer :creativity
      t.integer :production
      t.integer :overall
      t.string :comments

      t.timestamps
    end
  end

  def self.down
    drop_table :feedbacks
  end
end
