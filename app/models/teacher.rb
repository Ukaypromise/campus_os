class Teacher < ApplicationRecord
  belongs_to :account
  acts_as_tenant(:institution)

  accepts_nested_attributes_for :account
end
