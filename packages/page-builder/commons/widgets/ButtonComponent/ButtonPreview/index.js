import styles from './styles.module.css';

function ButtonPreview() {
	return (
		<div
			role="presentation"
			className={styles.button_drop}
		>
			<img
				alt=""
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(7).png"
				width="78px"
				height="54px"
			/>
			<div>Button</div>
		</div>
	);
}

export default ButtonPreview;
