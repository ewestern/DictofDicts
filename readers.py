__author__ = 'peterfrance'
import re


class BaseReader(object):
	REGEX = ''
	NAME = ''
	PATH = ''
	def create_entries(self):
		with open(self.PATH, 'r') as d:
			string = d.read()
			tree = re.findall(self.REGEX, string)
		self.entries = [{'word' : word.capitalize(),
						'dic' : self.NAME,
						'def' : ' '.join(dfn.split())}
							for word, dfn in tree]
	def coll_insert(self, collection):
		for doc in self.entries:
			collection.update({'word': doc['word']},
				{'$push' :
					{"defs": {
						'dic' : doc['dic'],
						'def' : doc['def']
						}
					}
				},
				upsert = True
			)


class EnglishProverbs(BaseReader):
	REGEX = r"[\d]+\.\s([A-Z]+)\.([a-zA-Z\n\s\.,]+)"
	NAME = "Dictionary of English Proverbs and Proverbial Phrases"
	PATH = "static/dicts/english_proverbs.txt"

class FoolishDict(BaseReader):
	REGEX = "=([A-Z ]+)=[\s]+[\[Illustration\]]*[\s]*([\w\s;,-\.\"\'!]+)"
	NAME = 'The Foolish Dictionary'
	PATH = "static/dicts/foolish_dict.txt"