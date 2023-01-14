import styles from './styles.module.css';

function Footer({ item }) {
	const total_reverts = item?.detail?.negotiation_reverts_count;
	return (
		<div className={styles.footer}>
			<div className={styles.label}>
				Total Reverts:
			</div>
			<div style={{ marginLeft: '2px' }}>
				{total_reverts}
			</div>
		</div>

	);
}
export default Footer;
