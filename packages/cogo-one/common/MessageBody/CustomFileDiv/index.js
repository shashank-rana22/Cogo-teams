import styles from './styles.module.css';

function CustomFileDiv({ mediaUrl = '' }) {
	const urlArray = decodeURI(mediaUrl)?.split('/');
	const fileNameFromUrl = urlArray[(urlArray?.length || 0) - 1] || '';
	const [fileName = '', extension = ''] = fileNameFromUrl.split('.') || [];

	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => {
			// eslint-disable-next-line no-undef
				window.open(
					mediaUrl,
					'_blank',
					'noreferrer',
				);
			}}
		>
			<img
				alt="logo"
                // eslint-disable-next-line max-len
				src="https://cogoport-production.sgp1.digitaloceanspaces.com/e2ae10b0c4ea7320fa4ce75f0ea12b4c/Vector%20%284%29.svg"
				className={styles.img_styles}
			/>
			<div className={styles.file_name}>{`${fileName}${extension ? `.${extension}` : ''}`}</div>
		</div>
	);
}
export default CustomFileDiv;
