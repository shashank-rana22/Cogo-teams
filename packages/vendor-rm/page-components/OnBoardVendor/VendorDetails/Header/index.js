import styles from './styles.module.css';

function Header() {
	return (
		<>
			<div className={styles.header}>Vendor Details</div>

			<div className={styles.sub_heading}>
				<i>Provide your GST number to simplify tax compliance and claim input tax credit on purchases</i>
			</div>
		</>
	);
}

export default Header;
