import styles from './styles.module.css';

function HtmlPreview() {
	return (
		<div
			role="presentation"
			className={styles.html_drop}
		>
			<img
				alt=""
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(9).png"
				width="42px"
				height="54px"
			/>
			<div>HTML</div>
		</div>
	);
}

export default HtmlPreview;
