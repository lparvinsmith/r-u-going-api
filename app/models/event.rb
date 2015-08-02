class Event < ActiveRecord::Base
  belongs_to :created_by, inverse_of: :events, class_name: User

  has_many :users, through: :confirmations
  has_many :confirmations #not necessary?
end
