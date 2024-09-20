"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register():

    # Solicitud (request)
    data = request.get_json()

    # Verifica que no se envíen campos vacíos 
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email or Password can't be empty"}), 400
    
    # Chequea que el email enviado no se encuentre ya registrado en la BD
    check_email = User.query.filter_by(email = data["email"]).first()
    if check_email:
        return jsonify({"error": "Email address already exists"}), 409
    
    # Toma la contraseña y la hashea
    hashed_password = generate_password_hash(data["password"])

    # Instanciación del nuevo usuario
    user = User(
        email = data["email"],
        password = hashed_password,
        is_active = True
    )

    # Guarda el usuario en la BD
    db.session.add(user)
    db.session.commit()

    # Generacion del access_token para que el usuario que se registra
    # quede con la sesión iniciada
    access_token = create_access_token(
        identity = data.get("email"),
        expires_delta = timedelta(hours=12)
    )

    # Respuesta (Response)
    response_body = {
        "msg": "New user created",
        "results": {
            "user": user.serialize(), 
            "access_token": access_token
        }
    }

    return jsonify(response_body), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Verifica que no se envíen campos vacíos 
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email and password are required"}), 400

    # Busca en la bd el correo recibido de la request
    user = User.query.filter_by(email = data["email"]).first()

    # Verifica que exista el usuario
    if user is None:
        return jsonify({"msg": "This email is not registered"}), 404
    
    # Verifica que el usuario esté activo
    if user.is_active is False:
        return jsonify({"msg": "This user is not active"}), 400

    # Verifica que la contraseña recibida en la request sea correcta
    if not check_password_hash(user.password, data.get("password")):
        return jsonify({"msg": "Wrong password"}), 401

    # Crea el access_token una vez haya pasado por los filtros anteriores
    access_token = create_access_token(
        identity = data.get("email"),
        expires_delta = timedelta(hours=12)
    )

    response_body = {
        "msg": "The login was successful",
        "results": {
            "access_token": access_token, 
            "user":user.serialize()
        }   
    }
    
    # Retorna el token y el ususario 
    return jsonify(response_body), 200


@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():

    try:
        # Obtiene la identidad del token JWT
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user).first()

        # Verifica si el usuario existe
        if user is None:
            return jsonify({"msg": "User not found"}), 404

        # Devuelve la información del usuario si existe
        return jsonify(user.serialize()), 200

    except SQLAlchemyError as e:
        # Captura errores de la base de datos y devuelve una respuesta adecuada
        return jsonify({"error": "Database error", "details": str(e)}), 500
    
    except Exception as e:
        # Captura cualquier otra excepción y devuelve una respuesta 500
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500