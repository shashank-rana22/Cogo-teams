import { Accordion, Modal, TabPanel, Tabs, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import InvoiceTable from '../../../../commons/InvoiceTable/index.tsx';
import useGetPartnerRmMapping from '../../../../hooks/useGetPartnerRmMapping.ts';
import Communication from '../../OutstandingList/Communication/index.tsx';
import OrganizationUsers from '../../OutstandingList/OrganizationUsers/index.tsx';
import PopoverTags from '../../OutstandingList/PopoverTags/index.tsx';
import StatsOutstanding from '../../OutstandingList/StatsOutstanding';

import styles from './styles.module.css';

const DEFAULT_LENGTH = 1;

const TabsOptions = [
	{
		key       : 'invoice_details',
		name      : 'Invoice Details',
		component : InvoiceTable,
	},
	{
		key       : 'organization_users',
		name      : 'Users',
		component : OrganizationUsers,
	},
	{
		key       : 'communication',
		name      : 'Communication',
		component : Communication,
	},
];

function Content({ types = [], head = '' }) {
	return (
		<div className={styles.padding_container}>
			<div className={styles.heading}>{head}</div>
			<div className={styles.hr} />
			<div className={styles.width_container}>
				{types?.map((party) => (
					<div className={styles.style_margin_top} key={party}>
						<div className={styles.styled_tag}>{startCase(party)}</div>
					</div>
				))}
			</div>
		</div>
	);
}

function CallPriorityModal({ showCallPriority = false, setShowCallPriority = () => { }, data = {} }) {
	const [activeTab, setActiveTab] = useState('invoice_details');
	const { data: item, getPartnerMappingData, loading } = useGetPartnerRmMapping();
	const handleClick = (val) => {
		getPartnerMappingData(val);
	};
	const {
		businessName,
		collectionPartyType = [],
		selfOrganizationName,
		organizationId,
		entityCode,
		selfOrganizationId,
	} = data;

	const propsData = {
		invoice_details: {
			organizationId,
			entityCode,
			showName    : false,
			showFilters : false,
			limit       : 4,
		},
		organization_users: {
			selfOrganizationId,
		},
	};

	const handleActiveTabs = (val) => {
		if (val === activeTab) {
			setActiveTab('');
		} else {
			setActiveTab(val);
		}
	};

	return (
		<div className={styles.container}>
			<Modal
				placement="center"
				size="xl"
				show={showCallPriority}
				onClose={() => setShowCallPriority(false)}
				className={styles.modalcontainer}
			>
				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.sub_org_name_conatiner}>
							<div style={{ display: 'flex' }}>
								<div className={styles.styled_name}>
									{businessName}
								</div>
								{collectionPartyType.length > DEFAULT_LENGTH ? (
									<Tooltip
										content={(
											<Content
												types={collectionPartyType}
												head="Collection Party Types"
											/>
										)}
										placement="right"
									>
										<div className={styles.styled_tag}>
											{`${startCase(collectionPartyType[GLOBAL_CONSTANTS.zeroth_index])} 
											+${collectionPartyType.length - DEFAULT_LENGTH
												}` || '-'}
										</div>

									</Tooltip>
								) : (
									<div className={styles.styled_tag}>
										{startCase(collectionPartyType[GLOBAL_CONSTANTS.zeroth_index]) || '-'}
									</div>
								)}
							</div>

							{selfOrganizationName ? (
								<div className={styles.legal_business_name}>{selfOrganizationName}</div>
							) : null}

						</div>
						<div className={styles.popover_wrapper}>
							<PopoverTags
								item={data}
								data={item}
								loading={loading}
								handleClick={handleClick}
							/>
						</div>
					</div>
					<div className={styles.accordion}>
						<Accordion title="View Outstanding Status" animate>
							<div className={styles.org_list}>
								<StatsOutstanding item={data} showOutStanding={false} />
							</div>
						</Accordion>
					</div>
					<div className={styles.tabbs}>
						<Tabs
							activeTab={activeTab}
							onChange={(val) => handleActiveTabs(val)}
							fullWidth
							themeType="primary"
						>
							{(TabsOptions || []).map(
								({ key, name, component: Component }) => (
									<TabPanel key={key} name={key} title={name}>
										{activeTab && (
											<Component {...propsData[activeTab]} />
										)}
									</TabPanel>
								),
							)}
						</Tabs>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default CallPriorityModal;
