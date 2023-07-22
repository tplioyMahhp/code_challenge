from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# venv\Scripts\activate

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
ma=Marshmallow(app)

class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer,primary_key=True)
    habito = db.Column(db.String(100))
    hora = db.Column(db.String(100))
 
    def __init__(self,habito,hora):
        self.habito=habito
        self.hora=hora

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','habito','hora')
 
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/listhabitos',methods =['GET'])
def listhabitos():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)

@app.route('/detalheshabitos/<id>',methods =['GET'])
def detalheshabitos(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)

@app.route('/atualizarhabito/<id>',methods = ['PUT'])
def atualizarhabito(id):
    user = Users.query.get(id)
 
    habito = request.json['habito']
    hora = request.json['hora']
 
    user.habito = habito
    user.hora = hora
 
    db.session.commit()
    return user_schema.jsonify(user)

@app.route('/deletarhabito/<id>',methods=['DELETE'])
def deletarhabito(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)

@app.route('/addhabito',methods=['POST'])
def addhabito():
    habito = request.json['habito']
    hora = request.json['hora']

    users = Users(habito, hora)
    db.session.add(users)
    db.session.commit()

    return user_schema.jsonify(users)