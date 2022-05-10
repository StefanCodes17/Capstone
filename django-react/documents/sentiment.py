#contains functions that cleans and tranforms raw text to find their sentiment analysis

#import required modules
import pandas as pd
import re
import nltk
#when below dowloaded one time you can comment it out
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')
from nltk import tokenize
from nltk.corpus import wordnet
from nltk import pos_tag
from nltk.stem import WordNetLemmatizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


def cleaning(column):
    #delete consecutive letters that exceed the length of 2 because it's not common
    column =  re.sub(r"(\w)\1+(\w)\2+", r"\1\2", column)
    #change all contracted words into two words (eliminate apostrophes)
    column = re.sub(r'\'t', ' not', column)
    column = re.sub(r'\'re', ' are', column)
    column = re.sub(r'\'s', ' is', column)
    column = re.sub(r'\'d', ' would', column)
    column = re.sub(r'\'ll', ' will', column)
    column = re.sub(r'\'ve', " have", column)
    column = re.sub(r'\'m', ' am', column)
    #remove all symbols and numbers. keep only alphabet characters
    column = re.sub('[^A-Za-z ]+', '', column)
    return column

#assign part of speech tags to each word in a sentence
def pos_tagging(text):
    pos_dict = {'J':wordnet.ADJ, 'V':wordnet.VERB, 'N':wordnet.NOUN, 'R':wordnet.ADV}
    tags = pos_tag(tokenize.word_tokenize(text))
    tagged_words = []
    for word, tagged_pos in tags:
        tagged_words.append(tuple([word, pos_dict.get(tagged_pos[0])]))
    return tagged_words

#if neccessary, change form of words into root form
def lemmatize(pos_data):
    lemma_str = ''
    for word, tagged_pos in pos_data:
        #if tag is associated with the word, change the word to root form, otherwise keep word
        if tagged_pos:
            lemma_str = lemma_str + ' ' + WordNetLemmatizer().lemmatize(word, pos=tagged_pos)
        else:
            lemma_str = lemma_str + ' ' + word
    return lemma_str

#return raw numerical sentiment score
def vadersentimentanalysis(text):
    score = SentimentIntensityAnalyzer().polarity_scores(text)
    return score['compound']

#return analysis of sentiment score
def analysis(score):
    if score < -0.1:
        return 'Negative'
    elif score > 0.1:
        return 'Positive'
    else:
        return 'Neutral'


def find_sentiment(text):
    #separate text into sentences
    data = tokenize.sent_tokenize(text.lower())

    #store and manipulate data through a DataFrame
    df = pd.DataFrame(data, columns=['Start String'])
    df['Cleaned String'] = df['Start String'].apply(cleaning)
    df['POS tagged'] = df['Cleaned String'].apply(pos_tagging)
    df['Lemma'] = df['POS tagged'].apply(lemmatize)

    new_df = df[['Start String', 'Cleaned String', 'Lemma']]

    new_df['Vader Sent'] = new_df['Lemma'].apply(vadersentimentanalysis)
    new_df['Vader Analysis'] = new_df['Vader Sent'].apply(analysis)

    #return both analysis and raw sentiment
    return [analysis(new_df["Vader Sent"].mean()), new_df['Vader Sent'].mean()]