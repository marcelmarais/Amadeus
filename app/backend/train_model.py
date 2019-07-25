import glob
import logging
import os
import re
from colorama import Fore, Style

import pandas as pd
import yaml
import yamlordereddictloader
from ludwig.api import LudwigModel


class train_model():
  def __init__(self,model_name = 'model.yaml'):
    self.root_dir = os.path.abspath(__file__).strip(os.path.basename(__file__))
    self.train_df = pd.read_pickle(glob.glob(self.root_dir + 'train/*.pkl')[0])

    try:
      with open(model_name) as f:
              self.model_definition = yaml.load(f, Loader=yamlordereddictloader.Loader)

      self.ludwig_model = LudwigModel(self.model_definition)
      print(f'\n{Fore.GREEN}"{model_name}" successfully loaded.{Style.RESET_ALL}\n')

    except:
      print(f'\n{Fore.RED}The file "{model_name}" could not be loaded.{Style.RESET_ALL}\n')
      exit()

  def begin_train(self):
    train_stats = self.ludwig_model.train(self.train_df, logging_level= logging.INFO)

  def make_predictions(self):
    try:
      test_data = pd.read_pickle(glob.glob(self.root_dir + 'test/*.pkl')[0])
      predictions = self.ludwig_model.predict(test_data, logging_level= logging.INFO)
      predictions.to_csv('predictions.csv')
      self.ludwig_model.close()
    except:
      print(f'\n{Fore.RED}No test file could not be found.{Style.RESET_ALL}\n')

if __name__ == '__main__':
  tm = train_model(model_name= 'herefile.yaml')
  tm.begin_train()