import { FaDownload } from 'react-icons/fa';
import './Button.css';

function Button({ icon, label, link, onClick }) {
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <button className="Button" onClick={handleClick}>
        {icon}
        {label}
      </button>
    </div>
  );
}

export default Button;