import { Tooltip } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;

export function RenderToolTip({ itemData, field = {} }) {
	const { maxLength } = field || {};
	const content = getByKey(itemData, field?.key) || '';
	if (content?.length > maxLength) {
		return (
			<Tooltip interactive placement="top" content={content}>
				<div className={styles.value}>{`${content.substring(ZERO, maxLength)}...`}</div>
			</Tooltip>
		);
	}
	return content;
}
