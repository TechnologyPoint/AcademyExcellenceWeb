import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {API,Amplify} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

export class Welcome extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
    componentDidMount() {
      fetch('https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/boardDetails',{
         method: 'GET',
         headers: {
               //'x-api-key': 'NqwoT8A2aH62NCMmpoeMd9r1ERhSm1oO5KTxjeGx'
         }
         })
        .then(res =>  res.json())
        .then(
          (result) => {
          this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            alert(error);
            this.setState({
              isLoaded: true,
              error
            });
          }
        ).catch((error) => console.error(error))
    }

    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {items.map(item => (
              <li key={item.boardId}>
                {item.name} {item.boardName}
              </li>
            ))}
          </ul>
        );
      }
    }

}
