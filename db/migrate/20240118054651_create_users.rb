class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :username, :string
    remove_column :users, :name
    remove_column :users, :email
    remove_column :users, :password_digest
  end
end
