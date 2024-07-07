import { Component } from 'react';
import SearchSection from './components/SearchSection';
import { ItemType, StateType } from './types';
import { URL } from './constants';

class App extends Component {
  state: StateType = {
    query: localStorage.getItem('query') || '',
    items: [],
    isLoaded: false,
  };

  handleStateItems = (items: ItemType[]) => {
    this.setState({ items });
  };
  handleStateIsLoaded = (isLoaded: boolean) => {
    this.setState({ isLoaded });
  };
  componentDidMount() {
    fetch(URL + this.state.query)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json.results,
        });
      });
  }

  render() {
    return (
      <>
        <SearchSection
          parentStateItems={this.handleStateItems}
          parentStateIsLoaded={this.handleStateIsLoaded}
        />
        <ol>
          {this.state.items.map((item) => (
            <li>{item.name}</li>
          ))}
        </ol>
      </>
    );
  }
}

export default App;
