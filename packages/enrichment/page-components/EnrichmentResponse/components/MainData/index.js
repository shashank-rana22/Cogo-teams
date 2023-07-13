import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import useEnrichmentResponse from '../../hooks/useEnrichmentResponse';
import TAB_OPTION_MAPPING from '../../utils/tab_options_mapping';

function MainData() {
	const [activeTab, setActiveTab] = useState('user');

	const options = Object.values(TAB_OPTION_MAPPING);

	const {
		data = [],
		refetchResponses = () => {},
		loadingResponses = false,
	} = useEnrichmentResponse({ activeTab });

	return (
		<div>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				themeType="primary"
			>
				{(options || []).map((option) => {
					const { key = '', title = '', containerComponent: ContainerComponent = null } = option;

					if (!ContainerComponent) return null;

					return (
						<TabPanel
							name={key}
							key={key}
							title={title}
						>
							<ContainerComponent
								data={data}
								refetchResponses={refetchResponses}
								loadingResponses={loadingResponses}
							/>
						</TabPanel>
					);
				})}

			</Tabs>
		</div>
	);
}

export default MainData;
