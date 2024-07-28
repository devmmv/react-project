import { useGetPlanetInfoQuery } from '../app/swApi';
import { useOutletContext } from 'react-router-dom';
import { InfoType } from '../types';

function Info() {
  const { planetNumber, name, setIsOpenInfo } = useOutletContext<InfoType>();
  const { data, isFetching } = useGetPlanetInfoQuery(planetNumber);

  return (
    <div className="item box">
      <div className="info">
        {isFetching ? (
          <h1 className="loader-text">Loading...</h1>
        ) : (
          <div>
            <div>
              <div className="item info-item">
                <div className="item-description">
                  <h1>Home World</h1>
                  <h2>{name}</h2>
                  <p>
                    Planet name: <span>{data?.name}</span>
                  </p>
                  <p>
                    Climate: <span>{data?.climate}</span>
                  </p>
                  <p>
                    Population: <span>{data?.population}</span>
                  </p>
                  <p>
                    Diameter: <span>{data?.diameter}</span>
                  </p>
                  <p>
                    Surface water: <span>{data?.surface_water}</span>
                  </p>
                  <p>
                    Terrain: <span>{data?.terrain}</span>
                  </p>

                  <p>
                    Gravity: <span>{data?.gravity}</span>
                  </p>
                  <p>
                    Orbital period: <span>{data?.orbital_period}</span>
                  </p>
                  <p>
                    Rotation periond:
                    <span>{data?.rotation_period}</span>
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
