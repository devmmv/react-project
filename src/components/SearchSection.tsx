import { Component } from 'react';
import { ItemType, SearchSectionProps } from '../types';
import { URL } from '../constants';

class SearchSection extends Component<SearchSectionProps> {
  state = {
    query: localStorage.getItem('query') as string | '',
  };

  sendItemsToParent = (items: ItemType[]) => {
    this.props.parentStateItems(items);
  };
  sendIsLoadedToParent = (state: boolean) => {
    this.props.parentStateIsLoaded(state);
  };

  render() {
    return (
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🤟</span>
          <h1>StarWars</h1>
        </div>
        <input
          className="search"
          autoFocus
          type="text"
          placeholder="Search by name..."
          value={this.state.query}
          onChange={(e) => {
            this.setState({
              query: e.target.value,
            });
          }}
        />
        <div className="buttons-box">
          <button
            className="btn"
            onClick={() => {
              localStorage.setItem('query', this.state.query);
              this.sendIsLoadedToParent(false);
              fetch(URL + this.state.query)
                .then((res) => res.json())
                .then((json) => {
                  this.sendItemsToParent(json.results);
                  this.sendIsLoadedToParent(true);
                  this.setState({
                    items: json.results,
                  });
                });
            }}
          >
            Search
          </button>
        </div>
      </nav>
    );
  }
}

export default SearchSection;
