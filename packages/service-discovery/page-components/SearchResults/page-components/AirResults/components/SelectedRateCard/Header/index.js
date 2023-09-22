import styles from './styles.module.css';

function Header({
	rate = {},
}) {
	const { airline = {} } = rate;

	return (
		<div className={styles.container}>
			<span className={styles.heading}>
				Selected:

				<span className={styles.airline_name}>
					{airline?.short_name}
				</span>
			</span>
		</div>
	);
}

export default Header;
