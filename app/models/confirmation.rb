class Confirmation < ActiveRecord::Base
  belongs_to :user, inverse_of: :events
  belongs_to :event, inverse_of: :users

  validates_uniqueness_of :user_id, :scope => :event_id
end
