import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import DATA_PATH_TO_REMARKS from '../../Constants/DATA_PATH_TO_REMARKS';
import TYPE_TO_DATA_PATH from '../../Constants/TYPE_TO_DATA_PATH';

import styles from './styles.module.css';

const DEFAULT_LAST = 1;
const DEFAULT_VALUE = '';

function PopoverRemarks({ value = [] }) {
	return (
		<div>
			<Popover
				placement="top"
				render={value}
			>
				<div className={styles.remarks_div}>
					<IcMProvision width="20px" height="20px" color="#F68B21" />
				</div>
			</Popover>
		</div>
	);
}

const getStakeholderData = (levelData) => {
	const data = (levelData || []).map((item, idx) => {
		const { stakeholder = {}, status = '', remarks = '' } = item || {};
		const { userName = '' } = stakeholder || {};
		return (
			<div className={styles.timeline_wrapper} key={item?.remark}>
				<div className={styles.left_content}>{userName}</div>
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
		createdBy = {}, type = '', data = '',
	} = remarksDetails || {};

	const otherRemark = useMemo(() => {
		const dataPath = TYPE_TO_DATA_PATH[type];
		const additionalPath = DATA_PATH_TO_REMARKS[type];
		return dataPath ? data?.[dataPath]?.[additionalPath] || DEFAULT_VALUE : DEFAULT_VALUE;
	}, [type, data]);

	const level = {
		level       : 0,
		status      : 'REQUESTED',
		stakeholder : { userEmail: createdBy?.email, userName: createdBy?.name },
		remarks     : otherRemark || remark,
	};
	if (!isEmpty(level3)) {
		return (
			<PopoverRemarks value={getStakeholderData([level, level1, level2, level3])} />
		);
	}
	if (!isEmpty(level2)) {
		return (
			<PopoverRemarks value={getStakeholderData([level, level1, level2])} />
		);
	}
	if (!isEmpty(level1)) {
		return (
			<PopoverRemarks value={getStakeholderData([level, level1])} />
		);
	}
	if (status === 'REQUESTED') {
		return (
			<PopoverRemarks value={getStakeholderData([level, {}])} />
		);
	}
	const UPDATED_BY = {
		level       : 0,
		status      : 'APPROVED',
		stakeholder : { userEmail: updatedBy.email, userName: updatedBy.name },
		remarks     : financeRemark,
	};
	return (
		<PopoverRemarks value={getStakeholderData([level, UPDATED_BY])} />
	);
}

export default RenderRemarks;
