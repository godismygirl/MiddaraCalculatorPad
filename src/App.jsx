import './global.css';
import BattleField from './BattleField';
import AllyConfig from './AllyConfig';
import css from './app.module.css';

const App = () => {
    return (
        <div className={css.page}>
            <div className={css.header}>
                <span className={css.title}>Middara Calculator Pad</span>
            </div>
            <div className={css.body}>
                <BattleField />
                <AllyConfig />
            </div>
        </div>
    );
};

export default App;
