import { getByKey } from '@cogoport/utils';

import HandleCall from './HandleCall.tsx';

const emailConfig = [
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
		accessor : (row) => <HandleCall row={row} />,
		id       : 'mobile',
	},
];

export default emailConfig;
