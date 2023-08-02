import { startCase } from '@cogoport/utils';
import React from 'react';

import RenderTooltip from '../../../../commons/RenderTooltip';

import styles from './styles.module.css';

const SHOW_TOOLTIP_MAX_LENGTH = 4;
function UrgencyTag({ itemData = {} }) {
	const { urgencyTag = [] } = itemData || {};
	if (typeof urgencyTag === 'object') {
		return (
			<div className={styles.custom_tag}>
				{urgencyTag.map((value) => (
					<div key={value}>
						<RenderTooltip content={startCase(value)} maxLength={SHOW_TOOLTIP_MAX_LENGTH} />
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
