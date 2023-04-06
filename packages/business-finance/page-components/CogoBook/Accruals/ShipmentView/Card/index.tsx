import { SingleDateRange, Button, Chips, Popover, Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import SelectAccrual from '../../../../commons/SelectAccrual';
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
	const rest = { onClickOutside: () => { setSelectFilter(false); } };

	const onSubmit = () => {
		setPayload([]);
		setCheckedRows({});
		setFilters((prev) => ({ ...prev, page: 1 }));
		setViewSelected(false);

		if (filters.page === 1) refetch();
	};
	const monthYear = [filters?.year, filters?.month];
	const isDateRangeEnabled =	monthYear[0]?.length > 0 && typeof monthYear[1] === 'string';
	const maxDate = new Date(monthYear[0], monthYear[1], 10);
	const minDate = new Date(monthYear[0], monthYear[1] - 1, 1);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.period}>
					Choose Period
					<Tooltip
						content="Please select the accounting month"
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
						style={{ width: '120px' }}
					/>
					<Select
						value={filters?.month}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, month: val })); }}
						placeholder="Month"
						options={optionsMonth}
						isClearable
						style={{ width: '150px' }}
					/>
				</div>
			</div>
			<div>
				<div className={styles.period}>
					Choose ETA/ETD
					<Tooltip
						content="Select Shipment range to be accounted"
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
					/>
				</div>

			</div>

			<div>
				<div className={styles.period}>
					Choose Filters
					<Tooltip
						content="Please select filters accordingly"
						placement="top"
					>
						<div className={styles.info_icon_container}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>
				<div className={styles.hr_filter} />
				<div className={styles.select_container}>
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
						value={filters?.entity}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, entity: val })); }}
						placeholder="Entity"
						options={[
							{ label: '201', value: '201' },
							{ label: '301', value: '301' },
							{ label: '401', value: '401' },
							{ label: '501', value: '501' },
						]}
						isClearable
						style={{ width: '100px' }}
					/>

					<Select
						value={filters?.shipmentType}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, shipmentType: val })); }}
						placeholder="Shipment Type"
						options={optionsShipment}
						isClearable
						style={{ width: '200px' }}
					/>

				</div>
			</div>
			<div className={styles.more_filter}>
				<Popover
					placement="bottom"
					render={contentMoreFilter()}
					visible={moreFilter}
				>
					<Button
						onClick={() => { setMoreFilter(!moreFilter); }}
						size="lg"
						themeType="secondary"
					>
						+ More Filters

					</Button>
				</Popover>
				<Button
					size="lg"
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
