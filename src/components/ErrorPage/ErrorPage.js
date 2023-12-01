import ErrorIMG from '../../assets/img/errorpage/errorpage.png';
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px',
      }}
    >
      <span style={{ fontSize: '20px' }}>Печалька, но мы не смогли найти фильмов по Вашему запросу</span>
      <img className="img" src={ErrorIMG} alt="" />{' '}
    </div>
  );
}
