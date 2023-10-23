/* eslint-disable react/jsx-key */
import { Tooltip } from '@cogoport/components';
import React from 'react';

import renderContent from '../../../../../../utils/renderContent';

import styles from './styles.module.css';

function RenderSubContent({
	data = [],
	wdth = '',
	title = '',
}) {
	return (
		<div className={styles.sub_content} style={{ width: wdth }}>
			<div className={styles.light}>{title}</div>
			{data?.map((item) => (
				<Tooltip
					placement="top"
					theme="light"
					content={<div className={styles.actual_content}>{renderContent(item) || '-'}</div>}
				>
					<div className={styles.actual_content}>{renderContent(item) || '-'}</div>
				</Tooltip>

			))}
		</div>
	);
}

export default RenderSubContent;
