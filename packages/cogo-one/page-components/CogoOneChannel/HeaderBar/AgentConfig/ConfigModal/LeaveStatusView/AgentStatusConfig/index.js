import { Button, Select, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

const HOUR_TIME_FORMAT = 12;
const START_TIME_HOUR = 0;
const SET_SHIFT_VALUE = {};

const formatIntoObject = ({ rest }) => {
	rest.forEach((item) => {
		const key = Object.keys(item)[GLOBAL_CONSTANTS.zeroth_index];
		SET_SHIFT_VALUE[key] = item[key];
	});

	return SET_SHIFT_VALUE;
};

const formatSingleTime = ({ time }) => {
	const [hours, minutes] = time.split(':');
	let ampm = 'AM';
	let formattedHours = parseInt(hours, 10);

	if (formattedHours >= HOUR_TIME_FORMAT) {
		ampm = 'PM';
		if (formattedHours > HOUR_TIME_FORMAT) {
			formattedHours -= HOUR_TIME_FORMAT;
		}
	} else if (formattedHours === START_TIME_HOUR) {
		formattedHours = HOUR_TIME_FORMAT;
	}

	return `${formattedHours}:${minutes} ${ampm}`;
};

function RenderLabel({ item = {} }) {
	const { team_name = '', start_time_local = '', end_time_local = '' } = item || {};
	return (
		<div className={styles.content}>
			<div className={styles.label}>{startCase(team_name)}</div>
			<div className={styles.shift_name}>
				Shift :
				{' '}
				<span>
					{formatSingleTime({ time: start_time_local })}
					{' '}
					-
					{' '}
					{formatSingleTime({ time: end_time_local })}
				</span>
			</div>
		</div>
	);
}

function AgentStatusConfig({
	status = '',
	agentId = '',
	onChangeToggle = () => {},
	statusLoading = false,
	handleToggle = () => {},
	shiftList = [],
	shiftData = {},
	setShiftData = () => {},
	rowId = '',
	updateUserStatus = () => {},
	list = [],
}) {
	const handleSelecteddata = async ({ selectedId = '', obj = {} }) => {
		if (!selectedId) {
			return;
		}

		await setShiftData((prev) => ({
			...prev,
			[rowId]: {
				id        : selectedId,
				team_name : obj?.team_name,
				status,
			},
		}));

		updateUserStatus({
			team_name : obj?.team_name,
			status,
			userId    : agentId,
		});
	};

	const rest = (list || []).map((it) => ({
		[it?.id]: {
			team_name : it?.team_name,
			id        : it?.cogoone_shift?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
		},
	}));

	const setShiftTime = formatIntoObject({ rest });

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
				labelKey="team_name"
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
