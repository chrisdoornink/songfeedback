class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :email
      t.integer :plays
      t.integer :feedbacks
      t.integer :recs
      t.float :harsh
      t.integer :uploads

      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
