"""
a
"""

from flask import Flask, render_template, request, jsonify
import random
from models import words


app = Flask(__name__)
TAGS = {
"The Utter and Heartbreaking Stupidity": "http://en.wikipedia.org/wiki/Mosquitoes_(novel)",
"From the Beginning." : "http://en.wikipedia.org/wiki/John_1:1",
"Strain, Crack and Sometimes Break" : "http://www.artofeurope.com/eliot/eli5.htm"
}


@app.route('/')
def main():
	tag, link = random.choice(TAGS.items())
	return render_template('index.html', **{'title': tag, 'link': link})

@app.route("/partial/<word>", methods = ['GET'])
def get_shortcut(word):
	return jsonify(**words.find_words(word))

@app.route('/words/<word>', methods = ['GET'])
def get_word(word):
	return jsonify(**words.find_words(word))

@app.route('/dictionary')
def get_dictionary(dictionary):
	return jsonify(**words.find_dictionary(dictionary))

if __name__ == '__main__':
	app.debug = True
	app.run()
