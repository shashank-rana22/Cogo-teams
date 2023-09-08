import { Tabs, TabPanel, Button } from '@cogoport/components';
import { useState } from 'react';

import CustomConfigForm from './CustomConfigForm';
import CustomConvenienceList from './CustomConvenienceList';
import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

function CustomConfig(
	{
		activeList = '', setActiveList = () => {}, data = {}, defaultConfigFeeUnit = '',
	},
) {
	const [showCustomConfigForm, setShowCustomConfigForm] = useState(false);
	const [organizationDetails, setOrganizationDetails] = useState({});

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div>
					<div className={styles.custom_heading}>Custom Configuration</div>
					{!showCustomConfigForm ? (
						<Tabs
							themeType="primary"
							activeTab={activeList}
							onChange={setActiveList}
						>
							{OPTIONS.map((item) => {
								const { label = '', value = '' } = item;
								return 	<TabPanel themeType="primary" key={value} name={value} title={label} />;
							})}
						</Tabs>
					) : null}
				</div>
				{!showCustomConfigForm ? (
					<Button
						className="primary md"
						style={{ textTransform: 'capitalize', fontWeight: '600' }}
						onClick={() => {
							setShowCustomConfigForm(true);
							setOrganizationDetails({
								organization_type : data?.organization_type || '',
								cogo_entity_id    : data?.cogo_entity_id || '',
							});
						}}
					>
						+ Add New
					</Button>
				) : null}
			</div>
			{showCustomConfigForm ? (
				<CustomConfigForm
					activeList={activeList}
					organizationDetails={organizationDetails}
					itemValue={showCustomConfigForm}
					onClosingForm={() => setShowCustomConfigForm(false)}
					defaultConfigFeeUnit={defaultConfigFeeUnit}
				/>
			) : (
				<CustomConvenienceList
					activeList={activeList}
					setShowCustomConfigForm={setShowCustomConfigForm}
					setOrganizationDetails={setOrganizationDetails}
				/>
			)}
		</div>
	);
}
export default CustomConfig;
