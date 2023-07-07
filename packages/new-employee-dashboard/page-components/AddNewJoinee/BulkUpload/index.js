import { TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import BulkUploadContent from './BulkUploadContent';
import styles from './styles.module.css';
import useBulkUpload from './useBulkUpload';

const TABS_MAPPING = ['create', 'update'];

function BulkUpload({ setBulkUploadComponent = () => {} }) {
	const props = useBulkUpload();

	const { setActiveTab, activeTab } = props || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					width={20}
					height={20}
					style={{ cursor: 'pointer' }}
					onClick={() => setBulkUploadComponent(false)}
				/>

				<div style={{ marginLeft: 4 }}>Back to New Hire List</div>
			</div>

			<div className={styles.title}>Upload New Hire In Bulk</div>

			<div className={styles.tabs_wrapper}>
				<Tabs
					themeType="primary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{TABS_MAPPING.map((element) => (
						<TabPanel key={element} name={element} title={startCase(element)}>
							<BulkUploadContent
								{...props}
								setBulkUploadComponent={setBulkUploadComponent}
								source={element}
							/>
						</TabPanel>
					))}

				</Tabs>
			</div>

		</div>
	);
}

export default BulkUpload;
