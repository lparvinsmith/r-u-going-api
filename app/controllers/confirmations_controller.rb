class ConfirmationsController < ApplicationController

  def index
    # render json: Confirmation.all
    if params[:event_id]
      render json: Confirmation.where(event_id: params[:event_id])
    elsif params[:user_id]
      render json: Confirmation.where(user_id: params[:user_id])
    else
      render json: Confirmation.all
    end
  end

  def create
    confirmation = Confirmation.create(confirmation_params)
    # confirmation.created_by = current_user # necessary?
    if confirmation.save
      render json: confirmation
    else
      render json: confirmation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    confirmation = Confirmation.find(params[:id])
    confirmation.destroy
    head :ok
  end

  private
  def confirmation_params
    params.require(:confirmation).permit(:event_id, :user_id)
  end
end
