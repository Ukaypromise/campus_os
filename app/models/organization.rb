class Organization < ApplicationRecord
  belongs_to :account



  validates :name, :address, :city, :state, :country, :phone_number,  :website, :zip, presence: true
end
