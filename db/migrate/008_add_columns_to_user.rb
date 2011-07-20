class AddColumnsToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :score, :integer, :default => 0
    add_column :users, :commented, :integer, :default => 0
  end

  def self.down
    remove_column :users, :score
    remove_column :users, :commented
  end
end
