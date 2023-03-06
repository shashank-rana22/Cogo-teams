import { IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CustomFileDiv({ mediaUrl = '' }) {
	const urlArray = decodeURI(mediaUrl)?.split('/');
	const fileNameFromUrl = urlArray[(urlArray?.length || 0) - 1] || '';
	const fileArray = fileNameFromUrl.split('.') || [];
	const extension = fileArray.pop();
	const fileName = fileArray.join('.');

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

			<IcMDocument width={22} height={22} className={styles.img_styles} />
			<div className={styles.file_name}>{`${fileName}${extension ? `.${extension}` : ''}`}</div>
		</div>
	);
}
export default CustomFileDiv;
