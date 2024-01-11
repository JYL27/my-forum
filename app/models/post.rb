class Post < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true
    validates :tag, presence: true
end
