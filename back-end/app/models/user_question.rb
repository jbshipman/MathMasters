class UserQuestion < ApplicationRecord
  has_one :test_result, foreign_key: 'session_id', primary_key: 'session'
  belongs_to :user 
  belongs_to :question
  
end
