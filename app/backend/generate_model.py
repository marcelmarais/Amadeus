import logging
import os
import re
import sys

import pandas as pd
import yaml

import type_inference


class model():
  """The model class contains all data relevant to a model instance"""
  
  def __init__(self, train_file_path = 'train/train.csv',test_file_path = 'test/test.csv', 
               model_name = 'model', target_name = 'scalar_coupling_constant'):

    self.train_path = train_file_path
    self.test_path = test_file_path

    self.target = target_name
    self.model_name = model_name
    self.model_definition = {}
    
    self.symbols = ['`','~','!','@','#','$','%','^','&','*','(',')','-','+','=','{','[','}','|','\\',':',';','"','\'','<',',','>','.','?','/']
    try:
      self.train_data = pd.read_csv(self.train_path)
      self.train_data.columns = self.train_data.columns.str.replace(' ', '_')
      for i in self.symbols:
        self.train_data.columns = self.train_data.columns.str.replace(i,'')
      
      self.train_data.to_pickle(self.train_path.replace('.csv','.pkl'))

    except:
        print("Error reading train data:", sys.exc_info()[0])
        exit()
    
    try:
      self.test_data = pd.read_csv(self.test_path)
      self.test_data.columns = self.test_data.columns.str.lower().str.replace(' ', '_')
      for i in self.symbols:
        self.test_data.columns = self.test_data.columns.str.replace(i,'')

      self.test_data.to_pickle(self.test_path.replace('.csv','.pkl'))

    
    except:
        print("Error reading test data:", sys.exc_info()[0])
        exit()
    
    del(self.symbols)

  def make_model_file(self, name = 'model') -> None:

    self.model_definition['output_features'] = type_inference.infer_type(self.train_data,self.target,target=True)
    # Check if target is found in dataset.
    if self.model_definition['output_features'] == None:
      return None
    self.model_definition['input_features'] = type_inference.infer_type(self.train_data, self.target)
      

    #model_definition['training'] = {'batch_size':16,'epochs':1000,'early_stop':50,'learning_rate':0.001, 'optimiser':[{'type':'adam'}]}

    with open(name,mode = 'w') as f:
      f.write(yaml.dump(self.model_definition))

    return self.model_definition

  def get_model(self) -> dict:
    """Makes model file if not found"""
    if len(self.model_definition) == 0:
      self.make_model_file()

    return self.model_definition
  
  def get_descrip(self):
    desc = self.train_data.describe()
    desc = pd.DataFrame(desc.to_records()).round(1)
    return desc

  def get_train_data(self) -> pd.DataFrame:
    return self.train_data
  
  def get_test_data(self) -> pd.DataFrame:
    return self.test_data

  def __str__(self):
    n = 78
    s = '\n'
    s += 'Train'.center(n) + '\n\n' 
    s += "".center(n,'#') + '\n\n' 
    s += str(self.train_data.head(2)) + '\n'
    s += str(self.train_data.shape) + '\n'
    s += '\n'
    s += 'Test'.center(n,) + '\n\n'
    s += ''.center(n,'#') + '\n\n' 
    s += str(self.test_data.head(2)) + '\n'
    s += str(self.test_data.shape) + '\n'
    
    return s


    
if __name__ == '__main__':
  mod = model(train_file_path = 'train/train.csv')
  print(mod.get_descrip())