import { Button, Toggle } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useEffect } from 'react';

import RenderLabel from './RenderLabel';
import styles from './styles.module.css';

const getShiftValue = ({ list = [] }) => {
	const updatedShiftValue = (list || []).reduce((acc, item) => {
		if (item && item?.id && item?.cogoone_shift && item?.shift_name) {
			acc[item.id] = {
				id         : item.cogoone_shift.id,
				shift_name : item.shift_name,
			};
		}
		return acc;
	}, {});

	return updatedShiftValue;
};

function AgentStatusConfig({
	onChangeToggle = () => {},
	statusLoading = false,
	handleToggle = () => {},
	shiftData = {},
	setShiftData = () => {},
	updateUserStatus = () => {},
	list = [],
	itm = {},
}) {
	const { agent_type: agentType = '', id: rowId = '', status = '', agent_id: agentId = '' } = itm || {};

	const handleSelecteddata = ({ selectedId = '', obj = {} }) => {
		if (!selectedId) {
			return;
		}

		setShiftData((prev) => ({
			...prev,
			[rowId]: {
				id         : obj?.id,
				shift_name : obj?.shift_name,
			},
		}));

		updateUserStatus({
			shift_name : obj?.shift_name,
			status,
			userId     : agentId,
		});
	};

	const setShiftTime = getShiftValue({ list });

	useEffect(() => {
		setShiftData(setShiftTime);
	}, [setShiftData, setShiftTime]);

	return (
		<div className={styles.container}>
			<AsyncSelect
				asyncKey="cogoone_shift_time"
				initialCall={false}
				onChange={(val, obj) => handleSelecteddata({ selectedId: val, obj })}
				value={shiftData?.[rowId]?.id}
				placeholder="Select shift"
				size="xs"
				params={{
					filters: {
						team_name : agentType,
						status    : 'active',
					},
				}}
				renderLabel={(item) => <RenderLabel item={item} />}
				className={styles.select_section}
			/>
			<Button
				size="sm"
				themeType="secondary"
				onClick={() => handleToggle({ status, agentId })}
				disabled={statusLoading}
			>
				Mark as Leave

			</Button>
			<Toggle
				size="md"
				checked={status === 'active'}
				value={status}
				onChange={() => onChangeToggle({ agentId, status })}
				disabled={statusLoading}
				className={styles.toggle}
			/>
		</div>
	);
}

export default AgentStatusConfig;
