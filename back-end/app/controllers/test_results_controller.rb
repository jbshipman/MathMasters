class TestResultsController < ApplicationController
    def index
        testresults = TestResult.all
        render json: testresults
    end 
    
    def show
        testresult = TestResult.find_by(id: params[:id])
        render json: testresult
    end

    def create
        user_id = params[:user_id]
        test_score = params[:test_score]
        session = params[:session_id]
        testresult = TestResult.create(user_id: user_id, test_score: test_score, session_id: session)
    end 
end
