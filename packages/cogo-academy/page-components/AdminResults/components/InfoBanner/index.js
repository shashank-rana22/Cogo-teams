import PublishNow from '../PublishNow';

import styles from './styles.module.css';
import TEXT_MAPPING from './text-mapping';

function InfoBanner({ test_status = '', test_id, validity_end, refetchTest, loading }) {
	const isUnderValidity = new Date() < new Date(validity_end);

	const content = TEXT_MAPPING[test_status];

	const { key, backgroundColor, text, subText, iconColor, Icon, borderColor } = content || {};

	if (!['published', 'active'].includes(test_status) && loading) {
		return null;
	}

	return (
		<div className={styles.container} style={{ border: `1px solid ${borderColor}`, background: backgroundColor }}>
			<div className={styles.content}>
				<Icon className={styles.icon} style={{ color: iconColor }} />

				<b className={styles.margin_right}>{text}</b>

				<span>{subText}</span>
			</div>

			<div>
				{key !== 'published' && !isUnderValidity
					? <PublishNow test_id={test_id} refetchTest={refetchTest} /> : null}
			</div>
		</div>
	);
}

export default InfoBanner;
