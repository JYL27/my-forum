# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Post.create!([{
    id: 1,
    poster: "jy",
    title: "Hello World",
    body: "Goodbye World",
    tag: "Technology"
}, 
{
    id: 2,
    poster: "jx",
    title: "This is post number 2",
    body: "This is body number 2",
    tag: "General"
}])

Comment.create!([{
    id: 1,
    commenter: "jx",
    body: "Here's a sample comment",
    post_id: 1,
    parent_id: null
}, 
{   
    id: 2,
    commenter: "jy",
    body: "Here's a sample reply",
    post_id: 1,
    parent_id: 1
},
{   
    id: 3,
    commenter: "jx",
    body: "Here's a reply to a reply",
    post_id: 1,
    parent_id: 2
}, 
{   
    id: 4,
    commenter: "jz",
    body: "Here's another sample reply",
    post_id: 1,
    parent_id: 1
},
{   
    id: 5,
    commenter: "jy",
    body: "Here's another sample comment",
    post_id: 1,
    parent_id: null
}, 
{   
    id: 6,
    commenter: "jz",
    body: "Here's another sample reply",
    post_id: 1,
    parent_id: 5
}])
