import { Toggle, Input, Select, Tabs, TabPanel } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	activeToggle = false,
	setActiveToggle = () => {},
	shipment_data = {},
	sourceOptions = [],
	filters = {},
	setFilters = () => {},
	setSearchValue = () => {},
	searchValue = '',
	activeWallet = '',
	setActiveWallet = () => {},
}) {
	const serviceOptions = shipment_data?.services?.map((service) => ({ label: startCase(service), value: service }));

	return (
		<div className={styles.heading}>
			<div className={styles.sub_heading}>
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
				) : (
					<div className={styles.sub_heading}>
						<Input
							value={searchValue || ''}
							size="sm"
							type="search"
							placeholder="Search..."
							suffix={<IcMSearchlight style={{ fontSize: '16px' }} />}
							style={{ padding: '6px', marginRight: '6px', width: '250px' }}
							onChange={(e) => setSearchValue(e)}
						/>

						<Select
							className={styles.select}
							size="sm"
							placeholder="Select Source"
							style={{ padding: '6px', marginRight: '6px', width: '200px' }}
							value={filters?.uploaded_by_org_id}
							options={sourceOptions || []}
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
				)}
			</div>

			<div className={styles.sub_heading}>
				<Toggle
					name="myTransilates"
					size="md"
					offLabel="Check List"
					onLabel="Wallet"
					value={activeToggle}
					className={styles.custom_toggle}
					onChange={() => setActiveToggle((prev) => !prev)}
				/>
			</div>

		</div>
	);
}

export default Header;
