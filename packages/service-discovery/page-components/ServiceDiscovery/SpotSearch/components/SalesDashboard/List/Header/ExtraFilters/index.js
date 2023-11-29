import { Select } from '@cogoport/components';

import styles from './styles.module.css';

const SERVICES = [
	{ label: 'Fcl Freight', value: 'fcl_freight' },
	{ label: 'Ftl Freight', value: 'ftl_freight' },
	{ label: 'Trailer Freight', value: 'trailer_freight' },
	{ label: 'Haulage Freight', value: 'haulage_freight' },
	{ label: 'Fcl customs', value: 'fcl_customs' },
	{ label: 'Air freight', value: 'air_freight' },
	{ label: 'Air Customs', value: 'air_customs' },
	{ label: 'Lcl freight', value: 'lcl_freight' },
	{ label: 'Ltl freight', value: 'ltl_freight' },
	{ label: 'Lcl customs', value: 'lcl_customs' },
	{ label: 'Fcl Cfs', value: 'fcl_cfs' },
	{ label: 'Fcl freight local', value: 'fcl_freight_local' },
	{ label: 'Lcl local', value: 'lcl_freight_local' },
	{ label: 'Air local', value: 'air_freight_local' },
];

function ExtraFilters({
	serviceType = '',
	setFilters = () => {},
	setServiceType = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.service_select}>
				<Select
					placeholder="Select Service"
					style={{ marginRight: 8 }}
					size="sm"
					value={serviceType}
					onChange={(val) => {
						setServiceType(val);
						setFilters((previousFilters) => ({ ...previousFilters, page: 1 }));
					}}
					options={SERVICES}
					isClearable
				/>
			</div>
		</div>
	);
}

export default ExtraFilters;
