import { getByKey } from '@cogoport/utils';

import HandleCall from './HandleCall';

const emailConfig = ({ orgData }) => [
	{
		Header   : 'Recipient',
		id       : 'recipient',
		accessor : (row) => <div>{getByKey(row, 'name') }</div>,
	},
	{
		Header   : 'Sent At',
		id       : 'sent_at',
		accessor : (row) => <div>{getByKey(row, 'email')}</div>,
	},
	{
		Header   : 'Mail Body',
		accessor : (row) => (
			<div>
				<div>{getByKey(row, 'email_body')}</div>
			</div>
		),
	},
	{
		Header   : '',
		accessor : (row) => <HandleCall row={row} orgData={orgData} />,
		id       : 'mobile',
	},
];

export default emailConfig;
