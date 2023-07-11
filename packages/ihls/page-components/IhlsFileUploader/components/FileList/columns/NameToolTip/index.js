import { Tooltip, Toast } from '@cogoport/components';
import React from 'react';

import styles from './style.module.css';

const onClickName = ({ url }) => {
	if (url) {
		window.open(url, '_blank');
	} else {
		Toast.info("File can't be downloaded.");
	}
};

function NameToolTip({ file_name = '', url = '' }) {
	return (
		<Tooltip interactive content={file_name} placement="bottom">
			<div
				onClick={() => onClickName({ url })}
				className={styles.text_wrap}
				role="presentation"
			>
				{file_name}
			</div>
		</Tooltip>
	);
}

export default NameToolTip;
