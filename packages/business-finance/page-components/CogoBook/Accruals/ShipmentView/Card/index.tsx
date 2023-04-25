import { SingleDateRange, Button, Chips, Popover, Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import SelectAccrual from '../../../../commons/SelectAccrual';
import { optionsEntity } from '../../constant';
import { FilterInterface } from '../../interface';
import { optionSelect, optionsMonth, optionsPills, optionsShipment, optionsYear } from '../constant';

import MoreFilter from './MoreFilter';
import OptionSelect from './OptionSelect';
import styles from './styles.module.css';

interface CardInterface {
	refetch:()=>{ }
	filters:FilterInterface
	shipmentLoading?:boolean
	setFilters: React.Dispatch<React.SetStateAction<FilterInterface>>
	setViewSelected: React.Dispatch<React.SetStateAction<boolean>>
	setShowBtn: React.Dispatch<React.SetStateAction<boolean>>
	setCheckedRows: React.Dispatch<React.SetStateAction<{}>>
	setPayload: React.Dispatch<React.SetStateAction<any[]>>
	isApplyEnable?:boolean
}

function Card({
	refetch, filters, setFilters, shipmentLoading, setViewSelected,
	setShowBtn, setCheckedRows, setPayload, isApplyEnable,
}:CardInterface) {
	const [selectFilter, setSelectFilter] = useState(false);

	const [moreFilter, setMoreFilter] = useState(false);
	const [profitNumber, setProfitNumber] = useState('');

	const { jobState, range, profitPercent } = filters || {};

	const handleSelectChange = (val:string) => {
		setFilters((prev) => ({ ...prev, service: val }));
		setSelectFilter(false);
	};

	useEffect(() => {
		let count = 0;
		Object.values(filters).forEach((e) => {
			if (e !== undefined) {
				count += 1;
			}
		});

		if (count > 2) {
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

	const content = () => (
		<div className={styles.content_container}>
			<div className={styles.chips}>
				<Chips
					size="md"
					items={optionsPills}
					selectedItems={filters?.tradeType}
					onItemChange={(val) => { setFilters((prev) => ({ ...prev, tradeType: val })); }}
				/>
			</div>
			{(optionSelect || []).map((option) => (
				<OptionSelect
					data={option}
					handleSelectChange={handleSelectChange}
				/>
			))}
		</div>
	);

	const contentMoreFilter = () => (
		<MoreFilter
			profitNumber={profitNumber}
			setProfitNumber={setProfitNumber}
			setFilters={setFilters}
			setMoreFilter={setMoreFilter}
			filters={filters}
		/>
	);
	const rest = { onClickOutside: () => { setSelectFilter(false); setMoreFilter(false); } };

	const onSubmit = () => {
		setPayload([]);
		setCheckedRows({});
		setFilters((prev) => ({ ...prev, page: 1 }));
		setViewSelected(false);

		if (filters.page === 1) {
			refetch();
		}
	};
	const monthYear = [filters?.year, filters?.month];
	const isDateRangeEnabled =	monthYear[0]?.length > 0 && typeof monthYear[1] === 'string';
	const maxDate = new Date(monthYear[0], monthYear[1], 10);
	const minDate = new Date(monthYear[0], monthYear[1] - 1, 1);

	return (
		<div className={styles.container}>
			<div style={{ marginRight: '20px' }}>
				<div className={styles.period}>
					Period
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
					<Select
						value={filters?.year}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, year: val })); }}
						placeholder="Year"
						options={optionsYear()}
						isClearable
						style={{ width: '110px' }}
						size="sm"
					/>
					<Select
						value={filters?.month}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, month: val })); }}
						placeholder="Month"
						options={optionsMonth}
						isClearable
						style={{ width: '150px' }}
						size="sm"
					/>
				</div>
			</div>
			<div style={{ marginRight: '20px' }}>
				<div className={styles.period}>
					Transaction Date
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
				<div className={isDateRangeEnabled ? styles.date_range : styles.date_range_not}>
					<SingleDateRange
						placeholder="Date"
						maxDate={maxDate}
						minDate={minDate}
						isPreviousDaysAllowed
						dateFormat="MM/dd/yyyy"
						name="date"
						disable={!isDateRangeEnabled}
						onChange={(val:any) => { setFilters((prev) => ({ ...prev, date: val })); }}
						value={filters?.date}
						style={{ width: '184px' }}
					/>
				</div>

			</div>

			<div>
				<div className={styles.period}>
					Filters
					<Tooltip
						content={<div className={styles.fon_tooltip}> Please select filters accordingly</div>}
						placement="top"
					>
						<div className={styles.info_icon_container}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>
				<div className={styles.hr_filter} />
				<div className={styles.select_container}>
					<Select
						value={filters?.entity}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, entity: val })); }}
						placeholder="Entity"
						options={optionsEntity}
						isClearable
						style={{ width: '100px' }}
						size="sm"
					/>

					<Popover
						placement="bottom"
						caret={false}
						render={content()}
						visible={selectFilter}
						{...rest}
					>
						<div
							className={styles.select_popover}
							onClick={() => { setSelectFilter(!selectFilter); }}
							role="presentation"
						>
							<SelectAccrual
								value={startCase(filters?.service)}
								placeholder="Service"
								setFilters={setFilters}
							/>
						</div>

					</Popover>

					<Select
						value={filters?.shipmentType}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, shipmentType: val })); }}
						placeholder="Shipment Type"
						options={optionsShipment}
						isClearable
						style={{ width: '176px' }}
						size="sm"
					/>

				</div>
			</div>
			<div className={styles.more_filter}>
				<Popover
					placement="bottom"
					render={contentMoreFilter()}
					visible={moreFilter}
					{...rest}
				>
					<Button
						onClick={() => { setMoreFilter(!moreFilter); }}
						size="md"
						themeType="secondary"
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
