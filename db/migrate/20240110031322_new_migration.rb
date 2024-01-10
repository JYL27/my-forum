class NewMigration < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :image
  end
end
