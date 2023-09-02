import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function InfoHeader({ heading = '', content = '' }) {
	return (
		<div className={styles.info_container}>
			<div>{heading}</div>
			<Tooltip
				content={<div className={styles.info_content}>{content}</div>}
				placement="top"
				interactive
			>
				<IcMInfo width={15} height={15} style={{ margin: '4px 0 0 4px' }} />
			</Tooltip>
		</div>
	);
}
export default InfoHeader;
