import { Button, Chips, Popover, Datepicker, Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import SelectAccrual from '../../../../commons/SelectAccrual';
import { FilterInterface } from '../../interface';

import { optionSelect, optionsMonth, optionsPills, optionsShipment, optionsYear } from './constant';
import MoreFilter from './MoreFilter';
import OptionSelect from './OptionSelect';
import styles from './styles.module.css';

interface CardInterface {
	refetch:()=>{ }
	filters:FilterInterface
	shipmentLoading?:boolean
	setFilters: React.Dispatch<React.SetStateAction<FilterInterface>>
}

function Card({ refetch, filters, setFilters, shipmentLoading }:CardInterface) {
	const [selectFilter, setSelectFilter] = useState(false);
	const [moreFilter, setMoreFilter] = useState(false);
	const [profitNumber, setProfitNumber] = useState('');

	const handleSelectChange = (val:string) => {
		setFilters((prev) => ({ ...prev, service: val }));
		setSelectFilter(false);
	};

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
				<div className={styles.date_range}>
					<Datepicker
						placeholder="Date"
						dateFormat="MM/dd/yyyy"
						name="date"
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, date: val })); }}
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
						interactive
						visible={selectFilter}
						{...rest}
					>
						<div
							className={styles.select_popover}
							onClick={() => { setSelectFilter(!selectFilter); }}
							role="presentation"
						>
							<SelectAccrual
								value={filters?.service}
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
						style={{ width: '200px' }}
					/>
				</div>
			</div>
			<div className={styles.more_filter}>
				<Popover
					placement="bottom"
					render={contentMoreFilter()}
					interactive
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
				<Button size="lg" onClick={() => { refetch(); }} loading={shipmentLoading}> Apply</Button>

			</div>

		</div>
	);
}
export default Card;
