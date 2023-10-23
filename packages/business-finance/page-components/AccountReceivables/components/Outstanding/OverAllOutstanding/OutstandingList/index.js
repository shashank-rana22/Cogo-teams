/* eslint-disable max-lines-per-function */
import { Button, TabPanel, Tabs, Tooltip, Popover, RadioGroup } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload, IcMOverflowLine } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { getTaxLabels } from '../../../../constants/index';
import useUpdateAccountTagging from '../../../../hooks/useUpdateAccountTagging';

import DownloadLedgerModal from './DownloadLedgerModal';
import StatsOutstanding from './StatsOutstanding/index';
import styles from './styles.module.css';
import TabsOptions from './TabOptions';
import UserDetails from './UserDetails';

function ChangeStatus({ item = {}, refetch = () => {} }) {
	const [currentstatus, setCurrentStatus] = useState('creditcontroller');
	const { apiTrigger } = useUpdateAccountTagging({ item });
	const onSubmit = async () => {
		await (apiTrigger(currentstatus));
		refetch();
	};
	// const { apiTrigger } = useUpdateAccountTagging({ item });

	return (

		<>

			<b>Change Current Account Status</b>

			<RadioGroup
				options={[
					{ name: 'preLegal', value: 'prelegal', label: 'Pre Legal' },
					{ name: 'legal', value: 'legal', label: 'Legal' },
					{ name: 'never', value: 'never', label: 'Never' },
					{ name: 'creditController', value: 'creditcontroller', label: 'Credit Controller' }]}
				value={currentstatus}
				onChange={setCurrentStatus}
			/>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>

				<Button size="md" themeType="primary" onClick={() => onSubmit()}>

					SUBMIT

				</Button>

			</div>

		</>

	);
}

function OutstandingList({
	item = {},
	refetch = () => {},
	entityCode = '',
	showElement = false,
	organizationId = '',
	setSelectedOrgId = () => {},
}) {
	const [activeTab, setActiveTab] = useState('invoice_details');
	const [showLedgerModal, setShowLedgerModal] = useState(false);

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
		businessName,
		collectionPartyType = [],
		serialId,
		countryCode,
		organizationSerialId,
		lastUpdatedAt, // not there
		selfOrganizationName,
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
			orgData: item,
		},
		communication: {
			orgData: item,
		},
	};

	function Content({ types = [], head = '' }) {
		return (
			<div className={styles.padding_container}>
				<div className={styles.heading}>{head}</div>
				<div className={styles.hr} />
				<div className={styles.width_container}>
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
						<div>Last Updated At : </div>
						<div className={styles.value}>
							{formatDate({
								date: lastUpdatedAt,
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
					<div className={styles.custom_tag_margin}>
						<div>CountryCode : </div>
						<div className={styles.country}>{countryCode}</div>
					</div>
				</div>
			</div>
			<div className={styles.popover_wrapper}>
				{getTaxLabels(entityCode).map((it) => {
					if (!it.label) {
						return null;
					}
					return (
						<div
							className={styles.sub_category_container}
							key={it?.label}
						>
							<div className={styles.tag_text}>
								{it.label}
								:
							</div>
							<div className={styles.tag_text_left}>
								{it.valueKey === 'registrationNumber'
									? item[it.valueKey]
									: startCase(
										item[it.valueKey]?.name
									|| item[it.valueKey],
									) || it.defaultValueKey}
							</div>
						</div>
					);
				})}
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
									content={(
										<Content
											types={collectionPartyType}
											head="Collection Party Types"
										/>
									)}
									placement="right"
								>
									<div className={styles.styled_tag}>
										{`${startCase(
											collectionPartyType[
												GLOBAL_CONSTANTS.zeroth_index
											],
										)}  +${
											collectionPartyType.length - 1
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
						{' '}
						{selfOrganizationName && (
							<div className={styles.legal_business_name}>
								{selfOrganizationName}
							</div>
						)}
					</div>
					<div className={styles.ledger_style}>
						{isEmpty(item) ? null : (
							<UserDetails item={item} />
						)}
						<Tooltip content="Ledger Download" placement="top">
							<div className={styles.download_icon_div}>
								<IcMDownload
									fill="black"
									onClick={() => setShowLedgerModal(true)}
								/>
							</div>
						</Tooltip>
						<div className={styles.download_icon_div}>

							<Popover placement="left" render={<ChangeStatus item={item} refetch={refetch} />}>

								<IcMOverflowLine />

							</Popover>

						</div>

						{!showElement && (
							<Button
								size="md"
								style={{ marginLeft: '20px' }}
								onClick={() => setSelectedOrgId(item)}
							>
								View Details
							</Button>
						)}
					</div>
				</div>

				<div className={styles.org_list}>
					<StatsOutstanding item={item} />
				</div>
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
