from flask import Flask, jsonify, request
import psycopg2

from time import *
from sklearn import tree
import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style
import pandas as pd
import pandas_datareader.data as web
import time
import numpy as np
start_time = time.time()
import warnings
warnings.filterwarnings("ignore",category=DeprecationWarning)
import quandl 
import seaborn as sns 
from sklearn.model_selection import train_test_split
from statsmodels.tsa.ar_model import AR 
from timeit import default_timer as timer
from pandas_datareader import data as pdr

import fix_yahoo_finance as yf

prediction_output = '"schemastock"."stockresults"'
yf.pdr_override()

app = Flask(__name__)

user = "hckkqjvs"
password = "gpvAvyapFgZwAxaYNgKWGu4vN4mpFE7A"
host = "pellefant.db.elephantsql.com"
port = 5432
database = "hckkqjvs"

@app.route('/')
def run_functions():
  print('run_function')
  tickers = ['AMZN','KO','MSFT','GOOGL']
  connection = psycopg2.connect(user = user,
                              password = password,
                              host = host,
                              port = port,
                              database = database)
  cursor = connection.cursor()

  for idx, ticker in enumerate(tickers):
    data = pdr.get_data_yahoo("{}".format(ticker), start="2013-01-01", end="2018-12-12")
    data.reset_index(inplace=True)
    series=pd.Series(data['Close'])
    X = series.values

    model = AR(X)
    model_fit = model.fit()
    
    predictions = model_fit.predict(start=len(X), end=len(X)+30, dynamic=False)

    values = (idx+10, '{}'.format(ticker), '{}'.format(predictions.tolist()))
    query = '''INSERT INTO predictions (id, symbol, predictions) VALUES
(%s,%s,%s)'''
    cursor.execute(query, values)
    connection.commit()

  if(connection):
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed")
  return 'Home page'

@app.route('/createtable/<string:name>')
def create_table(name):
  print('create_table')
  connection = psycopg2.connect(user = user,
                            password = password,
                            host = host,
                            port = port,
                            database = database)
  cursor = connection.cursor()
  query = '''CREATE TABLE {} 
        (ID INT PRIMARY KEY   NOT NULL,
        TICKER TEXT NOT NULL,
        PREDICTIONS TEXT NOT NULL);'''.format(name)
  cursor.execute(query)

  if(connection):
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed")
  return 'finished'

@app.route('/signup', methods=['Post'])
def add_user():
  request_info = request.get_json()
  # sql call to create user in db
  try:
    connection = psycopg2.connect(user = "stock_forecast10",
                            password = "c)desm1th",
                            host = "stock-forecast.chlhnhjkv9xd.us-east-2.rds.amazonaws.com",
                            port = "5432",
                            database = "stock_forecast")
    cursor = connection.cursor()
    # Print PostgreSQL Connection properties
    print ( connection.get_dsn_parameters(),"\n")
    # Print PostgreSQL version
    cursor.execute("SELECT * FROM {}".format(request_info['username']))
    #  update user
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")
  except (Exception, psycopg2.Error) as error :
    print ("Error while connecting to PostgreSQL", error)
  finally:
    #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
  pass

@app.route('/signin', methods=['Post'])
def check_creds():
  request_info = request.get_json()
  # find user in db and confirm details
  pass

@app.route('/stocks')
def get_options():
  request_info = request.get_json()
  # select entire db of stocks
  return jsonify({'testing': 'testing'})

@app.route('/stocks/<string:stock>')
def get_store(stock):
  # return stock specific info and predictions
  pass

app.run(port=3000)