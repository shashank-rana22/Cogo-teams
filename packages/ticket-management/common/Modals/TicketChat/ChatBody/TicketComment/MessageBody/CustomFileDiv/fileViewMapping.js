import { IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

const fileViewMapping = ({
	mediaUrl = '',
	messageType = '',
	extension = '',
	fileName = '',
}) => ({
	image: (
		<img src={mediaUrl} alt={messageType} className={styles.object_styles} />
	),
	audio: (
		<audio controls className={styles.object_styles}>
			<source src={mediaUrl} type={`audio/${extension}`} />
			<track src="" kind="captions" />
		</audio>
	),
	video: (
		<video controls className={styles.object_styles}>
			<source src={mediaUrl} type={`video/${extension}`} />
			<track src="" kind="captions" />
		</video>
	),
	document: (
		<>
			<IcMDocument width="17px" height="17px" />
			<div className={styles.file_name}>
				{`${fileName}${
					extension ? `.${extension}` : ''
				}`}

			</div>
		</>
	),
});

export default fileViewMapping;
