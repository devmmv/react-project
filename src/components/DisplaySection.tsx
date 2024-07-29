import { Dispatch, useState } from 'react';
import { ItemType } from '../types';
import { Outlet, useOutletContext } from 'react-router-dom';
import ListItems from './ListItems';

type ContextType = {
  planetNumber: string;
  name: string;
  setIsOpenInfo: Dispatch<React.SetStateAction<boolean>>;
};

function DisplaySection() {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [planetNumber, setPlanetNumber] = useState('');
  const [name, setName] = useState('');
  const items = useOutletContext<ItemType[]>();

  if (items.length === 0) {
    return (
      <div className="loader-text" style={{ margin: '5rem auto' }}>
        <p>No cards 🕵 </p>
      </div>
    );
  }
  return (
    <>
      <div className="container">
        <ListItems
          items={items}
          isOpenInfo={isOpenInfo}
          setIsOpenInfo={setIsOpenInfo}
          setName={setName}
          setPlanetNumber={setPlanetNumber}
        />

        {isOpenInfo && (
          <Outlet
            context={
              { planetNumber, name, setIsOpenInfo } satisfies ContextType
            }
          />
        )}
      </div>
    </>
  );
}
export default DisplaySection;
