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
    end 
end
