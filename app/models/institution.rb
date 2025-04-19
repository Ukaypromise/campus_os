class Institution < ApplicationRecord
  acts_as_tenant

  belongs_to :account
  has_many :teachers, dependent: :destroy

  validates :name, :phone_number, :contact_email, :website, :address, :city, :state, :country, presence: true
end
