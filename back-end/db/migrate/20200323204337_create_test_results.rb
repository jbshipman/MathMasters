class CreateTestResults < ActiveRecord::Migration[6.0]
  def change
    create_table :test_results do |t|
      t.integer :user_id
      t.integer :session_id
      t.float :test_score

      t.timestamps
    end
  end
end
