import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ item, revertCounts }) {
	return (
		<div className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.label}>
					Total Reverts:
				</div>
				<div style={{ marginLeft: '2px' }}>
					{revertCounts[item?.id]}
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.label}>
					Remarks:
				</div>
				<Tooltip
					// eslint-disable-next-line no-unsafe-optional-chaining
					content={(item?.remarks || []).length ? item?.remarks[item?.remarks.length - 1]
						: 'No Remarks Present'}
					interactive
				>
					<div className={styles.remarks}>
						view here
					</div>
				</Tooltip>

			</div>

		</div>

	);
}
export default Footer;
