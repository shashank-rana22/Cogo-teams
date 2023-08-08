import { Button, TabPanel, Tabs, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { getTaxLabels } from '../../../constants/index';
import useGetPartnerRmMapping from '../../../hooks/useGetPartnerRmMapping';

import DownloadLedgerModal from './DownloadLedgerModal';
import PopoverTags from './PopoverTags';
import StatsOutstanding from './StatsOutstanding';
import styles from './styles.module.css';
import TabsOptions from './TabOptions';

interface CreditController {
	id?: string,
	name?: string,
	email?: string
}

interface SalesAgent {
	id?: string,
	name?: string,
	email?: string
}
interface ItemProps {
	creditController?: CreditController,
	salesAgent?: SalesAgent,
	businessName?: string,
	collectionPartyType?: string[],
	serialId?: string,
	countryCode?: string,
	organizationSerialId?: string,
	lastUpdatedAt?: Date,
	selfOrganizationName?: string,
	organizationId?: string,
	selfOrganizationId?: string
}
interface OutstandingListProps {
	item?: ItemProps,
	entityCode?: string
}

function OutstandingList({ item = {}, entityCode = '' }: OutstandingListProps) {
	const [activeTab, setActiveTab] = useState('');
	const [showLedgerModal, setShowLedgerModal] = useState(false);

	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const { data, getPartnerMappingData, loading } = useGetPartnerRmMapping();
	const handleClick = (val) => {
		getPartnerMappingData(val);
	};

	const handleActiveTabs = (val) => {
		if (val === activeTab) {
			setActiveTab('');
			setIsAccordionActive(false);
		} else {
			setActiveTab(val);
			setIsAccordionActive(true);
		}
	};

	const {
		businessName,
		collectionPartyType = [],
		serialId,
		countryCode,
		organizationSerialId,
		lastUpdatedAt,
		selfOrganizationName,
		organizationId = '',
		selfOrganizationId = '',
	} = item;

	const propsData = {
		invoice_details: {
			organizationId,
			entityCode,
			showName: false,
		},
		payments_list: {
			organizationId,
			entityCode,
		},
		settlement_list: {
			organizationId,
			entityCode,

		},
		organization_users: {
			selfOrganizationId,
		},
	};

	const content = (types, head) => (
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

	return (
		<div
			className={styles.card}
			style={{
				maxHeight: isAccordionActive ? '80%' : '30%',
			}}
		>
			<div className={styles.serial_card}>
				<div className={styles.serial_id_card}>
					<div className={styles.custom_tag}>
						<div>
							Serial Id -
							{' '}
							{organizationSerialId}
						</div>

					</div>
					<div className={styles.custom_tag_margin}>
						<div>
							TradeParty Serial Id -
							{' '}
							{serialId}
						</div>
					</div>
				</div>
				<div className={styles.serial_id_card}>
					<div className={styles.custom_tag}>
						<div>
							Last Updated At :
							{' '}
						</div>
						<div className={styles.value}>
							{formatDate({
								date       : lastUpdatedAt,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : '|',
							})}
						</div>
					</div>
					<div className={styles.custom_tag_margin}>
						<div>CountryCode:</div>
						<div className={styles.Value}>{countryCode}</div>
					</div>
				</div>
			</div>
			<div className={styles.popover_wrapper}>
				<PopoverTags
					data={data}
					loading={loading}
					handleClick={handleClick}
					item={item}
				/>
			</div>
			<div style={{ padding: '2px 16px' }}>

				<div className={styles.org_name_conatiner}>
					<div className={styles.sub_org_name_conatiner}>
						<div style={{ display: 'flex' }}>
							<div className={styles.styled_name}>
								{businessName}
							</div>
							{' '}
							{collectionPartyType.length > 1 ? (
								<Tooltip
									content={content(
										collectionPartyType,
										'Collection Party Types',
									)}
									placement="right"
								>
									<div className={styles.styled_tag}>
										{`${startCase(collectionPartyType[GLOBAL_CONSTANTS.zeroth_index])}  +${
											collectionPartyType.length - 1
										}` || '-'}
									</div>

								</Tooltip>
							) : (
								<div className={styles.styled_tag}>
									{startCase(collectionPartyType[GLOBAL_CONSTANTS.zeroth_index]) || '-'}
								</div>
							)}
						</div>
						{' '}

						{selfOrganizationName && (
							<div className={styles.legal_business_name}>{selfOrganizationName}</div>
						)}

					</div>
					<div className={styles.category_container}>
						{getTaxLabels(entityCode).map((it) => {
							if (!it.label) {
								return null;
							}
							return (
								<div className={styles.sub_category_container} key={it?.label}>
									<div className={styles.tag_text}>
										{it.label}
										:
									</div>
									<div className={styles.tag_text_left}>
										{it.valueKey === 'registrationNumber'
											? item[it.valueKey]
											: startCase(item[it.valueKey]?.name || item[it.valueKey])
                                            || it.defaultValueKey}
									</div>
								</div>
							);
						})}
						<Button
							size="sm"
							style={{ marginLeft: '20px' }}
							onClick={() => setShowLedgerModal(true)}
						>
							Download Ledger

						</Button>
					</div>
				</div>

				<div className={styles.org_list}>
					<StatsOutstanding item={item} />
				</div>

				<Tabs
					activeTab={activeTab}
					onChange={(val) => handleActiveTabs(val)}
					fullWidth
					themeType="primary"
				>
					{(TabsOptions || []).map(({ key, name, component: Component }) => (
						<TabPanel key={key} name={key} title={name}>
							{activeTab && <Component {...propsData[activeTab]} />}
						</TabPanel>
					))}
				</Tabs>
			</div>

			{showLedgerModal ? (
				<DownloadLedgerModal
					showLedgerModal={showLedgerModal}
					setShowLedgerModal={setShowLedgerModal}
					item={item}
				/>
			) : null}

		</div>
	);
}

export default OutstandingList;
