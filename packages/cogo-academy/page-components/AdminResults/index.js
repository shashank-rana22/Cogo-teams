import { Button, TabPanel, Tabs } from '@cogoport/components';
import { IcMRefresh, IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import InfoBanner from './components/InfoBanner';
import Questions from './components/Questions';
import Students from './components/Students';
import TestResults from './components/TestResults';
import useGetTest from './hooks/useGetTest';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	tests: {
		key       : 'students',
		title     : 'Students',
		component : Students,
	},
	question_set: {
		key       : 'questions',
		title     : 'Questions',
		component : Questions,
	},
};

function AdminResults() {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));

	const { push } = useRouter();

	const [activeTab, setActiveTab] = useState('students');

	const [activeAttempt, setActiveAttempt] = useState('attempt_1');

	const { test_id = '' } = query || {};

	const {
		loading,
		data,
		getTest,
		retest,
	} = useGetTest({ id: test_id });

	const { status, validity_end } = data || {};

	const COMPONENT_PROPS_MAPPING = {
		students  : { test_id, status, activeAttempt },
		questions : { test_id, activeAttempt },
	};

	const handleGoBack = () => {
		push('/learning?activeTab=test_module', '/learning?activeTab=test_module');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div role="presentation" onClick={handleGoBack} className={styles.go_back}>
					<IcMArrowBack />

					<p className={styles.go_back_text}>Test Result</p>
				</div>
				{ }
				{data?.status === 'publishing' && (
					<Button themeType="accent" onClick={() => getTest({ test_id })} disabled={loading}>
						Refresh

						<IcMRefresh style={{ marginLeft: 6 }} />
					</Button>
				)}
			</div>

			{retest ? (
				<Tabs
					themeType="primary"
					className={styles.tab}
					activeTab={activeAttempt}
					onChange={setActiveAttempt}
				>
					<TabPanel name="attempt_1" title="Attempt 1" />

					<TabPanel name="retest" title="Retest" />
				</Tabs>
			) : null}

			{status === 'published' || activeAttempt === 'attempt_1' ? <TestResults test_id={test_id} /> : null}

			<InfoBanner
				loading={loading}
				test_status={status}
				test_id={test_id}
				validity_end={validity_end}
				refetchTest={getTest}
				retest={retest}
				activeAttempt={activeAttempt}
			/>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
					className={styles.tabs}
				>
					{Object.values(COMPONENT_MAPPING).map((tab) => {
						const { key, title, component : ContainerComponent = null } = tab;

						const componentProps = COMPONENT_PROPS_MAPPING[key];

						if (!ContainerComponent) return null;

						return (
							<TabPanel
								key={key}
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

export default AdminResults;
