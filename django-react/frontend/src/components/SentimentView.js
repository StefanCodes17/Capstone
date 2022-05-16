import axios from 'axios';
import React, {Component} from 'react';

class SentimentView extends Component {
    constructor(props) {  // Create and initialize state
        super(props); 
        this.state = {
            sentimentScore:0.0,
            sentiment:"neutral",
            loading:true
        }
    }

    async componentDidUpdate(prevProps) {
        //Post request to do sentiment analysis on highlighted text
        try{
            if(this.props.sentimentSentence!="" && this.props.sentimentSentence != prevProps.sentimentSentence){

                let response_data = await axios.post('/api/documents/sentiment_analysis/',{ 'query_string': this.props.sentimentSentence });
                
                if(response_data!=undefined){
                    this.setState({
                        sentimentScore: Number.parseFloat(response_data.data['raw_score']).toFixed(4),
                        sentiment:response_data.data['sentiment'].toLowerCase(),
                        loading:false
                    })
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    async componentDidMount() {
        try{
            let response_data = await axios.post('/api/documents/sentiment_analysis/',{ 'query_string': this.props.sentimentSentence });
            
            if(response_data!=undefined){
                this.setState({
                    sentimentScore: Number.parseFloat(response_data.data['raw_score']).toFixed(4),
                    sentiment:response_data.data['sentiment'].toLowerCase(),
                    loading:false
                })
            }
        }
        catch(error){
            console.log(error);
        }
    }


  render() {  
    //Function to count the number of words
    let countWords = (str) =>{
        const arr = str.split(' ');
        return arr.filter(word => word !== '').length;
    }

    if(this.state.loading){
        

        return(
            <div className='z-100'>
                <div className='px-1 py-1 w-20 inline-block text-center border border-lifepad_black font-semibold bg-lifepad_black text-white'>
                    {this.props.sentimentType}
                </div>
                <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                    Score:
                </div>
                <div className={'px-1 py-1 w-[4.25rem] border text-center inline-block border-l-0 border-lifepad_black font-semibold '+textCol}>
                    <div className='animate-bounce'>...</div>
                </div>
                <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                    Sentiment:
                </div>
                <div className={'px-2 py-1 w-[5rem] text-center border inline-block border-l-0 border-lifepad_black font-semibold '+bgcol}>
                    <div className='animate-bounce'>...</div>
                </div>
                <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                    Length:
                </div>
                <div className={'px-2 py-1 w-[3rem] text-center border inline-block border-l-0 border-lifepad_black font-semibold'}>
                    <div className='animate-bounce'>...</div>
                </div>
                <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                    Words:
                </div>
                <div className={'px-2 py-1 w-[3rem] text-center border inline-block border-l-0 border-lifepad_black font-semibold'}>
                    <div className='animate-bounce'>...</div>
                </div>
            </div>
        );
    }

    if(!this.props.sentimentSentence){
        this.setState({loading : true})
    }

    let bgcol;
    let textCol;

    if(this.state.sentiment=="positive"){
        bgcol="bg-green-100";
        textCol="text-lifepad_green";
    }
    else if(this.state.sentiment=="negative"){
        bgcol="bg-red-100";
        textCol="text-red-500";
    }
    else if(this.state.sentiment=="neutral"){
        bgcol="bg-gray-100";
        textCol="gray-500";
    }
    else{
        bgcol="bg-purple-300";
        console.log("Bg color error: ",this.state.sentiment)
    }
    
    return (
        <div className='z-100'>
            <div className='px-1 py-1 w-20 inline-block text-center border border-lifepad_black font-semibold bg-lifepad_black text-white'>
                {this.props.sentimentType}
            </div>
            <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                Score:
            </div>
            <div className={'px-1 py-1 w-[4.25rem] border text-center inline-block border-l-0 border-lifepad_black font-semibold '+textCol}>
                {this.state.sentimentScore}
            </div>
            <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                Sentiment:
            </div>
            <div className={'px-2 py-1 w-[5rem] text-center border inline-block border-l-0 border-lifepad_black font-semibold '+bgcol}>
                {this.state.sentiment}
            </div>
            <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                Length:
            </div>
            <div className={'px-2 py-1 w-[3rem] text-center border inline-block border-l-0 border-lifepad_black font-semibold'}>
                {this.props.sentimentSentence.length}
            </div>
            <div className='px-1 py-1 border inline-block border-lifepad_black font-semibold shadow-inner'>
                Words:
            </div>
            <div className={'px-2 py-1 w-[3rem] text-center border inline-block border-l-0 border-lifepad_black font-semibold'}>
                {countWords(this.props.sentimentSentence)}
            </div>
        </div>
    ); 
  }
}

export default SentimentView;