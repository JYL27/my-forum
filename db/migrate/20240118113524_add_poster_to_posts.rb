class AddPosterToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :poster, :string
  end
end
