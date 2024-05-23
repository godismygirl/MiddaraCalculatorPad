import './global.css';
import BattleField from './BattleField';
import AllyConfig from './AllyConfig';
import css from './app.module.css';

const App = () => {
    return (
        <div className={css.page}>
            <BattleField />
            <AllyConfig />
        </div>
    );
};

export default App;
