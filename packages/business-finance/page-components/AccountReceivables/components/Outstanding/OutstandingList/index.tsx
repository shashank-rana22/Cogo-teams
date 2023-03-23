import { TabPanel, Tabs, Tooltip } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import { CARD_DETAILS } from '../../../constants/index';
import useGetPartnerRmMapping from '../../../hooks/useGetPartnerRmMapping';

import PopoverTags from './PopoverTags';
import StatsOutstanding from './StatsOutstanding';
import styles from './styles.module.css';
import TabsOptions from './TabOptions';

function OutstandingList({ item }) {
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
		organizationId,
		organizationName,
		businessName,
		collectionPartyType = [],
		serialId,
		countryCode,
		category = [],
		organizationSerialId,
		selfOrganizationId,
		updatedAt,
		selfOrganizationName,
	} = item || {};

	const propsData = {
		invoice_details: {
			data: item,
		},
		payments_list: {
			data: item,
		},
		settlement_list: {
			data: item,
		},
		organization_users: {
			data: item,
		},
	};

	const content = (types, head) => (
		<div style={{ padding: '15px' }}>
			<div className={styles.heading}>{head}</div>
			<div className={styles.hr} />
			<div className={styles.flex_column}>
				{types?.map((party) => (
					<span style={{ marginTop: '5px' }}>
						<div className={styles.styled_tag}>{party}</div>
					</span>
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
								OM CARGO LOGISTICS
							</div>
							{' '}
							{collectionPartyType.length > 1 ? (
								<Tooltip
									theme="light"
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
