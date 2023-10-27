import { Table, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRight, IcMHome } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const COLUMNS = [
	{
		id       : 'id',
		Header   : 'Id',
		accessor : (item) => <div>{item?.serial_id}</div>,
	},
	{
		id       : 'request_by',
		Header   : 'Request By',
		accessor : (item) => (
			<div className={styles.label}>
				{startCase(item?.request_submitted_by?.name) || '-'}
				{' '}
				<span>{`(${startCase(item?.performed_by_type)})`}</span>
			</div>
		),
	},
	{
		id       : 'organization_name',
		Header   : 'ORGANIZATION NAME',
		accessor : (item) => <div className={styles.label}>{startCase(item?.organization?.business_name) || '-'}</div>,
	},
	{
		id       : 'request_type',
		Header   : 'REQUEST TYPE',
		accessor : (item) => <div className={styles.label}>{startCase(item?.request_type)}</div>,
	},
	{
		id       : 'assign_to',
		Header   : 'ASSIGNED TO',
		accessor : (item) => <div className={styles.label}>{startCase(item?.request_assigned_to?.name)}</div>,
	},
	{
		id       : 'completed_by',
		Header   : 'COMPLETED BY',
		accessor : (item) => <div className={styles.label}>{startCase(item?.request_completed_by?.name) || '-'}</div>,
	},
	{
		id       : 'request_on',
		Header   : 'REQUEST ON',
		accessor : (item) => (
			<div className={styles.date_content}>
				<div>
					{formatDate({
						date       : item?.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
				<div>
					{formatDate({
						date       : item?.created_at,
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'time',
					})}
				</div>
			</div>
		),
	},
	{
		id       : 'action_status',
		Header   : 'ACTION STATUS',
		accessor : (item) => (
			<div className={styles.status_div}>
				<div className={cl`${styles.circle} 
				${item?.request_status === 'completed' ? styles.complete : styles.pending}`}
				/>
				<div className={styles.status_escalate}>
					<div className={styles.title}>{startCase(item?.request_status)}</div>
					{item?.escalation_cycle ? (
						<div className={cl`${styles.esaclate} 
					${item?.escalation_cycle === 'warning' ? styles.warning : styles.escalated}`}
						>
							{startCase(item?.escalation_cycle)}
						</div>
					) : null}
				</div>
			</div>
		),
	},
];

function PlatformHistory({ setShowHistory = () => {}, list = [], loading = false }) {
	return (
		<div className={styles.history_container}>
			<div className={styles.header_section}>
				<div role="presentation" className={styles.back} onClick={() => setShowHistory(false)}>
					<IcMHome fill="#034AFD" width={20} height={20} />
					<div className={styles.back_title}>Home</div>
				</div>
				<IcMArrowRight className={styles.side_arrow} />
				<div className={styles.title}>Task History</div>
			</div>
			{!isEmpty(list) ? (
				<div className={styles.content}>
					<Table columns={COLUMNS} data={list} loading={loading} />
				</div>

			) : (
				<div className={styles.empty_container}>
					<Image src={GLOBAL_CONSTANTS.image_url.list_empty} width={300} height={300} />
				</div>
			)}
		</div>
	);
}

export default PlatformHistory;
