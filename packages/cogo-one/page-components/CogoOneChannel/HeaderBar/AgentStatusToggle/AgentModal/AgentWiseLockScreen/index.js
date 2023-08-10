import { Input, Select, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { getIsActive, updateCogooneConstants } from '../../../../../../helpers/configurationHelpers';
import { formatAgentList } from '../../../../../../helpers/groupAgentsHelpers';
import useGetOmnichannelAgentTypes from '../../../../../../hooks/useGetOmnichannelAgentTypes';
import useUpdateAgentPreference from '../../../../../../hooks/useUpdateAgentPreference';

import GroupedAgents from './GroupedAgents';
import styles from './styles.module.css';

const LOADER_COUNT = 8;

function AgentWiseLockScreen({
	firestore = {},
	getListChatAgents = () => {},
	loading = false,
	list = [],
	setSearch = () => {},
	paramsState = {},
	setAgentType = () => {},
	setActiveCard = () => {},
}) {
	const [isLockedToggle, setIsLockedToggle] = useState(false);

	const {
		updateAgentPreference,
		createLoading = false,
	} = useUpdateAgentPreference({ getListChatAgents });

	const { options = [] } = useGetOmnichannelAgentTypes();

	const onToggle = (e) => {
		setIsLockedToggle(e?.target?.checked);
		updateCogooneConstants({ firestore, value: e?.target?.checked });
	};

	const modifiedGroupedAgents = loading
		? { load: [...Array(LOADER_COUNT).fill({})] } : formatAgentList({ list }) || {};

	useEffect(() => {
		getIsActive({ firestore, setIsLockedToggle });
	}, [firestore]);

	return (
		<>
			<div className={styles.search_switch_toggle_space}>
				<div><IcMArrowBack className={styles.back_icon} onClick={() => setActiveCard('')} /></div>
				<div className={styles.toogle_section}>
					Screen Lock
					<Toggle
						onChange={onToggle}
						checked={isLockedToggle}
					/>
				</div>
			</div>
			<div className={styles.header_filters}>
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
		</>
	);
}

export default AgentWiseLockScreen;
