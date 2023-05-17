from pymongo import MongoClient
import dns

try:
	#this user only has reading permissions on the database, update and delete can't be called
	my_client = MongoClient("mongodb+srv://reader:eUC7Z1wWT9QA98mw@salasanageneraattori.apcumhq.mongodb.net/?retryWrites=true&w=majority")
except:
	print("An error occured")
else:
	print("Good to go!")

db = my_client.salasanageneraattori

#find a word and print its unique id to make sure the connection works properly
sana = db.sanasto.find_one({"Hakusana": "aalto"})
print(sana["_id"])