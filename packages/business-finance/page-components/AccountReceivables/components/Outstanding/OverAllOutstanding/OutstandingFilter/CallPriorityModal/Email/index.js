import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import emailConfig from '../../../../../../configs/email_config';
import useGetEmails from '../../../../../../hooks/useGetDunningEmails';
import Table from '../Table';

import styles from './styles.module.css';

function Email({ orgData = {} }) {
	const [isActive, setIsActive] = useState(false);
	const {
		loading,
		data,
		setFilters,
		filters,
	} = useGetEmails({
		orgData,
		isActive,
	});

	return (
		<div className={styles.container}>
			<div className={styles.toggle}>
				<Toggle
					offLabel="Sent"
					onLabel="Received"
					size="sm"
					onChange={() => setIsActive(!isActive)}
					showOnOff
					value={isActive}
				/>
			</div>
			<Table
				filters={filters}
				setFilters={setFilters}
				data={data}
				loading={loading}
				config={emailConfig({ orgData })}
			/>
		</div>
	);
}

export default Email;
