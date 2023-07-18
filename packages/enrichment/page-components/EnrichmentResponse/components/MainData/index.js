import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import TAB_OPTION_MAPPING from '../../configurations/tab_options_mapping';
import useEnrichmentResponse from '../../hooks/useEnrichmentResponse';

import ContainerComponent from './ContainerComponent';

function MainData() {
	const [activeTab, setActiveTab] = useState('user');

	const options = Object.values(TAB_OPTION_MAPPING);

	const {
		list = [],
		refetchResponses = () => {},
		loadingResponses = false,
		actionType = '',
		getNextPage = () => {},
		paginationData = {},
	} = useEnrichmentResponse({ activeTab });

	return (
		<div>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				themeType="primary"
			>
				{(options || []).map((option) => {
					const { key = '', title = '', icon: Icon } = option;

					return (
						<TabPanel
							name={key}
							icon={<Icon />}
							key={key}
							title={title}
						>
							<ContainerComponent
								list={list}
								actionType={actionType}
								refetchResponses={refetchResponses}
								loadingResponses={loadingResponses}
								activeTab={activeTab}
								paginationData={paginationData}
								getNextPage={getNextPage}
							/>
						</TabPanel>
					);
				})}

			</Tabs>
		</div>
	);
}

export default MainData;
