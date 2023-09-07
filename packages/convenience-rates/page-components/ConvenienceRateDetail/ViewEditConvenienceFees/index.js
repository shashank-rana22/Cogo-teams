import { TabPanel, Tabs, Button, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import GlobalConfigForm from '../../../common/GlobalConfigForm';
import useListConvenienceRateConfigurations from '../../../hooks/useListConvenienceRateConfigurations';

import CustomConfigForm from './CustomConfigForm';
import CustomConvenienceList from './CustomConvenienceList';
import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

function ViewEditConvenienceFees() {
	const router = useRouter();
	const { service = '' } = router?.query || {};

	const [showCustomConfigForm, setShowCustomConfigForm] = useState(false);
	const [activeList, setActiveList] = useState('active');
	const [organizationDetails, setOrganizationDetails] = useState({});
	const [defaultConfigFeeUnit, setDefaultConfigFeeUnit] = useState('');

	const defaultFilters = { activeList, service };
	const { data, loading } = useListConvenienceRateConfigurations({
		defaultFilters,
	});
	if (loading) {
		return (
			<div className={styles.spinner}>
				<Loader
					themeType="primary"
				/>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<Button
				className={styles.backDiv}
				themeType="link"
				onClick={() => {
					router.push(
						'/convenience-rates',
						'/convenience-rates',
					);
				}}
				// style={{ cursor: 'pointer', display: 'flex' }}

			>
				<div className={styles.arrowBack}>
					<IcMArrowBack />
				</div>
				<div className={styles.backText}>
					Back to All Convenience Fees
				</div>
			</Button>
			<div className={styles.heading}>
				Fee Details
			</div>
			<GlobalConfigForm
				service={service}
				data={data?.list[GLOBAL_CONSTANTS.zeroth_index]}
				setDefaultConfigFeeUnit={setDefaultConfigFeeUnit}
			/>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div>
					<div className={styles.customHeading}>Custom Configuration</div>
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
								organization_type : data?.list[GLOBAL_CONSTANTS.zeroth_index]?.organization_type || '',
								cogo_entity_id    : data?.list[GLOBAL_CONSTANTS.zeroth_index]?.cogo_entity_id || '',
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
					service={service}
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
export default ViewEditConvenienceFees;
