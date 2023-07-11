import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getListColumns = () => {
	const LIST_COLUMNS = [
		{
			id       : 'agent',
			accessor : ({ name, roles_data }) => (
				<p>
					{name || '___'}
					{' '}
					:
					{' '}
					{roles_data[GLOBAL_CONSTANTS.zeroth_index]?.name || '___'}
				</p>
			),
		},
		{
			id       : 'checkbox',
			accessor : () => <Checkbox />,
		},
	];

	return {
		LIST_COLUMNS,
	};
};

export default getListColumns;
