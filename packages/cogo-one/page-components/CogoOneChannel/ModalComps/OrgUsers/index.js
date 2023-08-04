import { Modal, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import LeadOrganizations from './LeadOrganizations';
import Organizations from './Organizations';
import styles from './styles.module.css';

const TABS_MAPPING = [
	{ name: 'organization', title: 'Organizations' },
	{ name: 'lead_organization', title: 'Lead Organizations' },
];

const TABS_COMPONENT_MAPPING = {
	organization      : Organizations,
	lead_organization : LeadOrganizations,
};

function OrgUsers({
	openKamContacts = false,
	setOpenKamContacts = () => {},
	setActiveTab = () => {},
}) {
	const [activeOrg, setActiveOrg] = useState('organization');

	const Component = TABS_COMPONENT_MAPPING[activeOrg];

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
				title="Contacts"
			/>
			<Modal.Body className={styles.body_styles}>
				<Tabs
					activeTab={activeOrg}
					themeType="tertiary"
					onChange={setActiveOrg}
				>
					{(TABS_MAPPING || []).map((item) => {
						const { name = '', title = '' } = item || {};

						return (
							<TabPanel key={name} name={name} title={title} />
						);
					})}
				</Tabs>
				<Component
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
