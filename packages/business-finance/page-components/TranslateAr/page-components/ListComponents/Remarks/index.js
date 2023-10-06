import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import RemarkContent from './RemarksContent';
import styles from './styles.module.css';

function Remarks({ itemData }) {
	return (
		<div className={styles.center}>
			<Popover
				placement="bottom"
				render={<RemarkContent itemData={itemData} />}
			>
				<div>
					<IcMProvision
						style={{ cursor: 'pointer' }}
						height={26}
						width={26}
						color="#F68B21"
					/>
				</div>
			</Popover>
		</div>
	);
}

export default Remarks;
