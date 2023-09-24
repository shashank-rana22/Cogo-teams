/* eslint-disable max-lines-per-function */
import { Button, Checkbox, cl, DateRangepicker, Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { startCase, upperCase, isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import DATE_RANGE_MAPPING from '../../../config/DATE_RANGE_MAPPING';
import FILTER_OPTIONS from '../../../config/FILTER_OPTIONS.json';
import ShipmentTabMapping from '../../../config/SHIPMENT_TAB_MAPPING';
import KamDeskContext from '../../../context/KamDeskContext';
import convertArrayToOptions from '../../../utils/convertArrayToOptions';

import SHIPMENT_TYPE_OPTIONS from './shipmentTypeOptions';
import styles from './styles.module.css';

const PARTNER_PARAMS = {
	page_limit          : 10,
	agent_data_required : false,
	filters             : {
		account_type : 'importer_exporter',
		kyc_status   : 'verified',
		status       : 'active',
	},
};

const TRADE_TYPE_OPTIONS = [
	{ label: 'Import', value: 'import' },
	{ label: 'Export', value: 'export' },
];

function FilterBy({
	setPopoverFilter = () => {},
	popoverFilter = {},
	setShowPopover = () => {},
}) {
	const { filters = {}, setFilters, shipmentType, stepperTab } = useContext(KamDeskContext);

	const { date_type, dateRange = '' } = popoverFilter || {};

	const dynamicShipmentType = popoverFilter?.shipment_type;

	const possibleFilters = shipmentType === 'all'
		? ShipmentTabMapping.all.possible_filters
		: ShipmentTabMapping?.[shipmentType]?.[stepperTab]?.possible_filters;

	const handleCustomDateChange = (val) => {
		const { startDate, endDate } = val;

		setPopoverFilter({ ...popoverFilter, startDate, endDate });
	};

	const handleReset = () => {
		const { startDate, endDate } = DATE_RANGE_MAPPING.today;

		const {
			triggered_pending_invoices, importer_exporter_id,
			source, payment_term, tags, ...restFilters
		} = filters || {};

		const finalFilters = {
			...restFilters,
			trade_type : undefined,
			date_type  : undefined,
			dateRange  : 'today',
			startDate,
			endDate,
		};

		setFilters(finalFilters);

		setShowPopover(false);
	};

	const handleApplyFilters = () => {
		const { triggered_pending_invoices, ...restFilters } = filters || {};

		const { triggered_pending_invoices:currentPendingInvoice, ...restPopOverFilters } = popoverFilter || {};

		const finalFilters = {
			...restFilters,
			...restPopOverFilters,
			...(currentPendingInvoice
				? { triggered_pending_invoices: true } : {}),
		};

		setFilters(finalFilters);

		setShowPopover(false);
	};

	return (
		<div>
			<div className={styles.action_buttons}>
				<Button
					size="sm"
					onClick={handleReset}
					themeType="tertiary"
				>
					<div className={styles.action_text}>Reset</div>
				</Button>

				<Button
					size="sm"
					onClick={handleApplyFilters}
				>
					<div className={styles.action_text}>Apply</div>
				</Button>
			</div>

			{possibleFilters?.includes('importer_exporter_id') ? (
				<div className={styles.channel_partner}>
					<div className={styles.filter_heading}>Customer/Channel Partner</div>
					<AsyncSelect
						params={PARTNER_PARAMS}
						asyncKey="organizations"
						initialCall={false}
						value={popoverFilter.importer_exporter_id}
						onChange={(val) => setPopoverFilter({ ...popoverFilter, importer_exporter_id: val })}
						size="sm"
						isClearable
					/>
				</div>
			) : null}

			{possibleFilters?.includes('triggered_pending_invoices') ? (
				<div className={styles.pending_invoice}>
					<Checkbox
						checked={popoverFilter?.triggered_pending_invoices}
						onChange={() => setPopoverFilter({
							...popoverFilter,
							triggered_pending_invoices: !popoverFilter.triggered_pending_invoices,
						})}
					/>
					<div className={styles.filter_heading}>Pending Invoices</div>
				</div>
			) : null}

			{possibleFilters?.includes('date_type') ? (
				<div className={styles.filter_container}>
					<div className={styles.filter_heading}>Date Type</div>

					<div className={styles.type_container}>
						{['eta', 'etd'].map((type) => (
							<div
								className={cl`${date_type === type ? styles.active : styles.inactive} 
							${styles.filter_by_buttons}`}
								key={type}
							>
								<Button
									onClick={() => setPopoverFilter({
										...popoverFilter,
										date_type : type,
										dateRange : 'today',
										...DATE_RANGE_MAPPING.today,
									})}
									size="xs"
								>
									{upperCase(type)}
								</Button>
							</div>
						))}
					</div>
				</div>
			) : null}

			{date_type ? (
				<div className={styles.filter_container}>
					<div className={styles.filter_heading}>{upperCase(date_type)}</div>

					<div className={styles.date_range_container}>
						{Object.keys(DATE_RANGE_MAPPING).map((dateKey) => (
							<div
								className={cl`${dateRange === dateKey ? styles.active : styles.inactive} 
							${styles.filter_by_buttons}`}
								key={dateKey}
							>
								<Button
									onClick={() => setPopoverFilter({
										...popoverFilter,
										dateRange: dateKey,
										...DATE_RANGE_MAPPING[dateKey],
									})}
									size="xs"
								>
									{startCase(dateKey)}
								</Button>
							</div>
						))}

						<div className={cl`${dateRange === 'custom' ? styles.active : styles.inactive}
							${styles.filter_by_buttons}`}
						>
							<Button
								onClick={() => setPopoverFilter({
									...popoverFilter,
									dateRange : 'custom',
									startDate : null,
									endDate   : null,
								})}
								size="xs"
								className={`${dateRange === 'custom' ? styles.active : styles.inactive}`}
							>
								Custom
							</Button>
						</div>
					</div>

					{dateRange === 'custom' ? (
						<div className={styles.filter_container}>
							<DateRangepicker
								value={popoverFilter}
								onChange={handleCustomDateChange}
								isPreviousDaysAllowed
							/>
						</div>
					) : null}
				</div>
			) : null}

			<div className={styles.channel_partner}>
				<div className={styles.filter_heading}>Shipment Type</div>
				<Select
					options={SHIPMENT_TYPE_OPTIONS}
					value={popoverFilter?.shipment_type}
					onChange={(val) => {
						setPopoverFilter({ ...popoverFilter, shipment_type: val });
					}}
					size="sm"
					isClearable
				/>
			</div>

			{possibleFilters?.includes('source') ? (
				<div className={styles.channel_partner}>
					<div className={styles.filter_heading}>Source</div>
					<Select
						options={convertArrayToOptions(FILTER_OPTIONS.sources)}
						value={popoverFilter?.source}
						onChange={(val) => { setPopoverFilter({ ...popoverFilter, source: val }); }}
						size="sm"
						isClearable
					/>
				</div>
			) : null}

			{possibleFilters?.includes('payment_term') ? (
				<div className={styles.channel_partner}>
					<div className={styles.filter_heading}>Payment Type</div>
					<Select
						options={convertArrayToOptions(FILTER_OPTIONS.payment_term)}
						value={popoverFilter?.payment_term}
						onChange={(val) => { setPopoverFilter({ ...popoverFilter, payment_term: val }); }}
						size="sm"
						isClearable
					/>
				</div>
			) : null}

			{possibleFilters?.includes('tags') ? (
				<div className={styles.channel_partner}>
					<div className={styles.filter_heading}>Tags</div>
					<Select
						options={convertArrayToOptions(FILTER_OPTIONS.tags)}
						value={popoverFilter?.tags}
						onChange={(val) => { setPopoverFilter({ ...popoverFilter, tags: val }); }}
						size="sm"
						isClearable
					/>
				</div>
			) : null}

			{
				!isEmpty(popoverFilter?.shipment_type) && (
					<div className={styles.channel_partner}>
						<div className={styles.filter_heading}>Trade Type</div>
						<Select
							options={TRADE_TYPE_OPTIONS}
							value={popoverFilter?.[`${dynamicShipmentType}_service`]?.trade_type}
							onChange={(val) => {
								setPopoverFilter({
									...popoverFilter,
									[`${dynamicShipmentType}_service`]: {
										trade_type: val,
									},
								});
							}}
							size="sm"
							isClearable
						/>
					</div>
				)
			}
		</div>
	);
}
export default FilterBy;
