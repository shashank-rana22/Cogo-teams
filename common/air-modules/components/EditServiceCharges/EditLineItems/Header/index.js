import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;

function Header({ controls = [] }) {
	return (
		<div className={styles.container}>
			{controls?.map((ctrl) => {
				const { span, name, label } = ctrl || {};

				const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

				return (
					<div className={styles.label} style={{ width: `${flex}%` }} key={name}>
						{label}
					</div>
				);
			})}
		</div>
	);
}

export default Header;
