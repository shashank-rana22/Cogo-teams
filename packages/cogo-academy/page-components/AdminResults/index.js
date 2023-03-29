import { TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import InfoBanner from './components/InfoBanner';
import Questions from './components/Questions';
import Students from './components/Students';
import TestResults from './components/TestResults';
import useGetTest from './hooks/useGetTest';
import styles from './styles.module.css';

function AdminResults() {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));

	const { push } = useRouter();

	const [activeTab, setActiveTab] = useState('students');

	const { test_id = '' } = query || {};

	const {
		loading,
		data,
		getTest,
	} = useGetTest({ id: test_id });

	const componentMapping = {
		tests: {
			key            : 'students',
			title          : 'Students',
			component      : Students,
			componentProps : { test_id },
		},
		question_set: {
			key            : 'questions',
			title          : 'Questions',
			component      : Questions,
			componentProps : { test_id },
		},
	};

	const handleGoBack = () => {
		push('/learning?activeTab=test_module', '/learning?activeTab=test_module');
	};

	const { status, validity_end } = data || {};

	return (
		<div className={styles.container}>
			<div role="presentation" onClick={handleGoBack} className={styles.go_back}>
				<IcMArrowBack />

				<p className={styles.go_back_text}>Dashboard</p>
			</div>

			<div><TestResults test_id={test_id} /></div>

			<InfoBanner
				loading={loading}
				test_status={status}
				test_id={test_id}
				validity_end={validity_end}
				refetchTest={getTest}
			/>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
					className={styles.tabs}
				>
					{Object.values(componentMapping).map((tab) => {
						const { key, title, component : ContainerComponent = null, componentProps } = tab;

						if (!componentMapping) return null;

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
