import { Button, Tabs, TabPanel, Input, ButtonIcon } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetTestList from '../../hooks/useGetTestList';
import useGetTestQuestionSets from '../../hooks/useGetTestQuestionSets';

import FilterPopover from './components/FilterPopover';
import ListComponent from './components/ListComponent';
import styles from './styles.module.css';

const BUTTON_TEXT_MAPPING = {
	tests        : 'Test',
	question_set : 'Question Set',

};

const ROUTE_MAPPING = {
	tests        : 'create-test',
	question_set : 'question?mode=new',
};

function TestsList({ activeTab, setActiveTab }) {
	const router = useRouter();

	const [filters, setFilters] = useState({});

	const {
		data, loading, fetchList, setParams, params, debounceQuery, input, setInput,
	} = useGetTestList({ filters, activeTab });

	const {
		data: questionData,
		loading: questionListLoading,
		fetchList: questionListRefetch,
		setParams: setQuestionListParams,
		params: questionListParams,
		debounceQuery: questionListDebounceQuery,
		input: questionListInput,
		setInput: setquestionListInput,
	} = useGetTestQuestionSets({ filters, activeTab });

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
	};

	const handleChangeTab = (val) => {
		router.push(`/learning?activeTab=test_module&testModuleTab=${val}`);

		componentMapping[val].componentProps.fetchList();
		setActiveTab(val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<div className={styles.filter}>
					<Input
						size="md"
						suffix={(
							<ButtonIcon
								size="md"
								icon={<IcMSearchlight />}
								disabled={false}
								themeType="primary"
							/>
						)}
						value={activeTab === 'tests' ? input : questionListInput}
						placeholder={
								activeTab === 'tests'
									? 'Search for Test/Topic'
									: 'Search for Question set name'
											}
						onChange={(value) => {
							if (activeTab === 'tests') {
								setInput(value);
								debounceQuery(value);
							} else {
								setquestionListInput(value);
								questionListDebounceQuery(value);
							}
						}}
						className={styles.input}
					/>

					<div className={styles.filter_popover}>
						<FilterPopover
							filters={filters}
							setFilters={setFilters}
							activeTab={activeTab}
						/>
					</div>

					<Button
						themeType="accent"
						type="button"
						onClick={() => router.push(`/learning/test-module/${ROUTE_MAPPING[activeTab]}`)}
					>
						+ Create New
						{' '}
						{BUTTON_TEXT_MAPPING[activeTab]}
					</Button>
				</div>

				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={handleChangeTab}
					className={styles.tabs}
				>
					{Object.values(componentMapping).map((tab) => {
						const { key, title, component:ContainerComponent = null, componentProps } = tab;

						return (
							<TabPanel
								key={key}
								name={key}
								title={title}
								className={styles.tabItem}
							>
								<div>
									<ContainerComponent {...componentProps} />
								</div>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

		</div>
	);
}

export default TestsList;
