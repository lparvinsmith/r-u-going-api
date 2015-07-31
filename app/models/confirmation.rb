class Confirmation < ActiveRecord::Base
  belongs_to :user, inverse_of: :events
  belongs_to :event, inverse_of: :users
end
