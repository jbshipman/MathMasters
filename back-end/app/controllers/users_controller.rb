class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
        
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    def user_questions
        user = User.find_by(id: params[:id])
        render json: user.questions
    end

end
