"""
a
"""

from flask import Flask
from pymongo import MongoClient
client = MongoClient()
db = client.test
collection = db.words


app = Flask(__name__)


@app.route('/')
def hello_world():
	return 'Hello World!'


if __name__ == '__main__':
	app.run()
