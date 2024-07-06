"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import uuid
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/token',methods=['POST', 'GET'])
def create_token():
    email=request.json.get('email', None) 
    password=request.json.get('password', None)        

    user = User.query.filter_by(email=email, password=password).first()
    user = user.serialize()
    token= create_access_token(identity= user['id'])

    return jsonify({'token':token, 'user': user}),200
   
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    id_user=get_jwt_identity()
    user=User.query.get(id_user)
    user=user.serialize()
    return jsonify({'use': user})

