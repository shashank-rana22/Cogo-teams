import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';

import useListFaqStats from '../hooks/useListFaqStats';

import Questions from './Questions';
import Users from './Users';

function Tabbase() {
	const [activeTab, setActiveTab] = useState('By_Questions');
	const props = useListFaqStats({});

	return (
		<div style={{ margin: 20, marginTop: -2 }}>
			<Tabs
				tabIcon={<IcMProfile />}
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel
					name="By_Questions"
					title="By Questions"
					badge={(
						<>
							Total:
							{' '}
							{props?.data?.question_stats?.no_of_questions}
						</>
					)}
				>
					<Questions props={props} />
				</TabPanel>

				<TabPanel name="By_Users" title="By Users" badge="Total 400">
					<Users />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tabbase;
