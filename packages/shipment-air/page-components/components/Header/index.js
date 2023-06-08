import { Tabs, TabPanel, Input } from '@cogoport/components';
import { IcMAppSearch, IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import serviceWiseTabMappings from '../../constants/service-tabs-mappings';
import shipmentStateMappings from '../../constants/shipment-state-mappings';

import styles from './styles.module.css';

const SEARCHPLACEHOLDERVALUE = 'Search via Customer/SID/Booking No';
function Header({ serviceActiveTab, setServiceActiveTab, shipmentStateTab, setShipmentStateTab }) {
	return (
		<div>
			<Tabs
				fullWidth
				themeType="primary"
				activeTab={serviceActiveTab}
				onChange={setServiceActiveTab}

			>
				{serviceWiseTabMappings.map((item) => {
					const { name = '', title = '' } = item;
					return (
						<TabPanel
							key={name}
							name={name}
							title={title}
						/>
					);
				})}
			</Tabs>
			<div className={styles.header_footer_part}>

				<Tabs
					themeType="tertiary"
					activeTab={shipmentStateTab}
					onChange={setShipmentStateTab}
				>
					{shipmentStateMappings.map((item) => {
						const { name = '', title = '' } = item;
						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							/>
						);
					})}
				</Tabs>
				<div className={styles.header_footer_part}>

					<Input
						size="sm"
						prefix={<IcMAppSearch />}
						placeholder={SEARCHPLACEHOLDERVALUE}
						style={{ marginRight: '8px', width: 300 }}
					/>
					<IcMFilter className={styles.filter_icon} />
				</div>

			</div>

		</div>
	);
}
export default Header;
