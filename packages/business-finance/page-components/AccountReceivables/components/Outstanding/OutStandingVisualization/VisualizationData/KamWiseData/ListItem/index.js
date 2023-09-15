import { Tabs, TabPanel, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useState } from 'react';

import useGetPartnerRmMapping from '../../../../../../hooks/useGetPartnerRmMapping';

import InvoiceTable from './InvoiceTable';
import PopoverTags from './PopoverTags';
import ServiceWiseOutstanding from './ServiceWiseOutstanding';
import StatsCard from './StatsCard';
import styles from './styles.module.css';

const TABS_OPTIONS = [
	{
		key       : 'invoice_details',
		name      : 'Invoice Details',
		component : InvoiceTable,
	},
	{
		key       : 'service_details',
		name      : 'Service Details',
		component : ServiceWiseOutstanding,
	},
];
const DEFAULT_AMOUNT = 0;
function ListItem({
	item = {},
	selectedBarData = {},
	filterValues = {},
	KamAndAgeingArr,
	barData = [],
	path = '',
	entityCode = '',
}) {
	const [activeTab, setActiveTab] = useState('');
	const { data, getPartnerMappingData, loading } = useGetPartnerRmMapping();
	const handleClick = (val) => {
		getPartnerMappingData(val);
	};

	const handleActiveTabs = (val) => {
		if (val === activeTab) {
			setActiveTab('');
		} else {
			setActiveTab(val);
		}
	};

	const {
		organization_id,
		business_name,
		legal_business_name,
		outstanding_amount,
		on_account_amount,
		currency,
	} = item || {};

	const { id } = selectedBarData || {};
	const { bifurcation_type } = filterValues || {};
	const { kamAgeingArr = {}, ageingArr } = KamAndAgeingArr || {};

	const barId = !Number.isNaN(Number(id)) ? [id] : ['301', '101'];

	const cogoEntityValue = entityCode ? [entityCode] : barId;

	const getAgeingBucket =		bifurcation_type === 'overall'
		? undefined
		: id || kamAgeingArr[item.kam_owner_id] || ageingArr;

	const propsData = {
		invoice_details: {
			registrationNumber : item.registration_number,
			cogoEntityValue,
			popoverLoading     : loading,
			partnersMapping    : data || [],
			ageingArr          : getAgeingBucket,
			handleClick,
			selectedBarData,
			filterValues,
			barData,
			path,
		},
		service_details: {
			registrationNumber : item.registration_number,
			ageingArr          : getAgeingBucket,
			cogo_entity_number : cogoEntityValue,
		},
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.card} ${organization_id ? styles.organization_card_padding
				: styles.card_padding}`}
			>
				<div className={styles.flex_wrap}>
					<div>
						<div className={styles.business_name}>
							{legal_business_name}
							{' '}
							<span className="os">
								( O/S :
								{' '}
								{formatAmount({
									amount  : outstanding_amount || DEFAULT_AMOUNT,
									currency,
									options : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
								{' '}
								)
							</span>
							<span className="p">
								( P :
								{' '}
								{formatAmount({
									amount  : on_account_amount || DEFAULT_AMOUNT,
									currency,
									options : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
								{' '}
								)
							</span>
							{' '}
						</div>
						<div className={styles.legal_business_name}>{business_name}</div>
					</div>
					<PopoverTags
						data={data}
						loading={loading}
						handleClick={handleClick}
						item={item}
					/>
				</div>
				<div className={styles.org_list}>
					<StatsCard item={item} activeBucket={getAgeingBucket} />
				</div>
				<div style={{ margin: '10px 0px 0px 16px' }}>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						fullWidth
						onChange={(val) => handleActiveTabs(val)}
						className={styles.custom_tabs}
					>
						{(TABS_OPTIONS || []).map(({ key, name, component: Component }) => (
							<TabPanel key={key} name={key} title={name}>
								{activeTab && <Component {...propsData[activeTab]} />}
							</TabPanel>
						))}
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default ListItem;
