class Institution < ApplicationRecord
  belongs_to :account

  validates :name, :phone_number, :contact_email, :website, :address, :city, :state, :country, presence: true
end
