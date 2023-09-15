import { Button, Toggle, Select } from '@cogoport/components';
import { useEffect, useMemo } from 'react';

import RenderLabel from './RenderLabel';
import styles from './styles.module.css';

function AgentStatusConfig({
	onChangeToggle = () => {},
	statusLoading = false,
	handleToggle = () => {},
	shiftData = {},
	setShiftData = () => {},
	updateUserStatus = () => {},
	list = [],
	itm = {},
	shiftList = [],
}) {
	const { id: rowId = '', status = '', agent_id: agentId = '' } = itm || {};

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

	const setShiftTime = useMemo(() => {
		const filteredList = (list || []).filter((item) => item && item?.id
		&& item?.cogoone_shift);

		const updatedShiftValue = filteredList.reduce((acc, item) => {
			acc[item.id] = {
				id         : item?.cogoone_shift?.id,
				shift_name : item?.cogoone_shift?.shift_name,
			};
			return acc;
		}, {});
		return updatedShiftValue;
	}, [list]);

	useEffect(() => {
		setShiftData(setShiftTime);
	}, [setShiftData, setShiftTime]);

	return (
		<div className={styles.container}>
			<Select
				value={shiftData?.[rowId]?.id}
				onChange={(val, obj) => handleSelecteddata({ selectedId: val, obj })}
				size="xs"
				className={styles.select_section}
				options={shiftList || []}
				labelKey="shift_name"
				valueKey="id"
				placeholder="Select shift"
				renderLabel={(item) => <RenderLabel item={item} />}
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
