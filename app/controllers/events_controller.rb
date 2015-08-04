class EventsController < ApplicationController
  def index
    render json: Event.all
  end

  def create
    event = Event.new(event_params)
    event.created_by = current_user
    if event.save
      render json: event
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end


  private
  def event_params
    params.require(:event).permit(:occurs_at, :title, :venue, :user_id, :description)
  end
end
