import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const { zeroth_index } = GLOBAL_CONSTANTS || {};

export function RenderToolTip({ itemData, field = {} }) {
	const { maxLength } = field || {};
	const content = getByKey(itemData, field?.key) || '';
	if (content?.length > maxLength) {
		return (
			<Tooltip interactive placement="top" content={content}>
				<div className={styles.value}>{`${content.substring(zeroth_index, maxLength)}...`}</div>
			</Tooltip>
		);
	}
	return content;
}
