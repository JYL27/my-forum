class RemoveFromUsers2 < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :remember_created_at
  end
end
