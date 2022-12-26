import styles from './styles.module.css';

function Header({ columns = [] }) {
	return (
		<header className={styles.container}>
			{columns.map(({ label = '', key = '', flex = 1 }) => (
				<div
					className={styles.header}
					key={key || label}
					style={{ flex }}
				>
					{label}
				</div>
			))}
		</header>
	);
}

export default Header;
