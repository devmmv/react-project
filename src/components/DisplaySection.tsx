import { Dispatch, useState } from 'react';
import { ItemType } from '../types';
import { Outlet, useOutletContext } from 'react-router-dom';

type ContextType = {
  homeWordLink: string;
  name: string;
  setIsOpenInfo: Dispatch<React.SetStateAction<boolean>>;
};

function DisplaySection() {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [homeWordLink, setHomeWordLink] = useState('');
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
                  setHomeWordLink(item.homeworld);
                  setName(item.name);
                }
              }}
            >
              <h2>{item.name}</h2>
              <p className="item-description">
                Gender:<span>{item.gender}</span>
                Hair color:<span>{item.hair_color}</span>
                <br />
                Eye color:<span>{item.eye_color}</span>
                Birth year:<span>{item.birth_year}</span>
              </p>
            </li>
          ))}
        </ol>
        {isOpenInfo && (
          <Outlet
            context={
              { homeWordLink, name, setIsOpenInfo } satisfies ContextType
            }
          />
        )}
      </div>
    </>
  );
}
export default DisplaySection;
