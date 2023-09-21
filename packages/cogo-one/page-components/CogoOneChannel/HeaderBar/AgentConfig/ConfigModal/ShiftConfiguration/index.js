import { Select, Button, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';
import useListCogooneShiftConfiguration from '../../../../../../hooks/useListCogooneShiftConfiguration';
import { getAgentTypesList } from '../../../../../../utils/getCommonAgentType';

import ConfigMapping from './ConfigMapping';
import styles from './styles.module.css';

const ENABLE_SELECT_FOR = ['cogoone_admin'];

const agentTypesList = () => {
	const { filteredAgentTypes } = getAgentTypesList();

	return filteredAgentTypes.map((itm) => ({
		label : startCase(itm),
		value : itm,
	}));
};

function ShiftConfiguration({
	handleClose = () => {},
	viewType = '',
}) {
	const [selectedTeam, setSelectedTeam] = useState(
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.shift_view_default_type || '',
	);

	const {
		shiftsData = {},
		shiftDataLoading = false,
	} = useListCogooneShiftConfiguration({ selectedTeam });

	return (
		<div className={styles.container}>
			{ENABLE_SELECT_FOR.includes(viewType) ? (
				<div className={styles.select_container}>
					<Select
						value={selectedTeam}
						onChange={setSelectedTeam}
						placeholder="Select Agent Type"
						options={agentTypesList()}
						size="sm"
						className={styles.select_teams}
					/>
				</div>
			) : null}

			{shiftDataLoading
				? (
					<>
						<div className={styles.loading}>
							<Loader themeType="primary" />
						</div>

						<div className={styles.button_section}>
							<Button
								size="md"
								themeType="tertiary"
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								size="md"
								themeType="primary"
								disabled
							>
								Submit
							</Button>
						</div>
					</>
				) : (
					<ConfigMapping
						shiftsData={shiftsData}
						selectedTeam={selectedTeam}
						shiftDataLoading={shiftDataLoading}
						handleClose={handleClose}
					/>
				)}
		</div>
	);
}

export default ShiftConfiguration;
