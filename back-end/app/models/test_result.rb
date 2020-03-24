class TestResult < ApplicationRecord
  belongs_to :user
  belongs_to :user_question, foreign_key: 'session_id', primary_key: 'session', optional: true
end
