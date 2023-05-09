//let txt ="What sphinx of cement and aluminum bashed open their skulls and ate up their brains and imagination? Moloch! Solitude! Filth! Ugliness! Ashcans and unobtainable dollars! Children screaming under the stairways! Boys sobbing in armies! Old men weeping in the parks! Moloch! Moloch! Nightmare of Moloch! Moloch the loveless! Mental Moloch! Moloch the heavy judger of men! Moloch the incomprehensible prison! Moloch the crossbone soulless jailhouse and Congress of sorrows! Moloch whose buildings are judgment! Moloch the vast stone of war! Moloch the stunned governments! Moloch whose mind is pure machinery! Moloch whose blood is running money! Moloch whose fingers are ten armies! Moloch whose breast is a cannibal dynamo! Moloch whose ear is a smoking tomb! Moloch whose eyes are a thousand blind windows! Moloch whose skyscrapers stand in the long streets like endless Jehovahs! Moloch whose factories dream and croak in the fog! Moloch whose smoke-stacks and antennae crown the cities! Moloch whose love is endless oil and stone! Moloch whose soul is electricity and banks! Moloch whose poverty is the specter of genius! Moloch whose fate is a cloud of sexless hydrogen! Moloch whose name is the Mind! Moloch in whom I sit lonely! Moloch in whom I dream Angels! Crazy in Moloch! Cocksucker in Moloch! Lacklove and manless in Moloch! Moloch who entered my soul early! Moloch in whom I am a consciousness without a body! Moloch who frightened me out of my natural ecstasy! Moloch whom I abandon! Wake up in Moloch! Light streaming out of the sky! Moloch! Moloch! Robot apartments! invisible suburbs! skeleton treasuries! blind capitals! demonic industries! spectral nations! invincible madhouses! granite cocks! monstrous bombs! They broke their backs lifting Moloch to Heaven! Pavements, trees, radios, tons! lifting the city to Heaven which exists and is everywhere about us! Visions! omens! hallucinations! miracles! ecstasies! gone down the American river! Dreams! adorations! illuminations! religions! the whole boatload of sensitive bullshit! Breakthroughs! over the river! flips and crucifixions! gone down the flood! Highs! Epiphanies! Despairs! Ten years’ animal screams and suicides! Minds! New loves! Mad generation! down on the rocks of Time! Real holy laughter in the river! They saw it all! the wild eyes! the holy yells! They bade farewell! They jumped off the roof! to solitude! waving! carrying flowers! Down to the river! into the street!"

//let txt = "I saw the best minds of my generation destroyed by madness, starving hysterical naked, dragging themselves through the streets at dawn looking for an angry fix, angelheaded hipsters burning for the ancient heavenly connection to the starry dynamo in the machinery of night I saw"
// I repeated the words and it does not run out of possibilities 
//let txt ="I-saw-the-best-minds-of-my-generation-destroyed-by-madness-"
//let txt =" l i f e "
//let txt= "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. It was"
//let txt ="the theremin is theirs. ok? yes, it is. this is a theremin."
let order =2;
let ngrams ={};
let button;
let foo = new p5.Speech();
let ld;  // for loading the the text files as a list of strings
let pholder;
let sel;
let nholder;

 let txt;
 let txta; // an array to hold the split text

function preload(){
   //ld = loadStrings("genesis.txt")
   ld = loadStrings("hoenoquote.txt")
   //ld = loadStrings("frost.txt")
   //ld = loadStrings("airst.txt")

  
  
  
}
// javascript object ngram and array that follows it

function setup() {
    noCanvas();
    //nslide = createSlider(1, 10, 5, 1)
    //nslide.changed(makeLM)
    sel = createSelect();
     
    sel.option(4);
    sel.option(3);
    sel.option(2);
    sel.option(1);
    sel.selected(1);
    sel.changed(makeLM)
    button = createButton("generate")
    button.mouseReleased(markovit)
    nholder = createP("n = "+sel.option())
    pholder =createP("OUTPUT")
    print(sel.option())
    print(ld)
    //clean the text and put it into an array
    txt = ld.join(" ")  // convert the list of strings into one big string
    let txt2 =txt.replace(/[\/#$%\^&\*;:{}=\-_`'"~()]/g,"")// take out some punctuation not .?!,
    print(txt2)
    txta= splitTokens(txt2)
    print("array l",txta.length)

    print("bing",txta)
    makeLM();
  
}


function makeLM(){
  // needed to clear the object
  ngrams ={}
  // get the order from select
  order = parseInt(sel.value())
  
  print("order",order)
  for (let i=0; i<(txta.length)-order; i++){
    
    let gram = txta.slice(i,i+order).join(' ');
    //print(gram)
    
    if(!ngrams[gram]){
      //when I find a new n gram make an array to be the value of the key
      ngrams[gram] =[];
      
      
    } 
    // always push the the word that follows the n gram
     if (txta[i+order]=== undefined){ // but if it has no value push a space
      ngrams[gram].push(' ')
      }else{
      ngrams[gram].push(txta[i+order])
      }
    

  }
  print("made language model")
  print(ngrams)
  print(Object.keys(ngrams).length)
  nholder.html("n = "+sel.value())
}

function markovit(){

  // algorithm that generates the text

  // get start by getting a random key from grams as seed

  let keys = Object.keys(ngrams)
  let currentGram = random(keys)

  //let currentGram =txt.substring(0,order);
  //let currentGram ="greg"
  //let currentGram = random(ngram)
  print(currentGram)
  
  let result =currentGram

  for (let i =0; i<40;i++){ 

    let possibilities = ngrams[currentGram];
    print(currentGram, possibilities)

    if (!possibilities){
      print(currentGram,"no possibilities")
      break;   //incase it is undifined
    }

    let next =random(possibilities)
    if (next == ''){
      print(ngrams[currentGram], "picked dead value for that key")
      break;
    }

    result+=" "+next;

    // set current gram to the n gram of the text you are createing
    // split into an array
    let resulta = result.split(' ')
    // get the array len
    let len = resulta.length
    // set the next current gram

    currentGram =resulta.slice(len-order,len).join(' ')

  }
  // print the string to the dom paragraph
  pholder.html(result)
  
}

 