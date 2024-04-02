from flask import Flask, request, jsonify
import hashlib
import ctypes
import  base64
app = Flask(__name__)

lib =ctypes.CDLL('./libhello.so')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200') #2000 puerto del app
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
default_user={
    "username": "emp@tec.cr",
    "password": "49c195bce80e52ab0a8acaf126a6ec7e28bb061eda4aa01e0c6b68139ab5b863"
}
def encryptar(password):
    password_bytes = password.encode('utf-8')
    hash_object = hashlib.sha256()
    hash_object.update(password_bytes)
    hashed_password = hash_object.hexdigest()
    return hashed_password
@app.route('/cam', methods=['GET'])
def getImage():
    with open("image.jpg", "rb") as image:
        encoded_string=base64.b64encode(image.read()).decode('utf-8')
        return jsonify({'image':encoded_string}),200
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username == default_user['username']:
        if encryptar(password) == default_user['password']:
            return jsonify({'mensaje': 'acceso permitido'}), 200
        else:
            return 'acceso denegado contrasenia incorrecta', 401
    else:
        return 'acceso denegado usuario no coincide', 401

@app.route('/lights', methods=['GET', 'POST'])
def lights():
    if request.method == 'GET':
        print("luces")
    elif request.method == 'POST':
        print(request.get_json())
    return '', 200

@app.route('/doors', methods=['GET'])
def doors():
    lib.hello_world()
    print("obtener estado de las puertas")
    return '', 200

@app.route('/cam', methods=['GET'])
def cam():
    print("tomando foto")
    return '', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
