import NewGame from '../new-game/NewGame';
import './Winner.scss';

const Winner = ({ numbers, reset }) => {
    if (!numbers.every(n => n.value === n.index + 1))    
        return null;

    return (
        <div className="winner">
            <p>You win!</p>
            <NewGame reset={reset} />
        </div>
    );
};

export default Winner;
