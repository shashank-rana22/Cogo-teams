import { Tabs, TabPanel, Input, ButtonIcon } from '@cogoport/components';
import { IcMArrowRotateUp, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetTestList from '../../hooks/useGetTestList';
import useGetTestQuestionSets from '../../hooks/useGetTestQuestionSets';

import ListComponent from './components/ListComponent';
import styles from './styles.module.css';

function TestsList({ activeTab, setActiveTab }) {
	const [sort, setSort] = useState(false);
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
		// all_questions: {
		// 	key            : 'all_questions',
		// 	title          : 'All Questions',
		// 	component      : ListComponent,
		// 	componentProps : {
		// 		data,
		// 		loading,
		// 		fetchList,
		// 		setParams,
		// 		activeTab,
		// 		params,
		// 	},
		// },
	};

	const handleChangeTab = (val) => {
		componentMapping[val].componentProps.fetchList();

		setActiveTab(val);
	};

	return (
		<div className={styles.container}>
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

						const { data: activeComponentData, loading: activeComponentLoading } = componentProps || {};

						return (
							<TabPanel
								name={key}
								title={title}
								className={styles.tabItem}
							>
								{!isEmpty(activeComponentData?.list) && !activeComponentLoading ? (
									<div className={styles.filter}>
										<div>
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
												placeholder={
												activeTab === 'tests'
													? 'Search for Test/Topic'
													: 'Search for Question set name'
											}
												onChange={(value) => {
													if (activeTab === 'tests') {
														setParams((prev) => ({
															...prev,
															filters: {
																...prev.filters,
																q: value,
															},
														}));
													} else {
														setQuestionListParams((prev) => ({
															...prev,
															filters: {
																...prev.filters,
																q: value,
															},
														}));
													}
												}}
												className={styles.input}
											/>
										</div>

										<div
											role="presentation"
											onClick={() => {
												setSort((prev) => !prev);
												if (activeTab === 'tests') {
													setParams((prev) => ({
														...prev,
														sort_type : sort ? 'asc' : 'desc',
														filters   : {
															...prev.filters,

														},
													}));
												} else {
													setQuestionListParams((prev) => ({
														...prev,
														sort_type : sort ? 'asc' : 'desc',
														filters   : {
															...prev.filters,

														},
													}));
												}
											}}
											className={styles.sort}
										>
											{sort ? (
												<IcMArrowRotateUp
													width={16}
													height={16}
													fill="#393f70"
													// eslint-disable-next-line max-len
													style={{ marginRight: 4, transition: 'transform 0.5s', cursor: 'pointer', transform: 'rotate(180deg)' }}
												/>
											) : (
												<IcMArrowRotateUp
													width={16}
													height={16}
													fill="#393f70"
													style={{
														marginRight : 4,
														cursor      : 'pointer',
														transition  : 'transform 0.5s',
													}}
												/>
											)}

											<span
												className={styles.span_text}
											>
												Sort By
											</span>
										</div>
									</div>
								) : null}

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
