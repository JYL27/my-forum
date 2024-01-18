class Api::V1::UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        
        if user.save
            session[:user_id] = user.id
            redirect_to "/posts"
        else
            render json: user.error
        end
    end

    private

        def user_params
            params.require(:user).permit(:username)
        end
end
