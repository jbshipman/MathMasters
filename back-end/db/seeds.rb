# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# clear out all seeded data before re-seed
Question.destroy_all
User.destroy_all

# Questions
questions = [
  {text:'1 + 1', option1:'1', option2:'2', option3:'3', answer_key:'2', difficulty:0, review:0},
  {text:'4 + 1', option1:'1', option2:'5', option3:'3', answer_key:'5', difficulty:0, review:0},
  {text:'13 - 14', option1:'1', option2:'2', option3:'-1', answer_key:'-1', difficulty:0, review:0},
  {text:'-1 - 18', option1:'-17', option2:'-19', option3:'19', answer_key:'-19', difficulty:0, review:0},
  {text:'3.14 + 0.0015', option1:'3.1415', option2:'2', option3:'3', answer_key:'3.1415', difficulty:0, review:0},
  {text:'999 + -9999', option1:'9999', option2:'-9000', option3:'3', answer_key:'-9000', difficulty:0, review:0},
  {text:'18 + 56', option1:'74', option2:'2', option3:'3', answer_key:'74', difficulty:0, review:0},
  {text:'29 - 18', option1:'10', option2:'11', option3:'12', answer_key:'11', difficulty:0, review:0},
  {text:'3.14 + 1.68', option1:'4.82', option2:'4.81', option3:'4.89', answer_key:'4.82', difficulty:0, review:0},
  {text:'19 + 19 + 39', option1:'76', option2:'77', option3:'78', answer_key:'77', difficulty:0, review:0},
  {text:'2 + -3', option1:'-1', option2:'2', option3:'3', answer_key:'-1', difficulty:0, review:0},
  {text:'76 + 18 -34 +72', option1:'132', option2:'123', option3:'213', answer_key:'132', difficulty:0, review:0},
  {text:'-0.123456789 + -0.123456789', option1:'-0.246913578', option2:'0', option3:'0.8676309', answer_key:'-0.246913578', difficulty:1, review:0},
  {text:'13 + 18 + 20 - 100 + 19', option1:'30', option2:'27', option3:'-30', answer_key:'-30', difficulty:1, review:0},
  {text:'14 - 15 + 11.3 - 3.11 + 19', option1:'26.19', option2:'27', option3:'-26.13', answer_key:'26.19', difficulty:1, review:0},
  {text:'0.1 + -15 + 11.3 + 3.11 + 19', option1:'26.19', option2:'18.51', option3:'-26.13', answer_key:'18.51', difficulty:1, review:0},
  {text:'3 * 3 * 3', option1:'9', option2:'27', option3:'6', answer_key:'27', difficulty:1, review:0},
  {text:'((3 * 3) + 3) / 3', option1:'9', option2:'3', option3:'4', answer_key:'4', difficulty:1, review:0},
  {text:'cube root of 8', option1:'9', option2:'2', option3:'4', answer_key:'2', difficulty:1, review:0},
  {text:'(3 + 4)(3 + 4)', option1:'14', option2:'25', option3:'49', answer_key:'49', difficulty:1, review:0},
  {text:'(x + y)(x - y)', option1:'x^2 - y^2', option2:'x^2 +2xy + y^2', option3:'-x^2+2xy -y^2', answer_key:'x^2 - y^2', difficulty:1, review:0},
]
questions.each {|question| Question.create(question)}

# Users
users = [
  {name:'Raven'},
  {name:'Robert'},
  {name:'Celeste'},
  {name:'Mother of Dragons'},
  {name:"John 'I Know Nothing' Snow"},
  {name:'Puck'},
  {name:'Oberon'}
]
users.each {|user| User.create(user)}