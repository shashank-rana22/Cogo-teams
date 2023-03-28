import {
	Toggle,
	Button, RadioGroup, Chips, CheckboxGroup, Popover, SingleDateRange, Tooltip, Select,
} from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import SelectAccrual from '../../../../commons/SelectAccrual';
import { optionsCheck, optionsPeriod, optionsPills, optionsRadio } from '../constant';

import styles from './styles.module.css';

function Card() {
	const [filters, setFilters] = useState({
		entity   : '',
		category : '',
		date     : '',
		rowCheck : '',
		colCheck : '',
		chip     : 'Segment',
		radio    : '',
		mode     : '',
		ratio    : '',
	});
	const [selectFilter, setSelectFilter] = useState(false);
	const [select, setSelect] = useState(false);

	const content = () => (
		<div className={styles.content_container}>
			<div>Rows</div>
			<div className={styles.border} />
			<CheckboxGroup
				style={{ flexDirection: 'column', width: '100%' }}
				options={optionsCheck}
				onChange={(val) => { setFilters((prev) => ({ ...prev, rowCheck: val })); }}
				value={filters?.rowCheck}
			/>

			<div>Columns</div>

			<div className={styles.border} />

			<CheckboxGroup
				style={{ flexDirection: 'column', width: '100%' }}
				options={optionsCheck}
				onChange={(val) => { setFilters((prev) => ({ ...prev, colCheck: val })); }}
				value={filters?.colCheck}
			/>
		</div>
	);

	const contentRadioData = () => (

		<div>
			<div className={styles.chips}>
				<Chips
					size="md"
					items={optionsPills}
					selectedItems={filters?.chip}
					onItemChange={(val:string) => { setFilters((prev) => ({ ...prev, chip: val })); }}
				/>
			</div>
			<div className={styles.radio}>
				<RadioGroup
					options={optionsRadio(filters?.chip)}
					onChange={(val) => { setFilters((prev) => ({ ...prev, radio: val })); }}
					value={filters?.radio}
				/>
			</div>

		</div>
	);
	const rest = { onClickOutside: () => { setSelect(false); setSelectFilter(false); } };

	return (
		<div>
			<div className={styles.container}>
				<div>
					<div className={styles.period}>
						Selection Criteria
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
							value={filters?.entity}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, entity: val })); }}
							placeholder="Entity"
							options={[{ label: 'All', value: 'all' },
								{ label: 'Entity 101', value: '101' },
								{ label: 'Entity 301', value: '301' }]}
							isClearable
							style={{ width: '150px' }}
						/>
						<Select
							value={filters?.category}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, category: val })); }}
							placeholder="Category"
							options={optionsPeriod}
							isClearable
							style={{ width: '180px' }}
						/>

						<div className={styles.date_range}>
							<SingleDateRange
								placeholder="Date"
								isPreviousDaysAllowed
								dateFormat="MM/dd/yyyy"
								name="date"
								onChange={(val:any) => { setFilters((prev) => ({ ...prev, date: val })); }}
								value={filters?.date}
							/>
						</div>

						<div>
							<Popover
								placement="bottom"
								caret={false}
								render={content()}
								visible={select}
								{...rest}
							>
								<div
									className={styles.select_popover}
									onClick={() => { setSelect(!select); }}
									role="presentation"
								>
									<SelectAccrual
										value={startCase(filters?.rowCheck) || startCase(filters?.colCheck)}
										placeholder="Category"
										setFilters={setFilters}
									/>
								</div>

							</Popover>

						</div>
						<div>
							<Popover
								placement="bottom"
								caret={false}
								render={contentRadioData()}
								visible={selectFilter}
								{...rest}
							>
								<div
									className={styles.select_popover}
									onClick={() => { setSelectFilter(!selectFilter); }}
									role="presentation"
								>
									<SelectAccrual
										value={startCase(filters?.radio)}
										placeholder="Category"
										setFilters={setFilters}
									/>
								</div>

							</Popover>

						</div>
					</div>
					<div className={styles.buttons}>
						<Button themeType="secondary">View saved Customizations</Button>
						<Button themeType="secondary">Action</Button>
						<Button>Run Report</Button>

					</div>
				</div>

			</div>

			<div className={styles.toggle_data}>
				<div>
					<Toggle
						name="mode"
						size="md"
						offLabel="Comparison Mode"
						showOnOff
						value={filters?.mode}
						onChange={(e) => {
							setFilters((prev) => ({ ...prev, mode: e?.target?.checked ? 'true' : 'false' }));
						}}
					/>
				</div>

				<div>
					<Toggle
						name="ratio"
						size="md"
						onLabel="Value Ratio"
						offLabel="Volume Ratio"
						showOnOff
						value={filters?.ratio}
						onChange={(e) => {
							setFilters((prev) => ({ ...prev, ratio: e?.target?.checked ? 'true' : 'false' }));
						}}
					/>
				</div>
			</div>
		</div>

	);
}
export default Card;
