import { Modal, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Organizations from './Organizations';
import styles from './styles.module.css';

const TABS = [
	{ name: 'organization', title: 'Organizations' },
	{ name: 'lead_organization', title: 'Lead Organizations' },
];

function OrgUsers({
	openKamContacts = false,
	setOpenKamContacts = () => {},
	setActiveTab = () => {},
}) {
	const [activeOrg, setActiveOrg] = useState('organization');

	return (
		<Modal
			show={openKamContacts}
			onClose={() => setOpenKamContacts(false)}
			placement="center"
			scroll={false}
			className={styles.styled_modal}
		>
			<Modal.Header
				className={styles.header_styles}
				title="Organizaton Users"
			/>
			<Modal.Body className={styles.body_styles}>
				<Tabs
					activeTab={activeOrg}
					themeType="tertiary"
					onChange={setActiveOrg}
				>
					{(TABS || []).map((item) => (
						<TabPanel key={item?.name} name={item?.name} title={item?.title} />
					))}
				</Tabs>
				<Organizations
					setActiveTab={setActiveTab}
					setOpenKamContacts={setOpenKamContacts}
					activeOrg={activeOrg}
					key={activeOrg}
				/>
			</Modal.Body>
		</Modal>
	);
}
export default OrgUsers;
