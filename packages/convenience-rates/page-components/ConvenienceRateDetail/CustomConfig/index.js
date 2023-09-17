import { Tabs, TabPanel, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetConvenienceRateConfig from '../../../hooks/useGetConvenienceRateConfig';

import CustomConfigForm from './CustomConfigForm';
import CustomConvenienceList from './CustomConvenienceList';
import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

function CustomConfig({
	defaultConfigFeeUnit = '',
}) {
	const router = useRouter();
	const { convenience_rate_id = '' } = router?.query || {};

	const [showCustomConfigForm, setShowCustomConfigForm] = useState(false);
	const [organizationDetails, setOrganizationDetails] = useState({});
	const [activeList, setActiveList] = useState('active');

	const defaultParams = { id: convenience_rate_id, status: activeList };
	const { data, loading } = useGetConvenienceRateConfig({
		defaultParams,
		initialCall: convenience_rate_id && activeList,
	});
	return (
		<div>
			<div className={styles.custom_heading}>Custom Configuration</div>
			<div className={styles.orgs_container}>
				<div>
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
					organizationDetails={organizationDetails}
					itemValue={showCustomConfigForm}
					activeList={activeList}
					onClosingForm={() => setShowCustomConfigForm(false)}
					defaultConfigFeeUnit={defaultConfigFeeUnit}
				/>
			) : (
				<CustomConvenienceList
					data={data}
					loading={loading}
					setShowCustomConfigForm={setShowCustomConfigForm}
					setOrganizationDetails={setOrganizationDetails}
				/>
			)}
		</div>
	);
}
export default CustomConfig;
