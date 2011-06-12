# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)


Song.update(1, {:feedbacks => 4, :overall => 3.8})
Song.update(2, {:feedbacks => 7, :overall => 3.4})
Song.update(3, {:feedbacks => 3, :overall => 1.7})
Song.update(4, {:feedbacks => 5, :overall => 4.2})
Song.update(5, {:feedbacks => 1, :overall => 5})
Song.update(6, {:feedbacks => 1, :overall => 2})
Song.update(7, {:feedbacks => 2, :overall => 3.8})