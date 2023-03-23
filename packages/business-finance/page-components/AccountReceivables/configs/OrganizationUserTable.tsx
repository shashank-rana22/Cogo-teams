import { startCase, getByKey } from '@cogoport/utils';

import HandleCall from './HandleCall';

const OrganizationColumn = () => [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => (

			<div>
				{getByKey(row, 'name') as string}
			</div>

		),

	},
	{
		Header   : 'Email',
		id       : 'email',
		accessor : (row) => (

			<div>
				{getByKey(row, 'email') as string}
			</div>

		),

	},
	{
		Header   : 'Mobile Number',
		accessor : (row) => (
			<div>
				<div>
					{getByKey(row, 'mobile_number') as string}

				</div>
			</div>
		),
	},

	{
		Header   : 'Work Scopes',
		accessor : (row) => (
			<div>
				{ row?.work_scopes?.length > 0 ? (
					<div>
						{(getByKey(row, 'work_scopes') as []).map((val) => <div>{startCase(val)}</div>)}
					</div>
				) : ('-')}
			</div>
		),
	},
	{
		Header   : '',
		accessor : (row) => (

			<HandleCall row={row} />

		),
		id: 'mobile',

	},
];

export default OrganizationColumn;
