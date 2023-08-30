import { Button, cl, TabPanel, Tabs, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { details } from '../constants/details';

import StatsOutstanding from './StatsOutstanding/index';
import styles from './styles.module.css';
import TabsOptions from './TabOptions';

const DEFAULT_TYPE_LEN = 1;

const DEFAULT_LEN = 0;

function Content({ types = [], head = '' }) {
	return (
		<div className={styles.padding_container}>
			<div className={styles.heading}>{head}</div>
			<div className={styles.hr} />
			<div>
				{types?.map((party) => (
					<div className={styles.style_margin_top} key={party}>
						<div className={styles.styled_tag}>
							{startCase(party)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function OutstandingList({
	item = {},
	showElement = false,
	setSelectedOrg = () => { },
}) {
	const [activeTab, setActiveTab] = useState('invoice_details');

	const [isAccordionActive, setIsAccordionActive] = useState(false);

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
		tradeType: collectionPartyType = [],
		countryCode,
		createdAt,
		organizationName,
		creditDays,
		organizationId = '',
		entityCode = '',
	} = item || {};

	const propsData = {
		invoice_details: {
			organizationId,
			entityCode,
			showName: false,
		},
		settlement: {
			organizationId,
			entityCode,
		},
		organization_users: {
			organizationId,
			orgData: item,
		},
	};

	return (
		<div
			className={styles.card}
			style={{
				maxHeight: isAccordionActive ? '80%' : '30%',
			}}
		>
			<div className={styles.serial_card}>
				<div className={styles.serial_id_card}>
					{details({ entityCode }).map((itemdetail) => (
						<div className={styles.custom_tag} key={itemdetail.key}>
							<div>
								{itemdetail?.label}
								{' '}
								-
								{' '}
								{item?.[itemdetail?.key] ? startCase(item?.[itemdetail?.key]) : 'N/A'}
							</div>
						</div>
					))}
				</div>

				<div className={styles.serial_id_card}>
					{countryCode ? (
						<div className={cl`${styles.custom_tag_end} ${styles.custom_tag}`}>
							<div className={styles.country}>
								Country Code:
							</div>
							<div className={styles.Value}>{countryCode}</div>
						</div>
					) : null}
					{creditDays ? (
						<div className={cl`${styles.credit_days} ${styles.custom_tag}`}>
							<div>Credit Days:</div>
							<div className={styles.Value}>{creditDays || DEFAULT_LEN}</div>
						</div>
					) : null}
					<div className={cl`${styles.updated_at} ${styles.custom_tag}`}>
						<div>Last Updated At : </div>
						<div className={styles.value}>
							{formatDate({
								date: createdAt,
								dateFormat:
									GLOBAL_CONSTANTS.formats.date[
										'dd MMM yyyy'
									],
								timeFormat:
									GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' | ',
							})}
						</div>
					</div>
				</div>
			</div>
			<div style={{ padding: '8px 16px' }}>
				<div className={styles.org_name_conatiner}>
					<div className={styles.sub_org_name_conatiner}>
						<div className={styles.orgdetails}>
							<div className={styles.styled_name}>
								{organizationName}
							</div>
							{' '}
							{collectionPartyType.length > DEFAULT_TYPE_LEN ? (
								<Tooltip
									content={(<Content types={collectionPartyType} head="Collection Party Types" />)}
									placement="right"
								>
									<div className={styles.styled_tag}>
										{`${startCase(
											collectionPartyType[
												GLOBAL_CONSTANTS.zeroth_index
											],
										)}  +${collectionPartyType.length - DEFAULT_TYPE_LEN
										}` || '-'}
									</div>
								</Tooltip>
							) : (
								<div className={styles.styled_tag}>
									{startCase(
										collectionPartyType[
											GLOBAL_CONSTANTS.zeroth_index
										],
									) || '-'}
								</div>
							)}
						</div>
					</div>
					<div className={styles.ledger_style}>
						{!showElement && (
							<Button
								size="md"
								style={{ marginLeft: '20px' }}
								onClick={() => setSelectedOrg(item)}
							>
								View Details
							</Button>
						)}
					</div>
				</div>

				<div className={styles.org_list}>
					<StatsOutstanding item={item} />
				</div>
				<div className={styles.tabsstats}>
					{showElement && (
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
					)}
				</div>
			</div>
		</div>
	);
}

export default OutstandingList;
