import { useSelector } from 'react-redux';
import { allPeopleRemoved } from '../app/store/peoples';
import store, { RootState } from '../app/store/store';
import exportFromJSON from 'export-from-json';

function Flyout() {
  const quantityPeopleInStore = useSelector(
    (state: RootState) => state.people.length,
  );
  const peoples = useSelector((state: RootState) => state.people);

  function onExportLocal() {
    const data = [];
    for (const p in peoples) {
      if (p !== 'length') data.push(peoples[p]);
    }

    const fileName = `${quantityPeopleInStore}_peoples`;
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  }

  return (
    <div className="item flyout">
      <div className="flyout_counter">
        <p>{String(quantityPeopleInStore)}</p>
      </div>
      <div className="flyout_buttons">
        <button className="btn" onClick={onExportLocal}>
          Download
        </button>
        <button
          className="btn"
          onClick={() => {
            store.dispatch(allPeopleRemoved());
          }}
        >
          Unselect all
        </button>
      </div>
    </div>
  );
}
export default Flyout;
