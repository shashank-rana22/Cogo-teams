import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_LAST = 1;

const stakeholderData = (levelData) => {
	const data = (levelData || []).map((item, idx) => {
		const { stakeholder = {}, status = '', remarks = '' } = item || {};
		const { userName = '' } = stakeholder || {};
		return (
			<div className={styles.timeline_wrapper} key={item?.remark}>
				<div className={styles.left_content}>
					<div>{userName}</div>
				</div>
				<div className={styles.path}>
					<div className={styles.circle} />
					{idx !== (levelData || []).length - DEFAULT_LAST ? (
						<div className={styles.line} />
					) : null}
				</div>

				<div className={styles.right_content}>
					<div className={styles.status_content}>
						{startCase(status)}
						{' '}
					</div>
					{!isEmpty(remarks) ? (
						<div style={{ margin: '8px 0' }}>
							•
							{' '}
							{remarks}
						</div>
					) : '-'}
				</div>
			</div>
		);
	});

	return data;
};

function RenderRemarks({
	remarksDetails = {},
}) {
	const {
		level3 = {}, level2 = {}, level1 = {}, status = '', updatedBy = {}, financeRemark = '', remark = '',
		createdBy = {},
	} = remarksDetails || {};
	const level = {
		level       : 0,
		status      : 'REQUESTED',
		stakeholder : { userEmail: createdBy.email, userName: createdBy.name },
		remarks     : remark,
	};
	if (!isEmpty(level3)) {
		return (
			<div>
				<Popover
					placement="top"
					render={level
						? stakeholderData([level, level1, level2, level3]) : 'No remark found'}
				>
					<div className={styles.remarks_div}>
						<IcMProvision width="20px" height="20px" color="#F68B21" />
					</div>
				</Popover>
			</div>
		);
	}
	if (!isEmpty(level2)) {
		return (
			<div>
				<Popover
					placement="top"
					render={level
						? stakeholderData([level, level1, level2]) : 'No remark found'}
				>
					<div className={styles.remarks_div}>
						<IcMProvision width="20px" height="20px" color="#F68B21" />
					</div>
				</Popover>
			</div>
		);
	}
	if (!isEmpty(level1)) {
		return (
			<div>
				<Popover
					placement="top"
					render={level
						? stakeholderData([level, level1]) : 'No remark found'}
				>
					<div className={styles.remarks_div}>
						<IcMProvision width="20px" height="20px" color="#F68B21" />
					</div>
				</Popover>
			</div>
		);
	}
	if (status === 'REQUESTED') {
		return (
			<div>
				<Popover placement="top" render={level ? stakeholderData([level, {}]) : 'No remark found'}>
					<div className={styles.remarks_div}>
						<IcMProvision width="20px" height="20px" color="#F68B21" />
					</div>
				</Popover>
			</div>
		);
	}
	const UPDATED_BY = {
		level       : 0,
		status      : 'APPROVED',
		stakeholder : { userEmail: updatedBy.email, userName: updatedBy.name },
		remarks     : financeRemark,
	};
	return (
		<div>
			<Popover
				placement="top"
				render={level
					? stakeholderData([level, UPDATED_BY]) : 'No remark found'}
			>
				<div className={styles.remarks_div}>
					<IcMProvision width="20px" height="20px" color="#F68B21" />
				</div>
			</Popover>
		</div>
	);
}

export default RenderRemarks;
