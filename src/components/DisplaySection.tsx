import { useState } from 'react';
import { ItemType } from '../types';
import { Outlet, useOutletContext } from 'react-router-dom';

type ContextType = {
  homeWord: string;
  name: string;
};

function DisplaySection() {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [homeWord, setHomeWord] = useState('');
  const [name, setName] = useState('');
  const items = useOutletContext<ItemType[]>();

  return (
    <>
      <div className="container">
        <ol className="box">
          {items.map((item) => (
            <li
              className="item"
              key={item.name}
              onClick={() => {
                if (item.name && isOpenInfo) {
                  setIsOpenInfo(false);
                } else {
                  setIsOpenInfo(true);
                  setHomeWord(item.homeworld);
                  setName(item.name);
                }
              }}
            >
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
        {isOpenInfo && (
          <Outlet context={{ homeWord, name } satisfies ContextType} />
        )}
      </div>
    </>
  );
}
export default DisplaySection;
