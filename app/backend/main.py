import logging
import os
import re

import pandas as pd

from ludwig.api import LudwigModel

import generate_model

root_dir = os.path.abspath(__file__).strip(os.path.basename(__file__))

def find_csv(dir):
  """Returns the csv file found within specified directory"""

  for i in os.listdir(root_dir + '/' + dir):
    print(i)
    if re.match(r'(.*?)\.(csv)$',i):
      file_name = root_dir + dir +'/'+ i
      break

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
