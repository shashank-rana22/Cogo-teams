import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const SHOW_TOOLTIP_MAX_LENGTH = 4;
const STARTING_SUBSTRING_LENGTH = 0;
function UrgencyTag({ itemData }) {
	const renderTooltip = (content, maxLength) => {
		if (content?.length > maxLength) {
			return (
				<Tooltip interactive placement="top" content={content} maxWidth={500}>
					<div>
						{`${content.substring(STARTING_SUBSTRING_LENGTH, maxLength)}...`}
					</div>
				</Tooltip>
			);
		}
		return content;
	};
	const { urgencyTag = [] } = itemData || {};
	if (typeof urgencyTag === 'object') {
		return (
			<div className={styles.custom_tag}>
				{urgencyTag.map((value) => (
					<div key={value}>
						{renderTooltip(startCase(value), SHOW_TOOLTIP_MAX_LENGTH) }
					</div>
				))}
			</div>
		);
	}
	return (
		<div className={styles.custom_tag}>
			{urgencyTag}
		</div>
	);
}

export default UrgencyTag;
