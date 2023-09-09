import { Button, cl, TabPanel, Tabs, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload, IcMRadioLoader } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetDownloadReport from '../../Invoices/hooks/useGetDownloadReport';
import { getDetails } from '../constants/details';

import StatsOutstanding from './StatsOutstanding';
import styles from './styles.module.css';
import TAB_OPTIONS from './TabOptions';
import UserDetails from './UserDetails';

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

	const [stats, setStats] = useState({});

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
		createdAt = '',
		organizationName = '',
		creditDays = '',
		organizationId = '',
		entityCode = '',
		agent = [],
		selfOrganizationId = '',
	} = item || {};

	const propsData = {
		invoice_details: {
			organizationId,
			entityCode,
			showName: false,
			setStats,
		},
		settlement: {
			organizationId,
			entityCode,
			setStats,
		},
		organization_users: {
			organizationId : selfOrganizationId,
			orgData        : item,
			setStats,
		},
	};

	const { generateInvoice = () => { }, loading: generating = false } = useGetDownloadReport({
		globalFilters:
			{ organizationId },
	});

	return (
		<div
			className={styles.card}
			style={{
				maxHeight: isAccordionActive ? '80%' : '30%',
			}}
		>
			<div className={styles.serial_card}>
				<div className={styles.serial_id_card}>
					{getDetails({ entityCode }).map((itemdetail) => (
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

					<div className={cl`${styles.credit_days} ${styles.custom_tag}`}>
						<div>Credit Days:</div>
						<div className={styles.value}>
							{' '}
							{creditDays || DEFAULT_LEN}
						</div>
					</div>
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
						{isEmpty(agent) ? null : (
							<div className={styles.download_icon}>
								<UserDetails agent={agent} />
							</div>
						)}
						<div className={styles.download_icon}>
							{generating ? <IcMRadioLoader /> : <IcMDownload onClick={generateInvoice} />}
						</div>
						{!showElement && (
							<Button
								size="md"
								style={{ marginLeft: '10px' }}
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
							onChange={handleActiveTabs}
							fullWidth
							themeType="primary"
						>
							{(TAB_OPTIONS || []).map(
								({ key, name, component: Component }) => (
									<TabPanel
										key={key}
										name={key}
										title={name}
										badge={stats?.[key] || DEFAULT_LEN}
									>
										{activeTab ? (
											<Component {...propsData[activeTab]} />
										) : null}
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
