import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import { Object } from '../../../common/interfaces';

import RemarkContent from './RemarksContent';
import styles from './styles.module.css';

function Remarks({ itemData }: Object) {
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
						height={26}
						width={26}
					/>
				</div>
			</Popover>
		</div>
	);
}

export default Remarks;
