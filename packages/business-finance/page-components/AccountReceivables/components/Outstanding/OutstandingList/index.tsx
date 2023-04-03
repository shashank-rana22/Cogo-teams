import { TabPanel, Tabs, Tooltip } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import { GenericObject } from '../../../commons/Interfaces';
import { CARD_DETAILS } from '../../../constants/index';
import useGetPartnerRmMapping from '../../../hooks/useGetPartnerRmMapping';

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
	updatedAt?: Date,
	selfOrganizationName?: string,
	organizationId?: string,
	selfOrganizationId?: string
}
interface OutstandingListProps {
	item?: ItemProps,
	outStandingFilters?: GenericObject,
}

function OutstandingList({ item, outStandingFilters }: OutstandingListProps) {
	const [activeTab, setActiveTab] = useState('');

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
		updatedAt,
		selfOrganizationName,
		organizationId = '',
		selfOrganizationId = '',
	} = item || {};

	const propsData = {
		invoice_details: {
			organizationId,
			outStandingFilters,
		},
		payments_list: {
			organizationId,
			outStandingFilters,
		},
		settlement_list: {
			organizationId,
			outStandingFilters,

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
					<div className={styles.style_margin_top}>
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
							{' '}
							{format(
								updatedAt,
								'dd MMM yyyy hh:mm aaa',
								{},
								false,
							)}
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
										{`${startCase(collectionPartyType[0])}  +${
											collectionPartyType.length - 1
										}` || '-'}
									</div>

								</Tooltip>
							) : (
								<div className={styles.styled_tag}>
									{startCase(collectionPartyType[0]) || '-'}
								</div>
							)}
						</div>
						{' '}

						{selfOrganizationName && (
							<div className={styles.legal_business_name}>{selfOrganizationName}</div>
						)}

					</div>
					<div className={styles.category_container}>
						{CARD_DETAILS.map((it) => (
							<div className={styles.sub_category_container}>
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
						))}
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

		</div>
	);
}

export default OutstandingList;
