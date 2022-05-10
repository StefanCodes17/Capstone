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
        console.log("updating",this.props.sentimentSentence);
        try{
            if(this.props.sentimentSentence!="" && this.props.sentimentSentence != prevProps.sentimentSentence){
                console.log(this.props.sentimentSentence);
                let response_data = await axios.post('/api/documents/sentiment_analysis/',{ 'query_string': this.props.sentimentSentence });
                
                if(response_data!=undefined){
                    this.setState({
                        sentimentScore:response_data.data['raw_score'],
                        sentiment:response_data.data['sentiment'].toLowerCase(),
                        loading:false
                    })
                }
                console.log(response_data.data);
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
            console.log(response_data.data);
        }
        catch(error){
            console.log(error);
        }
    }


  render() {  
    if(this.state.loading){
        console.log("updating",this.props.sentimentSentence);
        return(
            <div className="absolute w-48 bg-lifepad_green rounded-lg shadow border-2 border-lifepad_black text-lg font-serif animate-bounce text-center">
                Loading...
            </div>
        );
    }
    let bgcol;

    if(this.state.sentiment=="positive"){
        bgcol="bg-lifepad_green";
    }
    else if(this.state.sentiment=="negative"){
        bgcol="bg-red-500";
    }
    else if(this.state.sentiment=="neutral"){
        bgcol="bg-gray-100";
    }
    else{
        bgcol="bg-purple-300";
        console.log("Bg color error: ",this.state.sentiment)
    }

    return (
        <div className={"absolute z-100 w-48 rounded-lg shadow border-2 border-lifepad_black font-serif "+bgcol}>
            <ul className="divide-y-2 divide-lifepad_black text-center">
                <li className="p-2">
                    Score: {this.state.sentimentScore}
                </li>
                <li className="p-2">
                    Sentiment: {this.state.sentiment}
                </li>
                <li className="p-2">
                    Length: {this.props.sentimentSentence.length}
                </li>
            </ul>
        </div>
    ); 
  }
}

export default SentimentView;