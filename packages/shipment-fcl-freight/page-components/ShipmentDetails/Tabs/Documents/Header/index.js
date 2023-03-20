import { Toggle, Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	activeToggle,
	setActiveToggle,
	// shipmentDocumentsHookSetters,
	// shipmentFilters,
	shipment_data,
	data = {},
	filters = {},
	setFilters = () => {},
}) {
	const SourceOptions = Array.isArray(data)
		? (data || [])?.map((e) => ({ label: e?.business_name, value: e?.id }))
		: [];

	const serviceOptions = shipment_data?.services?.map((service) => ({ label: startCase(service), value: service }));

	return (
		<div className={styles.heading}>
			<div className={styles.sub_heading}>
				{!activeToggle ? (
					<div className={styles.sub_heading}>
						<Input
							value={filters?.q || ''}
							size="sm"
							placeholder="Search..."
							suffix={<IcMSearchlight style={{ fontSize: '16px' }} />}
							style={{ padding: '6px', marginRight: '6px', width: '250px' }}
							onChange={(e) => setFilters({ ...filters, q: e })}
						/>
						<Select
							className={styles.select}
							size="sm"
							placeholder="Select Source"
							style={{ padding: '6px', marginRight: '6px', width: '200px' }}
							value={filters?.source}
							options={SourceOptions || []}
							onChange={(e) => setFilters({ ...filters, source: e })}
							isClearable
						/>
						<Select
							size="sm"
							placeholder="Select Service"
							style={{ padding: '6px', marginRight: '6px', width: '200px' }}
							value={filters?.service}
							onChange={(e) => setFilters({ ...filters, service: e })}
							options={serviceOptions || {}}
							isClearable
						/>

						{/* <div style={{ marginTop: '10px' }}>
							<Select
								placeholder="Select Date"
								options={dates.map((item) => ({ label: item, value: item }))}
								onChange={(item) => onDateChange(item)}
								value={value.dates_of_month}
								{...rest}
							/>
						</div> */}
					</div>
				) : null}
			</div>

			<Toggle
				name="myTransilates"
				size="md"
				offLabel="Check List"
				onLabel="Wallet"
				value={activeToggle}
				onChange={() => setActiveToggle(!activeToggle)}
			/>
			{/* <div className={styles.line} style={{ width: '100%' }} /> */}
		</div>
	);
}

export default Header;
