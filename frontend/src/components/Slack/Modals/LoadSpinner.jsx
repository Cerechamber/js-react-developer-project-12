import { Spinner } from 'react-bootstrap';

const LoadSpinner = () => {
  return (
    <div
    className='spinner-popup d-flex justify-content-center align-items-center h-100 w-100 bg-gradient position-fixed'
    >
    <Spinner animation="grow" role="status" variant="light">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}

export default LoadSpinner;