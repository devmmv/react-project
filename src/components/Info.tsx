import { useOutletContext } from 'react-router-dom';

function Info() {
  const { homeWord, name } = useOutletContext() as {
    homeWord: string;
    name: string;
  };
  return (
    <div className="box item">
      <div>
        <h1>My name: {name}. I live on: </h1>
        <h2>{homeWord}</h2>
      </div>
    </div>
  );
}

export default Info;
