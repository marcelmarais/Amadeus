import logging
import os
import re

import pandas as pd

from ludwig.api import LudwigModel

import generate_model

root_dir = os.getcwd()

def find_csv(dir):
  """Returns the csv file found within specified directory"""
  os.chdir(root_dir + '/' + dir)

  for i in os.listdir():
    if re.match(r'(.*?)\.(csv)$',i):
      file_name = dir +'/'+ i
      break
  os.chdir(root_dir)

  return file_name

model_obj = generate_model.model(find_csv('train'),find_csv('test'))
model_definition = model_obj.get_model()

ludwig_model = LudwigModel(model_definition)

model = LudwigModel(model_definition)
train_stats = model.train(model_obj.get_train_data(), logging_level= logging.INFO)

try:
  test_data = model_obj.get_test_data()
  predictions = model.predict(test_data, logging_level= logging.INFO)
  predictions.to_csv('predictions.csv')
except:
  print('No test data found')

model.close()
