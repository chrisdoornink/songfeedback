class ChangeColumnsInSong < ActiveRecord::Migration
  def self.up
    change_column_default(:songs, :feedbacks, 0)
    change_column_default(:songs, :vocals, 0)
    change_column_default(:songs, :musicianship, 0)
    change_column_default(:songs, :songwriting, 0)
    change_column_default(:songs, :creativity, 0)
    change_column_default(:songs, :overall, 0)
    change_column_default(:songs, :production, 0)
    change_column_default(:songs, :location, 0)

    rename_column :songs, :feedbacks, :reviews
    rename_column :songs, :location, :totalcomments


    change_column_default(:users, :plays, 0)
    change_column_default(:users, :feedbacks, 0)
    change_column_default(:users, :recs, 0)
    change_column_default(:users, :harsh, 0)
    change_column_default(:users, :uploads, 0)

    rename_column :users, :feedbacks, :reviews
  end

  def self.down
  end
end
