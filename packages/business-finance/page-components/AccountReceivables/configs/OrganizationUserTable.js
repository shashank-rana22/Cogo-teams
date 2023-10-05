import { startCase, getByKey, isEmpty } from '@cogoport/utils';

import MailEditorModal from '../components/Outstanding/MailModal';

import HandleCall from './HandleCall';
import styles from './styles.module.css';

const organizationColumn = ({ orgData }) => [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => <div>{getByKey(row, 'name')}</div>,
	},
	{
		Header   : 'Email',
		id       : 'email',
		accessor : (row) => <div>{getByKey(row, 'email')}</div>,
	},
	{
		Header   : 'Mobile Number',
		accessor : (row) => (
			<div>
				<div>{getByKey(row, 'mobile_number')}</div>
			</div>
		),
	},

	{
		Header   : 'Work Scopes',
		accessor : (row) => (
			<div>
				{!isEmpty(row?.work_scopes) ? (
					<div>
						{(getByKey(row, 'work_scopes')).map((val) => (
							<div key={val}>{startCase(val)}</div>
						))}
					</div>
				) : (
					'-'
				)}
			</div>
		),
	},
	{
		Header   : '',
		accessor : (row) => (
			<div className={styles.flexmail}>
				<HandleCall row={row} orgData={orgData} />
				<MailEditorModal email={row?.email} />
			</div>
		),
		id: 'mobile',
	},
];

export default organizationColumn;
