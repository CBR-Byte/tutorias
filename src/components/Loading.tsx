import './Loading.css';

interface props {
  message : string;
}
const Loading = ({message}:props) => {
  return (
    <div className="loading">
      <img className='spinner' src='/assets/images/logo.png' alt='Logo' />
      <h1> {message}</h1>
    </div>
  );
};

export default Loading;