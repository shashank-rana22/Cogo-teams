import { Tooltip, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getColumns = ({ btnLoading, updateApprovalRequest = () => {}, handleRedirect = () => {} }) => {
	const handleUpdate = (item, status) => {
		const id = item?.id;
		updateApprovalRequest({ id, status });
	};
	return ([
		{
			Header   : 'NAME',
			accessor : (item) => (
				<section className={styles.name_container}>
					<Tooltip
						maxWidth={400}
						content={item?.test?.name || item?.course?.name || '-'}
						placement="top"
					>
						<div className={styles.name}>
							{item?.test?.name || item?.course?.name || '-'}
						</div>
					</Tooltip>
				</section>
			),
		},

		{
			Header   : 'COURSE/TEST',
			accessor : ({ object_type }) => (
				<div className={styles.name}>
					{object_type || '-'}
				</div>
			),
		},

		{
			Header   : 'CREATED BY',
			accessor : ({ requested_by_user }) => (
				<section className={styles.name_container}>
					<Tooltip
						maxWidth={400}
						content={requested_by_user?.name || '-'}
						placement="top"
					>
						<div className={styles.name}>
							{requested_by_user?.name || '-'}
						</div>
					</Tooltip>
				</section>
			),
		},

		{
			Header   : 'CREATED BY MAIL ID',
			accessor : ({ requested_by_user }) => (
				<section className={styles.name_container}>
					<Tooltip
						maxWidth={400}
						content={requested_by_user?.email || '-'}
						placement="top"
					>
						<div className={styles.name}>
							{requested_by_user?.email || '-'}
						</div>
					</Tooltip>
				</section>
			),
		},

		{
			Header   : 'CREATED AT',
			accessor : ({ created_at }) => (
				<div className={styles.time}>
					<span style={{ marginRight: '4px' }}>
						{format(created_at, 'dd MMM yy')}
					</span>
					<span>{format(created_at, 'h:mm a')}</span>
				</div>
			),

		},

		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div>
					<div className={styles.options}>
						<Button
							size="sm"
							style={{ width: '60px' }}
							onClick={() => handleRedirect(item?.object_id, item?.object_type)}
						>
							Redirect
						</Button>
						<Button
							size="sm"
							themeType="secondary"
							loading={btnLoading}
							style={{ width: '60px', marginLeft: '4px' }}
							onClick={() => handleUpdate(item, 'approved')}
						>
							Approve
						</Button>
						<Button
							size="sm"
							themeType="secondary"
							loading={btnLoading}
							style={{ width: '60px', marginLeft: '4px' }}
							onClick={() => handleUpdate(item, 'rejected')}
						>
							Reject
						</Button>
					</div>

				</div>
			),
		},
	]
	);
};

export default getColumns;
