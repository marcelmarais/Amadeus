import json
import os
import socket
import re
import glob

import yaml
import yamlordereddictloader
from flask import Flask, jsonify, url_for, request, Response
from flask_cors import CORS, cross_origin

import generate_model
import train_model as tm

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# training_stats = json.loads(open('results/api_experiment_run_0/training_statistics.json').read())
root_dir = os.path.abspath(__file__).strip(os.path.basename(__file__))

train_csv = glob.glob(root_dir + 'train/*.csv')[0]
test_csv = glob.glob(root_dir + 'test/*.csv')[0]

model_obj = generate_model.model(train_file_path=train_csv,test_file_path=test_csv)

@app.route("/")
def test():

    html = "<h3>{name}</h3>" \
           "<b>{hostname}<br/>" 
    return html.format(name=os.getenv("NAME", "Amadeus"), hostname=socket.gethostname())

@app.route('/generate-model-file', methods=['POST'])
def generate_model_file():
    if request.method == 'POST':
        print(request.get_json())
        try:
            req = request.get_json()
            model_obj = generate_model.model(train_file_path=train_csv,test_file_path=test_csv,
                                            target_name = req['target_name'])
            global model_name
            model_name = req['model_name']+'.yaml'
        except:
            return Response({'Error':'Target name not found'},status = 404)

        model_obj.make_model_file(name = model_name)
        return '<h3>model.yaml file created</h3>'

@app.route('/model-info/', methods=['GET'])
def get_model_data():
    with open(model_name) as f:
        model_data = yaml.load(f, Loader=yamlordereddictloader.Loader)
    return json.dumps(model_data)

@app.route('/train-model/', methods=['GET'])
def train_model():
    train_obj = tm.train_model(model_name = model_name)
    train_obj.begin_train()

    return Response({'Success':'Training is completed'},status = 200)

@app.route('/training-stats/', methods=['GET'])
def get_training_stats():
    pass



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=2000, debug=True)
