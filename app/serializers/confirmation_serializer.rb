class ConfirmationSerializer < ActiveModel::Serializer
  attributes :id

  # def users_confirmed
  #   if object.users
  #     object.users.map {|user| user.email }
  #   end
  # end

end
