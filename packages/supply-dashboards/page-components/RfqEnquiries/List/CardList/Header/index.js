import styles from './styles.module.css';

function Header({ columns = [] }) {
	return (
		<header className={styles.container}>
			{columns.map(({ label = '', flex = 4, key }) => (
				<div
					className={styles.header}
					key={label || key}
					style={{ size: flex }}
				>
					{label}
				</div>
			))}
		</header>
	);
}

export default Header;
