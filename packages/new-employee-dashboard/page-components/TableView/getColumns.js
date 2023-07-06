import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const NUMBER = 100;
const PROGRESS_PERCENTAGE = 0;

const COLOR_MAPPING = {
	active           : '#ddebc0',
	rejected_by_user : '#ffcbd1',
	inactive         : '#f1ee8e',
};

const getColumns = ({ onClickNewJoinerColumn, btnloading, updateEmployeeStatus, fetch }) => [
	{
		Header   : 'NAME & EMAIL',
		accessor : (item) => (
			<div
				role="presentation"
				className={styles.name_and_email}
				onClick={() => onClickNewJoinerColumn(item?.id)}
			>
				<div className={styles.name}>{item?.name || '-'}</div>
				{item?.personal_email || '-'}
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (item) => <div>{startCase(item?.designation)}</div>,
	},
	{
		Header   : 'REPORTING MANAGER',
		accessor : (item) => <div>{item?.reporting_namager?.userName || '-'}</div>,
	},
	{
		Header   : 'HIRING MANAGER',
		accessor : (item) => <div>{item?.hiring_manager?.userName || '-'}</div>,
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
				<Pill size="md" color={COLOR_MAPPING[item?.status]}>
					{startCase(item?.status)}
				</Pill>
			</div>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => {
			const { id, status } = item;

			return (
				<div>
					{status === 'rejected_by_user' ? (
						<Button
							loading={btnloading}
							onClick={() => {
								updateEmployeeStatus(id, 'active', fetch).then(() => fetch());
							}}
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

export default getColumns;
