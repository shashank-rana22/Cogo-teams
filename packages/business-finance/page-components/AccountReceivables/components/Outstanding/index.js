import { TabPanel, Tabs } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import OutStandingVisualization from './OutStandingVisualization';
import OverAllOutstanding from './OverAllOutstanding/index';
import styles from './styles.module.css';
import ViewOrganizationDetails from './ViewOrganizationDetails/index';

function Outstanding({
	entityCode = '',
	selectedOrgId = {},
	setSelectedOrgId = {},
}) {
	const [activeTab, setActiveTab] = useState('overall_outstanding');

	return (

		<div className={styles.container}>
			{!isEmpty(selectedOrgId)
				? (
					<ViewOrganizationDetails
						entityCode={entityCode}
						selectedOrgId={selectedOrgId}
						setSelectedOrgId={setSelectedOrgId}
					/>
				)
				: (
					<>
						<div className={styles.select}>
							<ScopeSelect size="md" />
						</div>
						<Tabs activeTab={activeTab} onChange={setActiveTab} themeType="primary">
							<TabPanel
								size={12}
								name="overall_outstanding"
								title="Overall Outstanding"
							>
								<div>
									<OverAllOutstanding
										entityCode={entityCode}
										selectedOrgId={selectedOrgId}
										setSelectedOrgId={setSelectedOrgId}
									/>
								</div>
							</TabPanel>
							<TabPanel
								size={12}
								name="outstanding_visualization"
								title="Outstanding Visualization"
							>
								<OutStandingVisualization entityCode={entityCode} />
							</TabPanel>
						</Tabs>
					</>
				)}
		</div>
	);
}

export default Outstanding;
