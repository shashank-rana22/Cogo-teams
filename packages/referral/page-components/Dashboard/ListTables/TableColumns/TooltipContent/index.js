import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TooltipContent({ content = '', countryCode = '', type = '' }) {
	return (
		<Tooltip content={content} placement="bottom">
			<div className={styles.user_data}>
				{type === 'mobile' && countryCode}
				{' '}
				{content}
			</div>
		</Tooltip>
	);
}

export default TooltipContent;
