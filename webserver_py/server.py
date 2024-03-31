from flask import Flask, request, jsonify
import bcrypt
import ctypes
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
    "password": "$2b$10$4VaJV0rjgtg6/AxbGuZkgeWudjn3RF3GSZNBRx7FDx15Z8EYGcNje"

}
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username == default_user['username']:
        if bcrypt.checkpw(password.encode('utf-8'), default_user['password'].encode('utf-8')):
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
