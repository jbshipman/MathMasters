class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
        
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    def create
        name = params[:name]
        user = User.create(name: name)
    end

    def update
        user = User.find_by(id: params[:id])
        name = params[:name]
        user.name = name
        user.save!
    end

    def user_questions
        user = User.find_by(id: params[:id])
        render json: user.questions
    end

end
