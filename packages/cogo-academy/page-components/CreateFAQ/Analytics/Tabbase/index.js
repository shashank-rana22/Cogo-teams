import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';

import useListFaqStats from '../hooks/useListFaqStats';

import Questions from './Questions';
import Users from './Users';

function Tabbase() {
	const [activeTab, setActiveTab] = useState('By_Questions');
	const [date, setDate] = useState('');
	const props = useListFaqStats({ date, setDate });

	return (
		<div>
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
					<Questions props={props} date={date} setDate={setDate} />
				</TabPanel>

				<TabPanel
					name="By_Users"
					title="By Users"
					badge={(
						<>
							Total:
							{' '}
							{props?.data?.question_stats?.no_of_questions}
						</>
					)}
				>
					<Users props={props} date={date} setDate={setDate} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tabbase;
