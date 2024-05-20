import Dice from "./Dice";
import "./global.css";
import EnemySelectPanel from "./EnemySelectPanel";
import BattleField from "./BattleField";
import AllyConfig from "./AllyConfig";
import css from "./app.module.css";

const App = () => {
  return (
    <div className={css.page}>
      <EnemySelectPanel />
      {/* <Dice width={50} color="BLUE" value={10} />
        <Dice.Black width={50} value={2} /> */}
      <BattleField />
      <AllyConfig />
    </div>
  );
};

export default App;
