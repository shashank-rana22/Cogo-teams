import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

// eslint-disable-next-line import/no-named-as-default
import ListComponent from './components/ListComponent';
import styles from './styles.module.css';
// import useGetListServiceBundles from './useGetListServiceBundles';

function TestsList() {
	const [activeTab, setActiveTab] = useState('tests');

	// const { data, loading, fetchList, setParams } = useGetListServiceBundles({ activeTab });

	const componentMapping = {
		tests: {
			key       : 'tests',
			title     : 'Tests',
			component : ListComponent,
			// componentProps : {
			// 	data,
			// 	loading,
			// 	fetchList,
			// 	setParams,

			// },
		},
		draft: {
			key       : 'question_set',
			title     : 'Question Set',
			component : ListComponent,
			// componentProps : {
			// 	data,
			// 	loading,
			// 	fetchList,
			// 	setParams,
			// },
		},
		inactive: {
			key       : 'all_questions',
			title     : 'All Questions',
			component : ListComponent,
			// componentProps : {
			// 	data,
			// 	loading,
			// 	fetchList,
			// 	setParams,
			// },
		},
	};

	return (
		<div className={styles.container}>
			{/* <div className={styles.heading}>Service Bundles</div> */}
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
					className={styles.tabs}

				>
					{Object.values(componentMapping).map((tab) => {
						const { key, title, component:ContainerComponent = null } = tab;

						if (!componentMapping) return null;

						return (
							<TabPanel
								name={key}
								title={title}
								className={styles.tabItem}
							>
								<ContainerComponent />
							</TabPanel>
						);
					})}
				</Tabs>

			</div>
		</div>
	);
}

export default TestsList;
