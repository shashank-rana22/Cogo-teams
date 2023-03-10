import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React } from 'react';

import Questions from './Questions';
import Users from './Users';

function Tabbase() {
	return (

		<div style={{ margin: 20 }}>
			<Tabs
				tabIcon={<IcMProfile />}
				fullWidth
				themeType="primary"
			>
				<TabPanel name="ByQuestions" title="By Questions" badge="Total 200">
					<Questions />
				</TabPanel>

				<TabPanel name="ByUsers" title="By Users" badge="Total 400">
					<Users />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tabbase;
