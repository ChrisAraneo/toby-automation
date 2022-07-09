import pyautogui
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/", methods = ['POST'])
def index():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.get_json()
        path = json['path']
        result = pyautogui.locateOnScreen(path, confidence = 0.75)
        response = {'data': {'x': int(result.left), 'y': int(result.top), 'width': int(result.width), 'height': int(result.height)}}
        return jsonify(response)
    else:
        return jsonify({'error': 'Content-Type not supported!'})

app.run()
