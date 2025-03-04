class CreateOrganizations < ActiveRecord::Migration[8.0]
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :phone_number
      t.string :contact_email
      t.string :website
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
