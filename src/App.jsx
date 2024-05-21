import './global.css';
import EnemySelectPanel from './EnemySelectPanel';
import BattleField from './BattleField';
import AllyConfig from './AllyConfig';
import css from './app.module.css';

const App = () => {
    return (
        <div className={css.page}>
            <EnemySelectPanel />
            <BattleField />
            <AllyConfig />
        </div>
    );
};

export default App;
