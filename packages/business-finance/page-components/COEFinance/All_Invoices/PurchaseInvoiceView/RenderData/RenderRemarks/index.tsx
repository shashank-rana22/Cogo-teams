import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

interface RemarksData {
	billStatus:string,
	remark:string,
	createdAt:Date
}
interface ItemProps {
	remarksTimeline?:Array<RemarksData>
}
interface Props {
	item:ItemProps;
}

function RenderRemarks({ item }:Props) {
	const { remarksTimeline } = item || {};
	const remarkData = remarksTimeline;

	const remarkTimeline = () => (remarkData || []).map((items, idx) => {
		const StatusItem = items?.billStatus?.toLowerCase();
		return (
			<div className={styles.timeline_wrapper}>
				<div className={styles.left_content}>
					{format(items?.createdAt, 'dd/MMM/yyyy', null, false)}
					<div>{format(items?.createdAt, ' hh:mm a', null, false)}</div>
				</div>
				<div className={styles.path}>
					<div className={styles.circle} />
					{idx !== (remarkData || []).length - 1 ? (
						<div className={styles.line} />
					) : null}
				</div>

				<div className={styles.right_content}>
					<div className={styles.status_content}>
						{startCase(StatusItem)}
						{' '}
					</div>
					<div>{items?.remark}</div>
				</div>
			</div>
		);
	});

	return (
		<div>
			<Popover placement="top" render={remarkData ? remarkTimeline() : 'no remark found !!'}>
				<div className={styles.remarks_div}>
					<IcMProvision width="20px" height="20px" color="#F68B21" />
				</div>
			</Popover>
		</div>
	);
}

export default RenderRemarks;
