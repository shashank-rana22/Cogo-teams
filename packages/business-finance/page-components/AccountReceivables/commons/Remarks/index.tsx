import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import { Object } from '../Interfaces';

import RemarkContent from './RemarkContent';
import styles from './styles.module.css';

function Remarks({ itemData }: Object) {
	return (
		<div className={styles.center}>
			<Popover
				placement="left"
				render={<RemarkContent itemData={itemData} />}
			>
				<div>
					<IcMProvision
						style={{ cursor: 'pointer' }}
						height={24}
						width={24}
						color="#F68B21"
					/>
				</div>
			</Popover>
		</div>
	);
}

export default Remarks;
