import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

// eslint-disable-next-line import/no-named-as-default
import useGetTestList from '../../hooks/useGetTestList';

import ListComponent from './components/ListComponent';
import styles from './styles.module.css';

function TestsList(props) {
	const { activeTab, setActiveTab } = props;

	const { data, loading, fetchList, setParams } = useGetTestList();

	const componentMapping = {
		tests: {
			key            : 'tests',
			title          : 'Tests',
			component      : ListComponent,
			componentProps : {
				data,
				loading,
				fetchList,
				setParams,

			},
		},
		draft: {
			key            : 'question_set',
			title          : 'Question Set',
			component      : ListComponent,
			componentProps : {
				data,
				loading,
				fetchList,
				setParams,
			},
		},
		inactive: {
			key            : 'all_questions',
			title          : 'All Questions',
			component      : ListComponent,
			componentProps : {
				data,
				loading,
				fetchList,
				setParams,
			},
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
						const { key, title, component:ContainerComponent = null, componentProps } = tab;

						if (!componentMapping) return null;

						return (
							<TabPanel
								name={key}
								title={title}
								className={styles.tabItem}
							>
								<ContainerComponent {...componentProps} />
							</TabPanel>
						);
					})}
				</Tabs>

			</div>
		</div>
	);
}

export default TestsList;
