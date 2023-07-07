import { Tooltip, Toast } from '@cogoport/components';
import React from 'react';

import styles from './style.module.css';

function NameToolTip({ file_name = '', url = '' }) {
	const onClickName = () => {
		if (url) {
			window.open(url, '_blank');
		} else {
			Toast.info("File can't be downloaded.");
		}
	};
	return (
		<Tooltip interactive content={file_name} placement="bottom">
			<div
				onClick={() => onClickName()}
				className={styles.text_wrap}
				role="presentation"
			>
				{file_name}
			</div>
		</Tooltip>
	);
}

export default NameToolTip;
