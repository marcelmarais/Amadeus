import logging
import os
import re

import pandas as pd
import yaml
from ludwig.api import LudwigModel

import type_inference

root_dir = os.getcwd()

def find_csv(dir):
  os.chdir(root_dir + '/' + dir)

  for i in os.listdir():
    if re.match(r'(.*?)\.(csv)$',i):
      file_name = dir +'/'+ i
      break
  os.chdir(root_dir)

  return file_name

try:
  train_data = pd.read_csv(find_csv('train'))
except:
  print('No train data found')
  exit()

model_definition = {}
model_definition['input_features'] = type_inference.infer_type(train_data)
model_definition['output_features'] = type_inference.infer_type(train_data,target=True)
#model_definition['training'] = {'batch_size':16,'epochs':1000,'early_stop':50,'learning_rate':0.001, 'optimiser':[{'type':'adam'}]}

with open('model.yaml',mode = 'w') as f:
  f.write(yaml.dump(model_definition))

ludwig_model = LudwigModel(model_definition)

model = LudwigModel(model_definition)
train_stats = model.train(train_data, logging_level= logging.INFO)

try:
  test_data = pd.read_csv(find_csv('test'))
  predictions = model.predict(test_data, logging_level= logging.INFO)
  predictions.to_csv('predictions.csv')
except:
  print('No test data found')

model.close()
