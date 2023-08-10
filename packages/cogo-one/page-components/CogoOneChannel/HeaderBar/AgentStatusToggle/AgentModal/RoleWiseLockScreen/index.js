import { Toggle, Input, Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { getRolesIsActive, updateRoleCogooneConstants } from '../../../../../../helpers/configurationHelpers';

import styles from './styles.module.css';

function RoleWiseLockScreen({
	setActiveCard = () => {},
	firestore = {},
}) {
	const [roleValue, setRoleValue] = useState({
		roles       : [],
		time        : '',
		toggleState : false,
	});

	const { roles = [], time = '', toggleState = false } = roleValue || {};

	const onToggleChange = (e) => {
		setRoleValue((prev) => ({ ...prev, toggleState: e?.target?.checked }));
		updateRoleCogooneConstants({ firestore, value: e?.target?.checked, roleIds: roles, time });
	};

	const handleSubmit = () => {
		updateRoleCogooneConstants({ firestore, value: toggleState, roleIds: roles, time });
	};

	useEffect(() => {
		getRolesIsActive({ firestore, setRoleValue });
	}, [firestore]);

	console.log(roleValue, 'roleValue');

	return (
		<>
			<IcMArrowBack className={styles.back_icon} onClick={() => setActiveCard('')} />
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

				{toggleState && (
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
						/>

						<div className={styles.label}>
							Time Delay
							<span>(in minutes)</span>
						</div>
						<Input
							size="md"
							placeholder="Enter time"
							value={time}
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
				)}
			</div>
		</>
	);
}

export default RoleWiseLockScreen;
