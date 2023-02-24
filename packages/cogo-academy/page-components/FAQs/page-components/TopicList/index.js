import { Card, Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React, useState } from 'react';

import useListFaqTopic from '../../hooks/useListFaqTopic';
import QuestionsList from '../QuestionsList';
import SearchFound from '../SearchFound';

import styles from './styles.module.css';

function TopicList({ tabTitle, searchState = '' }) {
	const {
		refetchTopic = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTopic();

	return (
		<div>
			{!searchState
				? (
					<div className={styles.grid_container} style={{ display: 'flex' }}>
						<div
							style={{
								margin : '5px 0',
								width  : '100%',
								height : '490px',
								flex   : 1,
							}}
							className={styles.scrollable}
						>
							<Tabs
								activeTab={activeTab}
								themeType="primary-vertical"
								onChange={setActiveTab}
							>
								{(data?.list || []).map((singleOption) => (
									<TabPanel
										name={singleOption?.name}
										title={(
											<div>
												<div className={styles.title}>
													{startCase(singleOption?.name)}
													:
												</div>

												<div className={styles.subtitle}>
													{startCase(singleOption.description)}
												</div>
											</div>
										)}
									/>
								))}
							</Tabs>
						</div>

						<div style={{ flex: 3.5 }}>
							{activeTab
								? (
									<QuestionsList
										tabTitle={activeTab}
										searchState={searchState}
									/>
								)
								: (
									<QuestionsList
										tabTitle={tabTitle}
										searchState={searchState}
									/>
								)}

						</div>
					</div>
				) : <SearchFound searchState={searchState} />}
		</div>
	);
}

export default TopicList;
