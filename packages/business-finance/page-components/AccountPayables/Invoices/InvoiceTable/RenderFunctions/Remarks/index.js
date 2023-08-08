import { Popover } from '@cogoport/components';
import { IcMOverflowDot, IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import useGetActions from '../../../hooks/useGetActions';

import RemarkContent from './RemarkContent';
import styles from './styles.module.css';

function Remark({ itemData = {}, overflowDot }) {
	const {
		remarkLoading,
		fetchRemarkHistory,
		remarkData,
	} = useGetActions({
		itemData,
	});

	return (
		<div className={styles.flex}>
			<Popover
				theme="light"
				interactive
				animation="shift-toward"
				placement="left"
				content={(
					<RemarkContent
						remarkData={remarkData}
						remarkLoading={remarkLoading}
					/>
				)}
			>
				<div>
					{overflowDot ? (
						<IcMOverflowDot
							onClick={fetchRemarkHistory}
							size={2}
							style={{ cursor: 'pointer' }}
							height={20}
							width={20}
						/>
					) : (
						<IcMProvision
							onClick={fetchRemarkHistory}
							style={{ cursor: 'pointer' }}
							height={24}
							width={24}
							color="#F68B21"
						/>
					)}
				</div>
			</Popover>
		</div>
	);
}

export default Remark;
