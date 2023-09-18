import styles from './styles.module.css';

function FilePreview({ url = '' }) {
	return (
		<div className={styles.upload_invoice}>
			<object
				type="application/pdf"
				data={url}
				width="100%"
				height="100%"
				aria-label="Document"
			/>
		</div>
	);
}
export default FilePreview;
