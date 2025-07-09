import './NeonHeader.css';
import Typewriter from './Typewriter.js';

function NeonHeader({ title, type = "h1" }) {
  return (
    <header className="NeonHeader">
      {type === "p" ? (
        <p><Typewriter text={title} delay={100} infinite={true} /></p>
      ) : (
        <h1><Typewriter text={title} delay={100} infinite={false} /></h1>
      )}
    </header>
  );
}

export default NeonHeader;