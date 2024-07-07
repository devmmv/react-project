import { Component } from 'react';
import { DispalySectionProps } from '../types';

class DisplaySection extends Component<DispalySectionProps> {
  render() {
    return (
      <ol>
        {this.props.items.map((item) => (
          <li className="item" key={item.name}>
            <h2>{item.name}</h2>
            <p className="item-description">
              Gender:<span>{item.gender}</span>
              Hair color:<span>{item.hair_color}</span>
              Eye color:<span>{item.eye_color}</span>
              Birth year:<span>{item.birth_year}</span>
            </p>
          </li>
        ))}
      </ol>
    );
  }
}

export default DisplaySection;
