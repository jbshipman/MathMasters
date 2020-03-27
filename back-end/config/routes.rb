Rails.application.routes.draw do
  resources :user_questions
  resources :questions
  resources :test_results
  resources :users
  get '/users/:id/questions', :to => 'users#user_questions'
  patch '/questions/post/:id', :to => 'questions#mark_for_review'
  # patch 'questions/:id', :to => 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
