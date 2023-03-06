import styles from './styles.module.css';

function Header({ columns = [] }) {
	return (
		<div className={styles.container}>
			{columns.map(({ label = '', flex = 2, key }) => (
				<div
					className={styles.header}
					key={label || key}
					style={{ flex }}
				>
					{label}
				</div>
			))}
		</div>
	);
}

export default Header;
