import { InputNumber, Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { FLASH_MESSAGES_ROLES_LIST } from '../../../../../../constants/FLASH_MESSAGES_ROLES_LIST';
import { getIsActive, updateCogooneConstants } from '../../../../../../helpers/configurationHelpers';

import styles from './styles.module.css';

const ONE_MILLI_SECOND = 60000;
const DECIMAL_VALUE = 0;

function RoleWiseFlashAgentChat({
	firestore = {},
	source = 'claim_chat_configuration',
	handleClose = () => {},
}) {
	const [timeoutValues, setTimeoutValues] = useState({});

	const timeInMilliSecond = Object.keys(timeoutValues).reduce((result, key) => ({
		...result,
		[key]: Number((timeoutValues[key] * ONE_MILLI_SECOND).toFixed(DECIMAL_VALUE)),
	}), {});

	const disableSubmitButton = Object.values(timeoutValues).some((value) => Number.isNaN(value))
	|| isEmpty(timeoutValues);

	const handleSubmit = () => {
		updateCogooneConstants({ firestore, timeout: timeInMilliSecond, source });
		handleClose();
		Toast.success('Successfully Save !');
	};

	useEffect(() => {
		getIsActive({ firestore, setTimeoutValues });
	}, [firestore]);

	return (
		<>
			<div className={styles.timeout_label}>Timeout</div>
			<div className={styles.roles_timeout_section}>
				{(FLASH_MESSAGES_ROLES_LIST || []).map((item) => (
					<div className={styles.roles_timeout_section_parts} key={item.key}>
						<div className={styles.roles_label}>{item.label}</div>
						<div className={styles.select_section}>
							<InputNumber
								size="sm"
								placeholder="Timeout"
								min={0}
								value={timeoutValues?.[item.key]}
								arrow={false}
								onChange={(val) => setTimeoutValues((prev) => ({
									...prev,
									[item?.key]: val,
								}))}
								className={styles.styled_select}
							/>
							<span className={styles.minute_label}>min</span>
						</div>
					</div>
				))}
			</div>
			<div className={styles.button_section}>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit}
					disabled={disableSubmitButton}
				>
					Submit
				</Button>
			</div>
		</>
	);
}

export default RoleWiseFlashAgentChat;
