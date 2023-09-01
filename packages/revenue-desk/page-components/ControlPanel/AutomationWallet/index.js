import { Button, Select } from '@cogoport/components';
import React, { useState } from 'react';

import { serviceOptions } from '../../../helpers/filterOptionMapping';
import useListRevenueDeskWallet from '../../../hooks/useListRevenueDeskWallet';

import CreateWallet from './CreateWallet';
import AutomationWalletDetails from './Details';
import styles from './styles.module.css';

function AutomationWallet() {
	const { data, filters = {}, setFilter = () => {}, refetch = () => {}, loading } = useListRevenueDeskWallet();
	const [createWallet, setCreateWallet] = useState(false);

	const onChange = (item, key) => {
		setFilter((prev) => ({ ...prev, [key]: item }));
	};

	return (
		<>
			<div className={styles.container}>
				<Select
					placeholder="Service Type"
					options={serviceOptions}
					value={filters?.service_type}
					onChange={(val) => onChange(val, 'service_type')}
					size="md"
				/>

				<Button
					size="md"
					themeType="accent"
					onClick={() => setCreateWallet(!createWallet)}
				>
					Create New Wallet
				</Button>
			</div>
			{data?.map((val) => (
				<div key={val?.id}>
					<AutomationWalletDetails data={val} refetch={refetch} loading={loading} />
				</div>
			))}

			{createWallet && (
				<CreateWallet
					createWallet={createWallet}
					setCreateWallet={setCreateWallet}
					refetch={refetch}
				/>
			)}
		</>
	);
}

export default AutomationWallet;
