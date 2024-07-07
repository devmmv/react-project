import { Component } from 'react';
import SearchSection from './components/SearchSection';
import { ItemType, StateType } from './types';
import { URL } from './constants';
import DisplaySection from './components/DisplaySection';
import ErrorBoundary from './components/ErrorBoundary';

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
    const { items } = this.state;
    return (
      <ErrorBoundary>
        <SearchSection
          parentStateItems={this.handleStateItems}
          parentStateIsLoaded={this.handleStateIsLoaded}
        />
        {!this.state.isLoaded ? (
          <div className="loader-box">
            <div className="loader"></div>
            <span className="loader-text">Loading...</span>
          </div>
        ) : (
          <DisplaySection items={items} />
        )}
      </ErrorBoundary>
    );
  }
}

export default App;
