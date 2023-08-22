import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

const TAB_PANELS_MAPPING = {
	cargo_gross: {
		label: 'By Shipment Total',
	},
	cargo_per_package: {
		label: 'By Packing Type',
	},
};

function Header({
	activeTab = '',
	setActiveTab = () => {},
	reset = () => {},
}) {
	const onChange = (val) => {
		setActiveTab(val);
		reset();
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Cargo Details</div>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={onChange}
				>
					{Object.entries(TAB_PANELS_MAPPING).map(([key, value]) => {
						const { label = '' } = value;

						return (
							<TabPanel key={key} name={key} title={label} />
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}

export default Header;
