import { Toggle, InputNumber, Button, Toast } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { getIsActive, updateCogooneConstants } from '../../../../../../helpers/configurationHelpers';

import styles from './styles.module.css';

const ONE_MILLI_SECOND = 60000;
const TIME_DELAY_IN_MINUTE = 15;

function RoleWiseLockScreen({
	firestore = {},
}) {
	const [roleValue, setRoleValue] = useState({
		roles       : [],
		time        : TIME_DELAY_IN_MINUTE,
		toggleState : false,
	});

	const { roles = [], time = '', toggleState = false } = roleValue || {};
	const timeInMilliSecond = Number(time) * ONE_MILLI_SECOND;

	const onToggleChange = (e) => {
		setRoleValue((prev) => ({ ...prev, toggleState: e?.target?.checked }));
		updateCogooneConstants({ firestore, value: e?.target?.checked, roleIds: roles, time: timeInMilliSecond });
	};

	const handleSubmit = () => {
		updateCogooneConstants({ firestore, value: toggleState, roleIds: roles, time: timeInMilliSecond });
		Toast.success('Successfully Save !');
	};

	useEffect(() => {
		getIsActive({ firestore, setRoleValue });
	}, [firestore]);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				Screen Lock
				<Toggle
					name="a4"
					size="md"
					disabled={false}
					checked={toggleState}
					onChange={onToggleChange}
				/>
			</div>

			{toggleState ? (
				<>
					<div className={styles.label}>Select Roles to enable Lock Screen</div>
					<AsyncSelect
						value={roles}
						placeholder="Select roles"
						isClearable
						size="md"
						className={styles.styled_select}
						onChange={(value) => setRoleValue((prev) => ({ ...prev, roles: value }))}
						multiple
						asyncKey="partner_roles"
						initialCall
						params={{
							permissions_data_required    : false,
							add_service_objects_required : false,
							filters                      : {
								stakeholder_type : 'partner',
								entity_types     : ['cogoport'],
							},
						}}
					/>

					<div className={styles.label}>
						Time Delay
						<span>(in minutes)</span>
					</div>
					<InputNumber
						size="md"
						placeholder="Enter time"
						min={0}
						value={time}
						arrow={false}
						className={styles.styled_select}
						onChange={(value) => setRoleValue((prev) => ({ ...prev, time: value }))}
					/>

					<div className={styles.button_section}>
						<Button
							size="md"
							themeType="primary"
							onClick={handleSubmit}
							disabled={!time || isEmpty(roles)}
						>
							Submit

						</Button>
					</div>
				</>
			) : null}
		</div>
	);
}

export default RoleWiseLockScreen;
