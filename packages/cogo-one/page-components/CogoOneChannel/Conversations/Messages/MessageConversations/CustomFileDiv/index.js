import styles from './styles.module.css';

function CustomFileDiv({ url = '' }) {
	const urlArray = decodeURI(url)?.split('/');
	const fileNameFromUrl = urlArray[(urlArray?.length || 0) - 1] || '';
	const [fileName, extension] = fileNameFromUrl.split('.') || [];

	return (
		<div className={styles.container}>
			<img
				alt="logo"
			// eslint-disable-next-line max-len
				src="https://cogoport-production.sgp1.digitaloceanspaces.com/e2ae10b0c4ea7320fa4ce75f0ea12b4c/Vector%20%284%29.svg"
				height="15px"
				width="15px"
			/>
			<div className={styles.file_name}>{`${fileName}.${extension}`}</div>
		</div>
	);
}
export default CustomFileDiv;
