import { ToolTip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import STATUS_ITEMS from '../../../constants/STATUS_ITEMS';

import Item from './Item';
import styles from './styles.module.css';

function Info() {
	const items = Object.values(STATUS_ITEMS || {}).map((item) => (
		<Item {...item} />
	));

	return (
		<div className={styles.container}>
			<ToolTip
				theme="light"
				content={<ContentDiv>{items}</ContentDiv>}
				animation="scale"
				interactive
			>
				<InfoDiv>
					<IcMInfo />
				</InfoDiv>
			</ToolTip>
		</div>
	);
}

export default Info;
