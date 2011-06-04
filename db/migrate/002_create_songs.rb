class CreateSongs < ActiveRecord::Migration
  def self.up
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :description
      t.integer :user_id
      t.string :location
      t.integer :feedbacks
      t.float :overall
      t.float :vocals
      t.float :songwriting
      t.float :musicianship
      t.float :creativity
      t.float :production

      t.timestamps
    end
  end

  def self.down
    drop_table :songs
  end
end
