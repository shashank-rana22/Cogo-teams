import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

const TAB_PANELS_MAPPING = {
	by_gross: {
		label: 'By Shipment Total',
	},
	by_package: {
		label: 'By Packing Type',
	},
};

function Header({
	activeTab = '',
	setActiveTab = () => {},
}) {
	return (
		<div className={styles.container}>
			<span className={styles.heading}>Cargo Details</span>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{Object.entries(TAB_PANELS_MAPPING).map(([key, value]) => {
						const { label = '' } = value;

						return (
							<TabPanel key={key} name={key} title={label}>
								<div>This is local search</div>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}

export default Header;
