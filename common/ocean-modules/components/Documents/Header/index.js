import { Toggle, Input, Select, Tabs, TabPanel } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	activeToggle = false,
	setActiveToggle = () => {},
	shipment_data = {},
	data = {},
	filters = {},
	setFilters = () => {},
	activeWallet = '',
	setActiveWallet = () => {},
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
							type="search"
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
							value={filters?.uploaded_by_org_id}
							options={SourceOptions || []}
							onChange={(e) => setFilters({ ...filters, uploaded_by_org_id: e })}
							isClearable
						/>
						<Select
							className={styles.select}
							size="sm"
							placeholder="Select Service"
							style={{ padding: '6px', marginRight: '6px', width: '200px' }}
							value={filters?.service_type}
							onChange={(e) => setFilters({ ...filters, service_type: e })}
							options={serviceOptions || {}}
							isClearable
						/>

					</div>
				) : null}
				{activeToggle ? (
					<Tabs
						activeTab={activeWallet}
						onChange={setActiveWallet}
						className={styles.tabs}
						themeType="primary"
					>
						<TabPanel name="trade_documents" title="Trade Documents" />

						<TabPanel name="organization_documents" title="Organization Documents" />
					</Tabs>
				) : null}
			</div>

			<Toggle
				name="myTransilates"
				size="md"
				offLabel="Check List"
				onLabel="Wallet"
				value={activeToggle}
				className={styles.custom_toggle}
				onChange={() => setActiveToggle((p) => !p)}
			/>
		</div>
	);
}

export default Header;
