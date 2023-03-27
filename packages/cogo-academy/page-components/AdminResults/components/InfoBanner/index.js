import { IcMCrossInCircle } from '@cogoport/icons-react';

import PublishNow from '../PublishNow';

import styles from './styles.module.css';

const TEXT_MAPPING = {
	active: {
		key             : 'active',
		text            : 'Test Results have not been published yet.',
		subText         : 'They will be auto-published when the validity ends',
		iconColor       : '#D6B300',
		backgroundColor : '#FDFBF6',
		borderColor     : '#D6B300',
	},
	published: {
		key             : 'published',
		text            : 'Test Results have been Published.',
		subText         : 'Your students can now see their scores.',
		iconColor       : '#849E4C',
		backgroundColor : '#F7FAEF',
		borderColor     : '#849E4C',
	},
};

function InfoBanner({ test_status, test_id, refetchTest, loading }) {
	if (!['published', 'active'].includes(test_status) && loading) {
		return null;
	}

	const content = TEXT_MAPPING[test_status];

	const { key, backgroundColor, text, subText, iconColor, borderColor } = content;

	return (
		<div className={styles.container} style={{ border: `1px solid ${borderColor}`, background: backgroundColor }}>
			<div className={styles.content}>
				<IcMCrossInCircle style={{ color: iconColor, marginRight: 12, width: 24, height: 24 }} />

				<b className={styles.margin_right}>{text}</b>

				<span>{subText}</span>
			</div>

			<div>
				{key !== 'published' ? <PublishNow test_id={test_id} refetchTest={refetchTest} /> : null}
			</div>
		</div>
	);
}

export default InfoBanner;
