import { peopleAdded, peopleRemoved } from '../app/store/peoples';
import store, { RootState } from '../app/store/store';
import { ItemType } from '../types';
import { useSelector } from 'react-redux';

type ItemProps = {
  item: ItemType;
  isOpenInfo: boolean;
  setIsOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPlanetNumber: React.Dispatch<React.SetStateAction<string>>;
};

function Item({
  item,
  isOpenInfo,
  setIsOpenInfo,
  setPlanetNumber,
  setName,
}: ItemProps) {
  const people = useSelector((state: RootState) => state.people[item.name]);
  const {
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    skin_color,
    homeworld,
  } = item;

  return (
    <li
      className="item"
      onClick={() => {
        if (item.name && isOpenInfo) {
          setIsOpenInfo(false);
        } else {
          setIsOpenInfo(true);
          const res = item?.homeworld.split('/');
          const result = res.at(-2)?.trim();
          setPlanetNumber(result!);
          setName(item.name);
        }
      }}
    >
      <div className="itemBox">
        <div className="textArea">
          <h2>{item.name}</h2>
          <p className="item-description">
            Gender:<span>{item.gender}</span>
            Hair color:<span>{item.hair_color}</span>
            <br />
            Eye color:<span>{item.eye_color}</span>
            Birth year:<span>{item.birth_year}</span>
          </p>
        </div>
        <label>
          <input
            checked={people !== undefined}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                store.dispatch(
                  peopleAdded({
                    name,
                    birth_year,
                    eye_color,
                    gender,
                    hair_color,
                    height,
                    mass,
                    skin_color,
                    homeworld,
                  }),
                );
              } else {
                store.dispatch(
                  peopleRemoved({
                    name,
                  }),
                );
              }
            }}
            className="itemCheckbox"
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
          />
        </label>
      </div>
    </li>
  );
}

export default Item;
