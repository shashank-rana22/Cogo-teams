import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMProvision } from '@cogoport/icons-react';
import { format, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import RenderAdditionalRemarks from './RenderAdditionalRemarks';
import styles from './styles.module.css';

const DEFAULT_LAST = 1;

function RenderRemarks({ item = {} }) {
	const { remarksTimeline } = item || {};

	const RemarkTimeline = () => (remarksTimeline || []).map((items, idx) => {
		const { billStatus, additionalRemarks, createdAt, remark } = items || {};
		const statusItem = billStatus?.toLowerCase();
		const additionalRemarksList = Object.values(additionalRemarks || {})
			?.filter((singleItem) => typeof singleItem === 'string' && !isEmpty(singleItem));

		return (
			<div className={styles.timeline_wrapper} key={item?.remark}>
				<div className={styles.left_content}>
					{format(createdAt, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'], null, false)}
					<div>{format(createdAt, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'], null, false)}</div>
				</div>
				<div className={styles.path}>
					<div className={styles.circle} />
					{idx !== (remarksTimeline || []).length - DEFAULT_LAST ? (
						<div className={styles.line} />
					) : null}
				</div>

				<div className={styles.right_content}>
					<div className={styles.status_content}>
						{startCase(statusItem)}
						{' '}
					</div>
					{!isEmpty(remark) ? (
						<div style={{ margin: '8px 0' }}>
							•
							{' '}
							{remark}
						</div>
					) : null}
					{!isEmpty(additionalRemarksList) ? (
						<RenderAdditionalRemarks
							additionalRemarksList={additionalRemarksList}
						/>
					) : null}
				</div>
			</div>
		);
	});

	return (
		<Popover
			className={styles.remark_popover}
			placement="top"
			render={remarksTimeline
				? <RemarkTimeline /> : 'No remark found'}
		>
			<div className={styles.remarks_div}>
				<IcMProvision width="20px" height="20px" color="#F68B21" />
			</div>
		</Popover>
	);
}

export default RenderRemarks;
