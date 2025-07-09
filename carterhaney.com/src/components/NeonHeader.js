import './NeonHeader.css';
import Typewriter from './Typewriter.js';

function NeonHeader({ title }) {
  return (
    <header className="NeonHeader">
      <h1><Typewriter text={title} delay={100} infinite={false}/></h1>
    </header>
  );
}

export default NeonHeader;