class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[show destroy edit update]

  def index
    @comment = Comment.all.order(created_at: :desc)
    render json: @comment
  end

  def new
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(parent_id: params[:parent_id])
  end
  
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create!(comment_params)

    if comment
      render json: @comment
    else
      render json: @comment.errors
    end
  end

  def show
    render json: @comment
  end

  def edit
    render json: @comment
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors
    end
  end

  def destroy
    @comment.destroy
    render json: { message: 'Comment deleted!' }
  end
  
  private
    def comment_params
        params.require(:comment).permit(:commenter, :body, :parent_id)
    end

    def set_comment
        @comment = Comment.find(params[:id])
    end
end
