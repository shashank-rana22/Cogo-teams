import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import useGetTestList from '../../hooks/useGetTestList';
import useGetTestQuestionSets from '../../hooks/useGetTestQuestionSets';

import ListComponent from './components/ListComponent';
import styles from './styles.module.css';

function TestsList() {
	const [activeTab, setActiveTab] = useState('tests');

	const { data, loading, fetchList, setParams, params } = useGetTestList();

	const {
		data: questionData,
		loading:questionListLoading,
		fetchList: questionListRefetch,
		setParams: setQuestionListParams,
		params: questionListParams,
	} = useGetTestQuestionSets();

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
				activeTab,
				params,

			},
		},
		question_set: {
			key            : 'question_set',
			title          : 'Question Set',
			component      : ListComponent,
			componentProps : {
				data      : questionData,
				loading   : questionListLoading,
				fetchList : questionListRefetch,
				setParams : setQuestionListParams,
				activeTab,
				params    : questionListParams,
			},
		},
		all_questions: {
			key            : 'all_questions',
			title          : 'All Questions',
			component      : ListComponent,
			componentProps : {
				data,
				loading,
				fetchList,
				setParams,
				activeTab,
				params,
			},
		},
	};

	const handleChangeTab = (val) => {
		componentMapping[val].componentProps.fetchList();

		setActiveTab(val);
	};

	return (
		<div className={styles.container}>
			{/* <div className={styles.heading}>Service Bundles</div> */}
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={handleChangeTab}
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
