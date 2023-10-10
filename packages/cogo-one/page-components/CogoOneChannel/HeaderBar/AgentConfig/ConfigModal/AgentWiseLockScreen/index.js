import { Input, Select, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMArrowBack, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { formatAgentList } from '../../../../../../helpers/groupAgentsHelpers';
import useGetOmnichannelAgentTypes from '../../../../../../hooks/useGetOmnichannelAgentTypes';
import useSyncAgentWorkPreference from '../../../../../../hooks/useSyncAgentWorkPreference';
import useUpdateAgentPreference from '../../../../../../hooks/useUpdateAgentPreference';

import GroupedAgents from './GroupedAgents';
import styles from './styles.module.css';

const LOADER_COUNT = 8;

function AgentWiseLockScreen({
	getListChatAgents = () => {},
	loading = false,
	list = [],
	setSearch = () => {},
	paramsState = {},
	setAgentType = () => {},
	setActiveCard = () => {},
	firestore = {},
	setIsInActive = () => {},
	isInActive = false,
}) {
	const {
		updateAgentPreference = () => {},
		createLoading = false,
	} = useUpdateAgentPreference({ getListChatAgents, firestore });

	const { syncWorkPreference = () => {} } = useSyncAgentWorkPreference();

	const { options = [] } = useGetOmnichannelAgentTypes();

	const modifiedGroupedAgents = loading
		? { load: [...Array(LOADER_COUNT).fill({})] } : formatAgentList({ list }) || {};

	return (
		<div className={styles.padding_inner}>
			<div className={styles.search_switch_toggle_space}>
				<div><IcMArrowBack className={styles.back_icon} onClick={() => setActiveCard('config_modal')} /></div>
				<div className={styles.toogle_section}>
					<IcMRefresh className={styles.refresh_icon} onClick={() => syncWorkPreference()} />
				</div>
			</div>
			<div className={styles.header_filters}>
				<Toggle
					name="a4"
					size="sm"
					disabled={false}
					onLabel="Inactive"
					offLabel="Active"
					onChange={() => setIsInActive((prev) => !prev)}
					value={!isInActive}
				/>

				<Input
					size="sm"
					placeholder="Search here"
					className={styles.search}
					prefix={<IcMSearchlight />}
					onChange={setSearch}
				/>
				<Select
					size="sm"
					placeholder="Select agent type"
					className={styles.select_styles}
					prefix={<IcMSearchlight />}
					onChange={setAgentType}
					options={options}
					value={paramsState?.agentType}
					isClearable
				/>
			</div>
			{!isEmpty(modifiedGroupedAgents)
				? Object.keys(modifiedGroupedAgents).map((eachType) => (
					<GroupedAgents
						key={eachType}
						groupedList={modifiedGroupedAgents[eachType]}
						groupName={eachType}
						createLoading={createLoading}
						updateAgentPreference={updateAgentPreference}
						loading={loading}
					/>
				))
				: <div className={styles.empty_state}>No data found</div>}
		</div>
	);
}

export default AgentWiseLockScreen;
