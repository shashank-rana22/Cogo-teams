import styles from './styles.module.css';

function DividerPreview() {
	return (
		<div
			role="presentation"
			className={styles.html_drop}
		>
			<div className={styles.backdrop_divider}>
				<img
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output (12).png"
					width="32px"
					height="28px"
				/>
			</div>
			<div>Divider</div>
		</div>
	);
}

export default DividerPreview;
