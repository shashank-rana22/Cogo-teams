import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ onClickNewJoinerColumn }) => [
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
		accessor : (item) => (
			<div>
				{startCase(item?.designation)}
			</div>
		),
	},
	{
		Header   : 'REPORTING MANAGER',
		accessor : (item) => (
			<div>
				{item?.reporting_manager || '-'}
			</div>
		),
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
			const progress = item.progress || Math.floor(Math.random() * 100);
			return (
				<div className={styles.profile_completion}>
					<div className={styles.animate}>
						<div className={styles.progress_bar} style={{ width: `${progress}%` }}>
							<div className={styles.progress} />
						</div>
					</div>
					<div>
						{progress}
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
				<Pill
					size="md"
					color="#fff085"
				>
					{startCase(item?.status)}
				</Pill>
			</div>
		),
	},
];

export default getColumns;
