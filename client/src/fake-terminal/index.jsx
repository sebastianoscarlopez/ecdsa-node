import './styles.scss'
const FakeTerminal = ({ commands }) => {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">Simulated Terminal - Here is a simulated secure way to sign the transaction without exposing the private key </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-text"></div>
        <div className="terminal-input"></div> {
          commands.map((command) => (
            <div key={command} className="terminal-prompt">$ {command}</div>
          ))
        }
      </div>
    </div>
  );
};

export default FakeTerminal;
