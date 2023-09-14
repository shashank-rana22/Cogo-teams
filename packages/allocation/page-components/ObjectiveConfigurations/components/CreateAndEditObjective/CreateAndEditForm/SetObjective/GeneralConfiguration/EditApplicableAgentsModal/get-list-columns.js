import { Checkbox, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const getListColumns = (props) => {
	const { selectMode, selectedAgentIds, setSelectedAgentIds, t = () => {} } = props;

	const LIST_COLUMNS = [
		{
			id       : 'agent',
			accessor : ({ name, roles_data, block_access }) => (
				<div className={styles.agent_container}>
					<p className={styles.agent}>
						{name || '___'}
						{' '}
						:
						{' '}
						{roles_data[GLOBAL_CONSTANTS.zeroth_index]?.name || '___'}
					</p>

					{block_access ? <Pill color="red">{t('allocation:blocked_label')}</Pill> : null}
				</div>
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
