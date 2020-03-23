class User < ApplicationRecord
  has_many :test_results
  
  has_many :user_questions
  has_many :questions, through: :user_questions
end
