import { Modal } from 'antd';
import Icon from '../Icon';
import css from './css.module.css';

const Alert = {};

Alert.skull = () => {
    Modal.error({
        title: 'Attack Missed !',
        icon: <Icon.Skull size={22} style={{ marginRight: 12 }} />,
        content: (
            <div className={css.row}>
                <span className={css.desc}>You Rolled A Skull</span>
                <Icon.Skull size={30} />
            </div>
        ),
        onOk() {},
    });
};

Alert.missed = ({ attack, defense }) => {
    Modal.error({
        title: 'Attack Missed !',
        content: (
            <>
                <div className={css.row}>
                    <div className={css.label}>Your attack roll is</div>
                    <div className={css.value}>
                        <span
                            className={css.strong}
                            style={{ color: '#222', marginRight: 8 }}
                        >
                            {attack}
                        </span>
                    </div>
                    <div className={css.label}>enemy defense is</div>
                    <div className={css.value}>
                        <span className={css.strong} style={{ color: '#222' }}>
                            {defense}
                        </span>
                    </div>
                </div>
                <div className={css.row}></div>
            </>
        ),
        onOk() {},
    });
};

Alert.damage = ({ total, physical, magic, irreducible }) => {
    Modal.success({
        title: 'Wonderful Attack !',
        content: (
            <>
                <div className={css.row} style={{ marginBottom: 15 }}>
                    <div className={css.label}>Total damage you make</div>
                    <div className={css.value}>
                        <span className={css.strong}>{total}</span>
                    </div>
                </div>
                <div className={css.section}>
                    <div className={css.col}>
                        <div
                            className={css.label}
                            style={{ background: '#16a085' }}
                        >
                            Physical
                        </div>
                        <div className={css.value}>
                            <span
                                className={css.strong}
                                style={{ color: '#16a085' }}
                            >
                                {physical}
                            </span>
                        </div>
                    </div>
                    <div className={css.col}>
                        <div
                            className={css.label}
                            style={{ background: '#ff4d4f' }}
                        >
                            Magic
                        </div>
                        <div className={css.value}>
                            <span
                                className={css.strong}
                                style={{ color: '#ff4d4f' }}
                            >
                                {magic}
                            </span>
                        </div>
                    </div>
                    <div className={css.col}>
                        <div
                            className={css.label}
                            style={{ background: '#f39c12' }}
                        >
                            Irreducible
                        </div>
                        <div className={css.value}>
                            <span
                                className={css.strong}
                                style={{ color: '#f39c12' }}
                            >
                                {irreducible}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        ),
    });
};

export default Alert;
