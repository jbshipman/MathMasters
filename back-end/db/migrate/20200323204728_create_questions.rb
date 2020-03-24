class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :text
      t.string :option1
      t.string :option2
      t.string :option3
      t.string :answer_key
      t.string :difficulty
      t.boolean :review
      t.string :user_answer

      t.timestamps
    end
  end
end
