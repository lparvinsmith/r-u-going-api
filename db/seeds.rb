# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

%w(ljp jpl plj).each do |name|
  email = "#{name}@#{name}.com"
  next if User.exists? email: email
  User.create!(email: email, password: 'abc123', password_confirmation: 'abc123')
end

events = Event.create([
  {occurs_at: "2015-08-07 13:00", title:"Project Presentations", venue:"GA", description:"WDI students present their second projects", link:"https://generalassemb.ly/boston", user_id:1},
  {occurs_at: "2015-08-11 19:00", title:"Code For Boston: Hack Night", venue:"Cambridge Innovation Center", description:"Work on and discuss civic tech projects", link:"http://www.meetup.com/Code-for-Boston/events/223843532/", user_id:2},
  {occurs_at: "2015-08-19 18:15", title:"Women's Coding Collective: Project Night", venue:"Cambridge Innovation Center", description:"Bring your laptop, current project(s) and prepare to make some progress!", link:"http://thewc.co/?src=ubms", user_id:3}
]);
