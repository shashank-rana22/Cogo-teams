import { Button, Pill, Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const NUMBER = 100;
const PROGRESS_PERCENTAGE = 0;

const COLOR_MAPPING = {
	offered          : '#ddebc0',
	rejected_by_user : '#ffcbd1',
	rejected         : '#f1ee8e',
};

const getColumns = ({
	onClickNewJoinerColumn,
	btnloading, updateEmployeeStatus, fetch,
	downloadDocuments = () => {},
	documentLoading,
	bulkAction,
	handleAllSelect,
	handleSelectId,
	selectedIds,
	dataArr,
}) => {
	const columns = [
		{
			Header   : 'NAME & EMAIL',
			accessor : (item) => (
				<div
					role="presentation"
					className={styles.name_and_email}
					onClick={() => onClickNewJoinerColumn(item?.id)}
				>
					<div className={styles.name}>{item?.name || '-'}</div>
					{item?.cogoport_email || item?.personal_email || '-'}
				</div>
			),
		},
		{
			Header   : 'ROLE',
			accessor : (item) => <div>{startCase(item?.role)}</div>,
		},
		{
			Header   : 'REPORTING MANAGER',
			accessor : (item) => <div>{item?.reporting_manager?.name || '-'}</div>,
		},
		{
			Header   : 'HIRING MANAGER',
			accessor : (item) => <div>{item?.hiring_manager?.name || '-'}</div>,
		},
		{
			Header   : 'DATE OF JOINING',
			accessor : (item) => (
				<div>
					{formatDate({
						date       : item.date_of_joining,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
						formatType : 'date',
					})}
				</div>
			),
		},
		{
			Header   : 'PROFILE COMPLETION',
			accessor : (item) => {
				const progress_percentage = item?.progress?.progress_percentage || PROGRESS_PERCENTAGE;
				return (
					<div className={styles.profile_completion}>
						<div className={styles.animate}>
							<div
								className={styles.progress_bar}
								style={{ width: `${progress_percentage}%` }}
							>
								<div className={styles.progress} />
							</div>
						</div>
						<div>
							{Math.round(progress_percentage * NUMBER) / NUMBER}
							% complete
						</div>
					</div>
				);
			},
		},
		{
			Header   : 'STATUS',
			accessor : (item) => (
				<div>
					<Pill size="md" color={COLOR_MAPPING[item?.employee_status]}>
						{startCase(item?.employee_status)}
					</Pill>
				</div>
			),
		},
		{
			Header   : 'DOWNLOAD ZIP FILE',
			accessor : (item) => (
				<div>
					<Button
						themeType="secondary"
						onClick={() => downloadDocuments(item?.id)}
						loading={documentLoading}
					>
						<IcMDownload width={14} height={14} />
						{' '}
						<span style={{ paddingLeft: 6 }}>
							Download
						</span>
					</Button>
				</div>
			),
		},
		{
			Header   : 'ACTION',
			accessor : (item) => {
				const { id, employee_status } = item;

				return (
					<div>
						{employee_status === 'rejected_by_user' ? (
							<Button
								loading={btnloading}
								onClick={() => { updateEmployeeStatus(id, 'offered', fetch).then(() => fetch()); }}
								themeType="secondary"
							>
								Re-Apply
							</Button>
						) : null}
					</div>
				);
			},
		},

	];
	if (bulkAction) {
		columns.unshift({
			id     : 'action',
			Header : () => (
				<div>
					<Checkbox
						checked={dataArr.length === selectedIds.length}
						onChange={(e) => handleAllSelect(e)}
					/>
				</div>
			),
			accessor: (item) => (
				<div>
					<Checkbox
						checked={selectedIds.includes(item.id)}
						onChange={(e) => handleSelectId(e, item.id)}
					/>
				</div>
			),
		});
	}
	return columns;
};

export default getColumns;
