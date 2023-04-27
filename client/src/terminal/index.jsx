import './styles.scss'
const Terminal = ({ commands }) => {
  return (
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">Simulated Terminal - Here is a simulated secure way to sign the transaction without exposing the private key </div>
      </div>
      <div class="terminal-body">
        <div class="terminal-text"></div>
        <div class="terminal-input"></div> {
          commands.map((command) => (
            <div class="terminal-prompt">$ {command}</div>
          ))
        }
      </div>
    </div>
  );
};

export default Terminal;
