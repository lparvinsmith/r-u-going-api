class User < ActiveRecord::Base
  has_many :events, inverse_of: :user
  has_many :created_events, inverse_of: :created_by, class_name: Event

  has_many :events, through: :confirmations
  has_many :confirmations

  has_secure_password
  before_create :set_token

  validates :email, uniqueness: true

  def self.login(email,password)
    user = find_by email: email
    user.login password if user
  end

  def login(password)
    authenticate(password) && set_token && save! && token
  end

  private

  def set_token
    self.token = SecureRandom.hex
  end
end
