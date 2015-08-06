class EventSerializer < ActiveModel::Serializer
  attributes :id, :occurs_at, :title, :venue, :description, :link, :confirmation_count
end
