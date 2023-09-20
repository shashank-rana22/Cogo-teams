import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header_container}>
			<div className={styles.group}>
				<div>
					Hello
				</div>

				<div>
					Create A Team
				</div>
			</div>
			<div className={styles.title}>
				What kind of a team will this be?
			</div>
		</div>
	);
}

export default Header;
