import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import CogoPoints from './Cogopoints';

function Index() {
	const { query } = useRouter();
	console.log('>>>>>> ~ query :', query);
	const [activeTab, setActiveTab] = useState('cogopoint');
	// const partnerId = useSelector((s) => s?.profile?.partner?.id);

	// const handleTabChange = (tab) => {
	// 	if (tab === 'promotion') {
	// 		window.location.href = `/${partnerId}/liability-dashboard/${tab}`;
	// 	}
	// };

	return (
		<Tabs
			activeTab={activeTab}
			themeType="primary"
			onChange={setActiveTab}
			// onChange={(tab) => { handleTabChange(tab); }}
		>
			<TabPanel name="promotion" title="Promotions" />

			<TabPanel name="cogopoint" title="Cogopoints">
				<CogoPoints />
			</TabPanel>
		</Tabs>

	);
}

export default Index;
