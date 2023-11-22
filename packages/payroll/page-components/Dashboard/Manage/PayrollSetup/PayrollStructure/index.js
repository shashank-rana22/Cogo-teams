import { Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import PayrollSettings from './PayrollSettings';
import PayStructureListing from './PayStructureListing';
import styles from './styles.module.css';

function PayrollStructure({ setShow = () => {}, data = {} }) {
	const [activeTab, setActiveTab] = useState('pay_structure');

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>

				<div className={styles.header}>
					<div
						className={styles.arrow_back}
						aria-hidden
						onClick={() => { setShow(false); }}
					>
						<IcMArrowBack width={20} height={20} />
					</div>
					<div className={styles.heading}>
						<div className={styles.upper_heading}>PAYROLL STRUCTURE</div>
						<div className={styles.lower_heading}>
							Manage payroll settings
						</div>
					</div>
				</div>

				<div className={styles.tab_container}>
					<Tabs
						themeType="primary-vertical"
						activeTab={activeTab}
						onChange={setActiveTab}
					>
						<TabPanel name="pay_structure" title="Pay Structure" />
					</Tabs>

					{activeTab === 'payroll_settings' ? <PayrollSettings /> : null}
					{activeTab === 'pay_structure' ? <PayStructureListing data={data} /> : null}
				</div>

			</div>
		</div>
	);
}

export default PayrollStructure;
