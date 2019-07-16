import pandas as pd

def infer_type(df, target = False) -> dict:
  feature_columns = list(df.drop(axis = 1,columns = ['target']))
  all_ludwig_types = []
  types = df.infer_objects().dtypes

  if target:
    to_iter = df.drop(axis = 1, columns = feature_columns)
  else:
    to_iter = feature_columns
    
  for i in to_iter:
    current_type = types[i]
    col = df[i]
    
    if current_type == 'int64':
      if set(col)=={0,1}:
          ludwig_type = {'name': i, 'type': 'binary'}    
      else:
          ludwig_type = {'name': i, 'type': 'numerical'}    
    
    elif current_type =='float64':
      ludwig_type = {'name': i, 'type': 'numerical'}
    
    elif current_type == 'object':
        try:
          for j in col:
            float(j)
          ludwig_type = {'name': i, 'type': 'numerical'}    

        except:
            if len(list(col)) == len(set(col)):
                ludwig_type = {'name': i, 'type': 'text'}
            else:
                ludwig_type = {'name': i, 'type': 'category'}

        #ludwig_type = {'name': i, 'type':'text'}
    
    elif current_type == 'bool':
        ludwig_type = {'name': i, 'type': 'bool'}



    all_ludwig_types.append(ludwig_type)

  return all_ludwig_types


if __name__ == '__main__':
  print(infer_type(pd.read_csv('train.csv'),target = True))
  
  