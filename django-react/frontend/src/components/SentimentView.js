import React, {Component} from 'react';
import axios from 'axios';



class SentimentView extends Component {
    constructor(props) {  // Create and initialize state
        super(props); 
        this.state = {
            sentimentScore:0.0,
            sentiment:"neutral",
            loading:true
        }
    }

    async componentDidMount() {
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('query_string', this.props.sentimentSentence);
        
        var config = {
            method: 'post',
            url: 'api/documents/sentiment_analysis/',
            data : data
        };
        
        var response_data;

        await axios(config)
        .then(function (response) {
            response_data=response.data;
        }
        )
        .catch(function (error) {
          console.log("Error getting sentiment",error);
        });

        if(response_data!=undefined){
            this.setState({
                sentimentScore:response_data['raw_score'],
                sentiment:response_data['sentiment'],
                loading:false
            })
        }
        console.log(response_data);
    }
    


  render() {  
    if(this.state.loading){
        return(
            <div class="w-48 bg-lifepad_green rounded-lg shadow border-2 border-lifepad_black text-lg font-serif animate-bounce text-center">
                Loading...
            </div>
        );
    }
    
    return (
        <div class="w-48 bg-lifepad_green rounded-lg shadow border-2 border-lifepad_black font-serif">
            <ul class="divide-y-2 divide-lifepad_black text-center">
                <li class="p-3">
                    Score: {this.state.sentimentScore}
                </li>
                <li class="p-3">
                    Sentiment: {this.state.sentiment}
                </li>
                <li class="p-3">
                    Length: {this.props.sentimentSentence.length}
                </li>
            </ul>
        </div>
    ); 
  }
}

export default SentimentView;