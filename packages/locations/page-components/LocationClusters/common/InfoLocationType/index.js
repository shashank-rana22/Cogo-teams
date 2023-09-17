import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function InfoLocationType({ heading = '', content = '' }) {
	return (
		<div className={styles.container}>
			<div>{heading}</div>
			<Tooltip
				content={content}
				placement="top"
			>
				<div className={styles.styled_info}>
					<IcMInfo />
				</div>
			</Tooltip>
		</div>
	);
}
export default InfoLocationType;
