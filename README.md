Markov text generation following the Danial Shiffman's Coding Train Coding challenge
number 42

it really works well for generating texts with ngrams.  

a smaller order like 2 produces English like nonsense

an order of 3 will produce some pretty readable original text with some interesting portmanteaux

different texts will produce better or worse results by moving the  ngram order from 3 to 4

for example I am using the Allen Ginsberg poem Howl.  The first part produces nicer readable variations using ngram 3

but the second part about Moloch produces better results with an ngram of 4

It is also important to consider the start of the generative text

Here I am only using the start of the seed text with whatever order length

or a ngram I am sure the seed text has such as "the"

``` javascript

let currentGram =txt.substring(0,order);
let currentGram ="the"
```


What makes the algorithm stop?  There can be two reasons if a key has a value that is '' (empty, not even a space) or just one of its values are empty. if the end of your text file does not have a space after it. it will easily have a value that is ''   I have put in a console log when this happens.  


With short texts you can avoid undefined ngrams by repeating the first part of the passage at the end

let txt= "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. It was"


## current version

this is using a short novel I wrote about my childhood to generate the texts.  it is more than 50,000 words  so it has a lot to work with

I am dong my n-grams by character not by word  and as the source text is quite long I can get away with using a larger n for my n-gram. this version is a 10-gram that produces a lot of almost-sense out put

## word version

for the n-gram by word. One must clean the text of white space and other characters you may not want

however Periods, some other punctuation and capitals letters are important. 

as an example after a period you are likely to have various capitals. 

A certain aspect of meaning and logic of the source text is captured with their markov probability 


if you open up the console you can see the current gram and the possible choices and traces the path of the generated text

if you open up the object that holds the language model, it may eat up all your ram, so be careful

