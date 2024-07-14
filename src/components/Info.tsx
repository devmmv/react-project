import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DataHomeWorkType, InfoType } from '../types';

function Info() {
  const { homeWordLink, name, setIsOpenInfo } = useOutletContext<InfoType>();
  const [dataHomeWork, setDataHomeWork] = useState<DataHomeWorkType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('from useEffect Info', 'change homeWordLink');
    fetch(homeWordLink)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setDataHomeWork(data);
        setIsLoaded(true);
      })
      .catch((err: Error) => console.error(err));
  }, [homeWordLink]);
  return (
    <div className="item box">
      <div className="info">
        {!isLoaded ? (
          <h1 className="loader-text">Loading...</h1>
        ) : (
          <div>
            <div>
              <div className="item info-item">
                <div className="item-description">
                  <h1>Home World</h1>
                  <h2>{name}</h2>
                  <p>
                    Planet name: <span>{dataHomeWork?.name}</span>
                  </p>
                  <p>
                    Climate: <span>{dataHomeWork?.climate}</span>
                  </p>
                  <p>
                    Population: <span>{dataHomeWork?.population}</span>
                  </p>
                  <p>
                    Diameter: <span>{dataHomeWork?.diameter}</span>
                  </p>
                  <p>
                    Surface water: <span>{dataHomeWork?.surface_water}</span>
                  </p>
                  <p>
                    Terrain: <span>{dataHomeWork?.terrain}</span>
                  </p>

                  <p>
                    Gravity: <span>{dataHomeWork?.gravity}</span>
                  </p>
                  <p>
                    Orbital period: <span>{dataHomeWork?.orbital_period}</span>
                  </p>
                  <p>
                    Rotation periond:
                    <span>{dataHomeWork?.rotation_period}</span>
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'end' }}>
                <button className="btn" onClick={() => setIsOpenInfo(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Info;
