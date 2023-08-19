import './Loading.css';

interface props {
  message : string;
}
const Loading = ({message}:props) => {
  return (
    <div className="loading">
      <img className='spinner'src='https://i.ibb.co/DWHVDfC/logo.png' alt="TutoriAPP" />
      <h1> {message}</h1>
    </div>
  );
};

export default Loading;