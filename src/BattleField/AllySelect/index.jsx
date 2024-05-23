import useGlobalStore, { ALLY_COLLECTION } from '../../GlobalStore';
import css from './css.module.css';

const AllySelect = () => {
    const { activeAlly, setActiveAlly } = useGlobalStore();

    return (
        <div className={css.roles}>
            {ALLY_COLLECTION?.map((ally) => (
                <div
                    key={ally}
                    className={css.avatar}
                    onClick={() => setActiveAlly(ally)}
                >
                    <img
                        alt=""
                        className={
                            activeAlly === ally ? css.activeFace : css.face
                        }
                        src={`./adventurer/${ally}.png`}
                    />
                </div>
            ))}
        </div>
    );
};

export default AllySelect;
