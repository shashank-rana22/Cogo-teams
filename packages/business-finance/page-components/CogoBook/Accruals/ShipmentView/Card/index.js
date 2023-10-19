import { SingleDateRange, Button, Popover, Select, Tooltip, Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { CHANNEL_OPTIONS } from '../../constant';
import { optionsMonth, optionsYear } from '../constant';

import MoreFilter from './MoreFilter/index';
import styles from './styles.module.css';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const FIRST_MONTH_INDEX = 1;
const FIRST_PAGE = 1;
const ALLOW_BUTTON_ON_COUNT = 2;
const MAX_DAY_ALLOWED = 10;
const FILTER_COUNT_INCREMENT = 1;

const FIND_SINGLE_DATE_FORMATE = GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'];

function ContentMoreFilter({
	setProfitNumber = () => {}, profitNumber = '',
	filters = {}, setFilters = () => {},
}) {
	return (
		<MoreFilter
			profitNumber={profitNumber}
			setProfitNumber={setProfitNumber}
			filters={filters}
			setFilters={setFilters}
		/>
	);
}

function Card({
	refetch = () => {}, filters = {}, setFilters = () => {},
	shipmentLoading = false, setViewSelected = () => {},
	setShowBtn = () => {}, setCheckedRows = () => {},
	setPayload = () => [],
	isApplyEnable = false,
	setSearchValue = () => {},
	searchValue = '',
}) {
	const [moreFilter, setMoreFilter] = useState(false);
	const [profitNumber, setProfitNumber] = useState('');

	const { jobState, range, profitPercent, channel } = filters || {};

	useEffect(() => {
		let count = 0;
		Object.values(filters).forEach((e) => {
			if (e !== undefined) {
				count += FILTER_COUNT_INCREMENT;
			}
		});

		if (count > ALLOW_BUTTON_ON_COUNT) {
			setShowBtn(true);
		} else {
			setShowBtn(false);
		}

		Object.keys(filters).forEach((key) => {
			if (key === 'month' && filters[key] === undefined) {
				setViewSelected(true);
			} else if (key === 'year' && filters[key] === undefined) { setViewSelected(true); }
		});
	}, [filters, setShowBtn, setViewSelected]);

	const rest = { onClickOutside: () => { setMoreFilter(false); } };

	const onSubmit = () => {
		setPayload([]);
		setCheckedRows({});
		setFilters((prev) => ({ ...prev, page: 1 }));
		setViewSelected(false);

		if (filters?.page === FIRST_PAGE) {
			refetch();
		}
	};
	const monthYear = [filters?.year, filters?.month];
	const isDateRangeEnabled =	!isEmpty(monthYear[ZEROTH_INDEX]) && typeof monthYear[FIRST_MONTH_INDEX] === 'string';
	const maxDate = new Date(monthYear[ZEROTH_INDEX], monthYear[FIRST_MONTH_INDEX], MAX_DAY_ALLOWED);
	const minDate = new Date(
		monthYear[ZEROTH_INDEX],
		monthYear[FIRST_MONTH_INDEX] - FIRST_MONTH_INDEX,
		FIRST_MONTH_INDEX,
	);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.period}>
					Choose Period
					<Tooltip
						content={(
							<div className={styles.font_size_tooltip}>
								Please select the
								<br />
								accounting month
							</div>
						)}
						placement="top"
					>
						<div className={styles.info_icon_container}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>

				<div className={styles.hr_period} />

				<div className={styles.select_container}>
					<div style={{ marginRight: '20px' }}>
						<Select
							value={filters?.year}
							onChange={(val) => { setFilters((prev) => ({ ...prev, year: val })); }}
							placeholder="Year"
							options={optionsYear}
							isClearable
							style={{ width: '150px' }}
							size="sm"
						/>
					</div>
					<Select
						value={filters?.month}
						onChange={(val) => { setFilters((prev) => ({ ...prev, month: val })); }}
						placeholder="Month"
						options={optionsMonth}
						isClearable
						style={{ width: '150px' }}
						size="sm"
					/>
				</div>
			</div>
			<div style={{ marginLeft: '20px' }}>
				<div className={styles.period}>
					Choose ETA/ETD
					<Tooltip
						content={(
							<div style={{ fontSize: '12px' }}>
								Select Shipment range to
								<br />
								be accounted
							</div>
						)}
						placement="top"
					>
						<div className={styles.info_icon_container}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>
				<div className={styles.hr} />
				<div className={styles.date_range}>
					<SingleDateRange
						placeholder="Date"
						maxDate={maxDate}
						minDate={minDate}
						isPreviousDaysAllowed
						dateFormat={FIND_SINGLE_DATE_FORMATE}
						name="date"
						disable={!isDateRangeEnabled}
						onChange={(val) => { setFilters((prev) => ({ ...prev, date: val })); }}
						value={filters?.date}
						style={{ width: '184px' }}
					/>
				</div>

			</div>

			<div>
				<div className={styles.period}>
					<span style={{ marginRight: '6px' }}>Channel</span>
					<Tooltip
						maxWidth={500}
						placement="top"
						content={(
							<div className={styles.content_tooltip}>
								<div>
									<span className={styles.heading_bold}>Review Channel: </span>
									Shipment IDs having expected profitability
								</div>

								<div>
									<span className={styles.heading_bold}>Audit Channel: </span>
									{' '}
									Shipment IDs to be investigated
								</div>
							</div>
						)}
					>
						<IcMInfo style={{ marginTop: '2px' }} />
					</Tooltip>
				</div>
				<div className={styles.hr_filter} />
				<div className={styles.select_container}>
					<div className={styles.channel_info}>
						<Select
							value={channel}
							onChange={(val) => setFilters({ ...filters, channel: val })}
							options={CHANNEL_OPTIONS}
							isClearable
							placeholder="Channel"
							className={styles.milestone}
							size="sm"
						/>
					</div>
					<div className={styles.input_container}>
						<Input
							size="sm"
							value={searchValue}
							onChange={(val) => { setSearchValue(val); }}
							placeholder="Search by SID"
							disabled={!isApplyEnable}
							suffix={<IcMSearchlight height="15px" width="15px" style={{ marginRight: '8px' }} />}
							style={{ padding: '4px' }}
						/>
					</div>
				</div>
			</div>
			<div className={styles.more_filter}>
				<Popover
					placement="bottom"
					render={(
						<ContentMoreFilter
							profitNumber={profitNumber}
							setProfitNumber={setProfitNumber}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
					visible={moreFilter}
					{...rest}
				>
					<Button
						onClick={() => { setMoreFilter(!moreFilter); }}
						size="md"
						themeType="secondary"
						style={{ marginRight: '16px' }}
					>
						+ More Filters
						{ jobState || range || profitPercent ? <div className={styles.dot} /> : null}
					</Button>
				</Popover>
				<Button
					size="md"
					onClick={() => { onSubmit(); }}
					disabled={!isApplyEnable}
					loading={shipmentLoading}
				>
					Apply
				</Button>

			</div>

		</div>
	);
}
export default Card;
