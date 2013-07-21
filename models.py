__author__ = 'peterfrance'

from pymongo import MongoClient

client = MongoClient()
db = client.test
collection = db.words

class Words(object):
	PATTERN = "{word}.*"
	# def find_words(self, word):
	# 	return {word:[{'dic' : entry['name'],
	# 					'def': entry['def']} for entry in collection.find({'word' : word}).sort('dic')]}

	def find_words(self, shortcut, num=10):
		cursor = collection.find({'word': {'$regex': self.PATTERN.format(word=shortcut.capitalize())}})[:num]
		return {
			'results' : [{
				'_id' : str(doc['_id']),
				'word': doc['word'],
				'defs': doc['defs']
			} for doc in cursor]
		}


	def find_dictionary(self, dic, num = 20):
		cursor = collection.find({'name': dic}).sort('word')
		return {dic:[{'word' : next(cursor)['word'],
						'def': next(cursor)['def']} for _ in range(num)]}

words = Words()