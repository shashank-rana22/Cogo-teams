import styles from './styles.module.css';

function Footer({ item, revertCounts }) {
	return (
		<div className={styles.footer}>
			<div className={styles.label}>
				Total Reverts:
			</div>
			<div style={{ marginLeft: '2px' }}>
				{revertCounts[item?.id]}
			</div>
		</div>

	);
}
export default Footer;
