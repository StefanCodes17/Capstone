#Sadab Hafiz
#Contains functions to correct misspelled words based on edit distance and jaccard distance
#Uses functions from nltk library
#TODO: NEED TO DEAL WITH NONALPHANUMERIC SYMBOLS THAT MAY APPEAR

#Import required modules
import nltk
from nltk.metrics.distance  import edit_distance
from nltk.metrics.distance import jaccard_distance
from nltk.tokenize import word_tokenize
from nltk.util import ngrams
'''
Read words from "words_alpha.txt" and store them in word_bank
'''
def readWordBank():
    word_bank=[]
    with open('documents/words_alpha.txt','r') as file:
        word_bank=file.readlines()
    #Get rid of endline characters from words in word_bank
    word_bank=set([word.strip() for word in word_bank])
    return word_bank
'''
Separate words in the dictionary_string and return as a set
'''
def readUserDictionary(dictionary_string):
    #Get rid of endline characters from words in word_bank
    user_dictionary=set(dictionary_string.split())
    return user_dictionary

'''
Takes a string and checks if it has atleast one numeric character
returns True if numeric character is found, otherwise returns false
'''
def hasNum(query_word):
    if(not query_word):
        return False
    #check if any character in query_word is a number using isdigit() function
    return any(ch.isdigit() for ch in query_word)

'''
Spellcheck using edit distance metric
returns an array of suggested replacement for query word
'''
def edSpellCorrect(query_word,dictionary_string,words_count=1):
    #Returns empty array if given word is empty or null
    if(not query_word):
        return []
    
    word_bank=readWordBank()
    user_dictionary=readUserDictionary(dictionary_string)

    query_word=query_word.lower()
    if(query_word in word_bank) or (hasNum(query_word) or (query_word in user_dictionary)):
        return []

    distances=[(edit_distance(query_word,word),word) for word in word_bank]
    distances.extend([(edit_distance(query_word,word),word) for word in user_dictionary])

    distances=sorted(distances,key=lambda x:x[0])
    correct_words=[(distance[1])for distance in distances[:words_count]]
    return correct_words

'''
Spellcheck using jaccard distance metric
returns an array of suggested replacement for query word
'''
def jdSpellCorrect(query_word,dictionary_string,words_count=1):
    #Returns empty array if given word is empty or null
    if(not query_word):
        return []
    word_bank=readWordBank()
    user_dictionary=readUserDictionary(dictionary_string)
    
    query_word=query_word.lower()
    if(query_word in word_bank) or (hasNum(query_word) or (query_word in user_dictionary)):
        return []

    distances = [(jaccard_distance(set(ngrams(query_word, 2)),set(ngrams(word, 2))),word)
                 for word in word_bank]

    distances.extend([(jaccard_distance(set(ngrams(query_word, 2)),set(ngrams(word, 2))),word)
                      for word in user_dictionary])
    
    distances=sorted(distances, key = lambda x:x[0])
    correct_words=[(distance[1])for distance in distances[:words_count]]
    return correct_words

'''
Adds words from list_of_words to "words_alpha.txt"
'''
def updateWordBank(list_of_words):
    if(not list_of_words):
        return
    file=open('words_alpha.txt','r+')
    count=0
    word_bank=readWordBank()
    for word in list_of_words:
        word=word.strip().lower()
        if(not word) or (word in word_bank):
            continue
        file.write(word+'\n')
    file.close()
    print(count,"words added to word bank.")

'''
Returns true if query_word is found in word_bank
'''
def wordInWordBank(query_word):
    return (query_word.lower().strip() in readWordBank())



