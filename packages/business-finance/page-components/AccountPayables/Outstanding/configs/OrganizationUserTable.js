import { startCase, isEmpty } from '@cogoport/utils';

const organizationColumn = [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => <div>{row?.name || '_'}</div>,
	},
	{
		Header   : 'Email',
		id       : 'email',
		accessor : (row) => <div>{row?.email || '_' }</div>,
	},
	{
		Header   : 'Mobile Number',
		accessor : (row) => (
			<div>{row?.mobile_number || '_'}</div>
		),
	},

	{
		Header   : 'Work Scopes',
		accessor : (row) => (
			<div>
				{!isEmpty(row?.work_scopes) ? (
					<div>
						{(row?.work_scopes || []).map((val) => (
							<div key={val}>{startCase(val)}</div>
						))}
					</div>
				) : (
					'-'
				)}
			</div>
		),
	},
];

export default organizationColumn;
