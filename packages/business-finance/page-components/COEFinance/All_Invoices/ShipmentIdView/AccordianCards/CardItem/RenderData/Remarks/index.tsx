import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import { formatDate } from '../../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface ItemTypes {
	remarksTimeline?: [];
	remarks?: string;
}
interface ItemProps {
	billStatus?:string;
	createdAt?:Date;
	remark?:string;
}

interface PropsType {
	itemData: ItemTypes;
}

function Remarks({ itemData }: PropsType) {
	const { remarksTimeline } = itemData || {};
	const remarkData = remarksTimeline;

	function RemarksContent() {
		if (isEmpty(remarksTimeline)) {
			return <div>No Remarks</div>;
		}
		return (remarkData || []).map((item:ItemProps, idx: number) => {
			const { billStatus, createdAt, remark } = item || {};
			return (
				<div className={styles.timeline_wrapper}>
					<div className={styles.left_content}>
						{formatDate(createdAt!, 'dd-MMM-yy', {}, true)}
						<div>{formatDate(createdAt!, ' hh:mm a', {}, true)}</div>
					</div>
					<div className={styles.path}>
						<div className={styles.circle} />
						{idx !== remarkData.length - 1 ? (
							<div className={styles.line} />
						) : null}
					</div>

					<div className={styles.right_content}>
						<div className={styles.status_content}>{startCase(billStatus!)}</div>
						<div>{remark}</div>
					</div>
				</div>
			);
		});
	}

	return (
		<div>
			<Popover placement="top" render={RemarksContent()}>
				<div>
					<IcMProvision
						height={20}
						width={20}
						color="#F68B21"
						style={{ cursor: 'pointer' }}
					/>
				</div>
			</Popover>
		</div>
	);
}

export default Remarks;
