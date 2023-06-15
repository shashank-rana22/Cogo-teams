import { Tooltip } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

export function RenderToolTip({ itemData, field = {} }) {
	const { maxLength } = field || {};
	const content = getByKey(itemData, field?.key) || '';
	console.log(content, 'content');
	if (content?.length > maxLength) {
		return (
			<Tooltip interactive placement="top" content={content}>
				<div className={styles.value}>{`${content.substring(0, maxLength)}...`}</div>
			</Tooltip>
		);
	}
	return content;
}
