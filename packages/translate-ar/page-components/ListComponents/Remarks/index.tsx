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
				<div style={{ color: '#393F70' }}>
					<IcMProvision
						onClick={() => { }}
						style={{ cursor: 'pointer' }}
						height={25}
						width={25}
					/>
				</div>
			</Popover>
		</div>
	);
}

export default Remarks;
