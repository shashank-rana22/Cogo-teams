import { Tabs, TabPanel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
// import { useEffect } from 'react';

import useListRfqs from '../../../hooks/useListrfqs';

import RfqDetails from './RfqDetails';
import styles from './styles.module.css';

function Content(props) {
	const { activeTab, setActiveTab } = props;

	const TAB_MAPPING = [
		{ name: 'approval', title: 'Approval' },
		{ name: 'all', title: 'All RFQ' },
	];

	const { getRfqsForApproval, data = {} } = useListRfqs();
	console.log('data::', data);

	// useEffect(() => {
	// 	getRfqsForApproval();
	// }, []);

	const { list = [] } = data;

	if (isEmpty(data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{TAB_MAPPING.map(({ name, title }) => (
					<TabPanel name={name} title={title}>
						<RfqDetails {...props} list={list} />
					</TabPanel>
				))}
			</Tabs>

		</div>
	);
}

export default Content;
