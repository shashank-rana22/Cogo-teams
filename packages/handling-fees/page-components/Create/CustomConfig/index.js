import { Button, TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetHandlingFee from '../../../hooks/useGetHandlingFee';

import CustomConfigForm from './CustomConfigForm';
import CustomHandlingFeesList from './CustomHandlingFeesList';
import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

function CustomConfig() {
	const router = useRouter();

	const { id } = router?.query || {};

	const {
		data = {},
		loading = false,
		refetchGetHandlingFeeData = () => { },
		listType = '',
		setListType = () => { },
	} = useGetHandlingFee({ id });

	const { organization_type = '', cogo_entity_id = '' } = data?.data || {};

	const [showCustomConfigForm, setShowCustomConfigForm] = useState(false);

	const [organizationDetails, setOrganizationDetails] = useState({});

	const [selectedCustomConfig, setSelectedCustomConfig] = useState({});

	const handleCloseConfigForm = () => {
		setShowCustomConfigForm(false);
		setSelectedCustomConfig({});
	};

	return (
		<div className={styles.container}>
			<h3>Custom Configuration</h3>

			<div className={styles.header}>
				<Tabs
					themeType="primary"
					activeTab={listType}
					onChange={(val) => {
						setListType(val);
					}}
				>
					{OPTIONS.map((item) => {
						const { label = '', value = '' } = item;
						return 	<TabPanel themeType="primary" key={value} name={value} title={label} />;
					})}
				</Tabs>

				{!showCustomConfigForm ? (
					<Button
						className="primary md"
						style={{ textTransform: 'capitalize', fontWeight: '600' }}
						onClick={() => {
							setShowCustomConfigForm(true);
							setOrganizationDetails({
								organization_type : organization_type || '',
								cogo_entity_id    : cogo_entity_id || '',
							});
						}}
					>
						+ Add New Custom Configuration
					</Button>
				) : null}
			</div>

			{showCustomConfigForm ? (
				<CustomConfigForm
					organizationDetails={organizationDetails}
					itemValue={selectedCustomConfig}
					listType={listType}
					onClosingForm={handleCloseConfigForm}
					defaultConfigFeeUnit={data?.data?.fee_currency}
					refetchGetHandlingFeeData={refetchGetHandlingFeeData}
					setSelectedCustomConfig={setSelectedCustomConfig}
				/>
			) : (
				<CustomHandlingFeesList
					data={data?.data}
					loading={loading}
					setShowCustomConfigForm={setShowCustomConfigForm}
					setOrganizationDetails={setOrganizationDetails}
					setSelectedCustomConfig={setSelectedCustomConfig}
				/>
			)}
		</div>
	);
}

export default CustomConfig;
