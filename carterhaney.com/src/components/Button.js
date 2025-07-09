import { FaDownload } from 'react-icons/fa';
import './Button.css';

function Button({ label, onClick }) {
  return (
    <div>
      <button onClick={onClick}>
        Hello, World!
        {label}
      </button>
    </div>
  );
}

export default Button;

function ResumeButton({ onClick }) {
  return (
    <div>
      <button
        className="resume-button"
        onClick={() => {
          window.location.href = "carterhaney.com/resume.pdf";
        }}
      >
        <FaDownload />
        Resume
      </button>
    </div>
  );
}

export { ResumeButton };