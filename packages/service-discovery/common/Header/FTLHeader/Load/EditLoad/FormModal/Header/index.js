import { Tabs, TabPanel } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useRef, useEffect } from 'react';

import styles from './styles.module.css';

const TAB_PANELS_MAPPING = {
	truck: {
		label: 'By Trucks',
	},
	cargo: {
		label: 'By Cargo',
	},
};

function Header({
	activeTab = '',
	setActiveTab = () => {},
	onClose = () => {},
	isMobile = false,
}) {
	const headerRef = useRef(null);

	const onChange = (val) => {
		setActiveTab(val);
	};

	const scrollToTop = () => {
		headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
	};

	useEffect(() => {
		scrollToTop();
	}, [activeTab]);

	return (
		<div ref={headerRef} className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>Load Details</div>

				{isMobile ? (
					<IcMCross onClick={onClose} />
				) : null}
			</div>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={onChange}
				>
					{Object.entries(TAB_PANELS_MAPPING).map(([key, obj]) => {
						const { label = '' } = obj;

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
