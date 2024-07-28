import { ItemType } from '../types';
import Item from './Item';

type ListItemsProps = {
  items: ItemType[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  isOpenInfo: boolean;
  setIsOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setPlanetNumber: React.Dispatch<React.SetStateAction<string>>;
};
function ListItems({
  items,
  setName,
  isOpenInfo,
  setIsOpenInfo,
  setPlanetNumber,
}: ListItemsProps) {
  if (items.length === 0) {
    return (
      <div className="loader-text" style={{ margin: '5rem auto' }}>
        <p>No cards 🕵 </p>
      </div>
    );
  }
  return (
    <ol className="box">
      {items.map((item) => (
        <Item
          key={item.name}
          item={item}
          setName={setName}
          isOpenInfo={isOpenInfo}
          setIsOpenInfo={setIsOpenInfo}
          setPlanetNumber={setPlanetNumber}
        />
      ))}
    </ol>
  );
}

export default ListItems;
