class Post < ApplicationRecord
    has_many :comments
    
    validates :title, presence: true
    validates :body, presence: true
    validates :tag, presence: true
end
