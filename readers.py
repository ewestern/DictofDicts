__author__ = 'peterfrance'
import re


class BaseReader(object):
	REGEX = ''
	NAME = ''
	def __init__(self, path):
		self.path = path

	def create_tree(self):
		with open(self.path, 'r') as d:
			string = d.read()
			self.tree = re.findall(self.REGEX, string)

	def create_entries(self): return [{word : (self.NAME, dfn) }for word, dfn in self.tree]

class EnglishProverbs(BaseReader):
	REGEX = r"[\d]+\.\s([A-Z]+)\.([a-zA-Z\n\s\.,]+)"
	NAME = "Dictionary of English Proverbs and Proverbial Phrases"


class FoolishDict(BaseReader):
	REGEX = r"=([A-Z ]+)=\s([\w\s\.\"\',_\-]+)"
	NAME = 'The Foolish Dictionary'
