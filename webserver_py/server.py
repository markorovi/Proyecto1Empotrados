from flask import Flask, request, jsonify
import hashlib
import ctypes
import  base64
app = Flask(__name__)

lib =ctypes.CDLL('/usr/lib/libgpio.so')

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
    lib.take_picture()
    with open("/home/root/images/latest_image.jpg", "rb") as image:
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
    if request.method == 'GET': #del 1 al 5 son las luces 
        print("luces")
    elif request.method == 'POST':
        print(request.get_json())
        led = request.get_json()['id']
        val = request.get_json()['value']
        lib.digitalWrite(led, val)
    return '', 200

@app.route('/doors', methods=['GET'])
def doors():
    print("obtener estado de las puertas")
    #ultimos 4 pines son puertas
    door_1=lib.digitalRead(5)
    door_2=lib.digitalRead(6)
    door_3=lib.digitalRead(13)
    door_4=lib.digitalRead(19)
    return jsonify([{'place': 'Frontdoor', 'status': ""+str(door_1)},{'place': 'Backdoor', 'status': ""+str(door_2)},{'place': 'Frontdoor', 'status': ""+str(door_3)},{'place': 'Room 2', 'status': ""+str(door_4)}]), 200


def init():

    lib.exportPin(2)
    lib.exportPin(3)
    lib.exportPin(4)
    lib.exportPin(17)
    lib.exportPin(27)
    lib.exportPin(5)
    lib.exportPin(6)
    lib.exportPin(13)
    lib.exportPin(19)
    
    lib.pinMode(2,1)
    lib.pinMode(3,1)
    lib.pinMode(4,1)
    lib.pinMode(17,1)
    lib.pinMode(27,1)
    lib.pinMode(5,0)
    lib.pinMode(6,0)
    lib.pinMode(13,0)
    lib.pinMode(19,0)
    
    print('Pines exportados y configurados')
    
    app.run(host='0.0.0.0', port=3000)
    
    print('Servidor inicializado')


if __name__ == '__main__':
    init()
    
