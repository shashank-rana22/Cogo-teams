import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getListColumns = (props) => {
	const { selectMode, selectedAgentIds, setSelectedAgentIds } = props;

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
			accessor : ({ user_id }) => (
				<Checkbox
					checked={selectMode === 'select_all' ? true : selectedAgentIds.includes(user_id)}
					disabled={selectMode === 'select_all'}
					onChange={(event) => {
						setSelectedAgentIds((previousIds) => {
							if (event.target.checked) {
								return [...previousIds, user_id];
							}
							return previousIds.filter((selectedId) => selectedId !== user_id);
						});
					}}
				/>
			),
		},
	];

	return {
		LIST_COLUMNS,
	};
};

export default getListColumns;
