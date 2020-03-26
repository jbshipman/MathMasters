class QuestionsController < ApplicationController
  def index
    questions = Question.all
    render json: questions
  end 

  def show
    question = Question.find_by(id: params[:id])
    render json: question
end

def update
  question = Question.find_by(id: params[:id])
  text = params[:text]
  option1 = params[:option1]
  option2 = params[:option2]
  option3 = params[:option3]
  answer_key = params[:answer_key]
  question.text = text
  question.option1 = option1
  question.option2 = option2
  question.option3 = option3
  question.answer_key = answer_key
  question.save!
end

end
