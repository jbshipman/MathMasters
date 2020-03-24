class UserQuestion < ApplicationRecord
  has_one :test_result
  belongs_to :user 
  belongs_to :question
  
end
