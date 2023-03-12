import { Dna } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};

const CenterLoader = () => {
  return (
    <div className="d-flex justify-content-center">
      <Loader/>
    </div>
  );
};

export {Loader, CenterLoader};