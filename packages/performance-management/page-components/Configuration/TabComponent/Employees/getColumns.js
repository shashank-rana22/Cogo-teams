import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ROUND_OFF_DIGIT = 100;
const PROGRESS_PERCENTAGE = 0;

const COLOR_MAPPING = {
	active           : '#ddebc0',
	rejected_by_user : '#ffcbd1',
	inactive         : '#f1ee8e',
};

const getColumns = () => [
	{
		Header   : 'NAME & EMAIL',
		accessor : (item) => (
			<div className={styles.name_and_email}>
				<div className={styles.name}>{item?.name || '-'}</div>
				{ item?.cogoport_email || item?.personal_email || '-'}
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (item) => <div>{startCase(item?.designation)}</div>,
	},
	{
		Header   : 'REPORTING MANAGER',
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
						{Math.round(progress_percentage * ROUND_OFF_DIGIT) / ROUND_OFF_DIGIT}
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
];

export default getColumns;
