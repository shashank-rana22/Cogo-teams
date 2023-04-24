import styles from './styles.module.css';

function Header({ controls }) {
	return (
		<div className={styles.container}>
			{controls.map((ctrl) => {
				const { span } = ctrl;
				const flex = ((span || 12) / 12) * 100 - 1;
				return (
					<div className={styles.label} style={{ width: `${flex}%` }}>
						{ctrl?.label}
					</div>
				);
			})}
		</div>
	);
}

export default Header;
