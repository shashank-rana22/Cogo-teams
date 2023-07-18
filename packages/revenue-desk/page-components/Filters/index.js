import { RadioGroup, Chips, SingleDateRange, Tags } from '@cogoport/components';

import { statusOptions, tradeOptions, shipmentSourceOptions, rdStatusOptions } from '../../helpers/filterOptionMapping';
import getFiltersTagsArray from '../../helpers/getFiltersTagsArray';
import { VALUE_TWO, VALUE_ZERO } from '../constants';

import FilterLocation from './FilterLocation';
import styles from './styles.module.css';

function Filters({ filters, setFilters }) {
	const {
		shipmentStatusArray, tradeTypeArray, rdStatusArray,
		shipmentSourceArray, departureDateArray, createdDateArray, cargoDateArray,
	} = getFiltersTagsArray(filters);

	return (
		<div className={styles.filter}>
			<div className={styles.tag_outer_container}>
				<div className={styles.tag_container}>
					<Tags
						items={shipmentStatusArray}
						onItemsChange={() => {
							setFilters({ ...filters, state: '', rd_state: '' });
						}}
						size="md"
					/>
				</div>
				<div className={styles.tag_container}>
					<Tags
						items={tradeTypeArray}
						onItemsChange={() => {
							setFilters({ ...filters, trade_type: '' });
						}}
						size="md"
					/>
				</div>
				<div className={styles.tag_container}>
					<Tags
						items={rdStatusArray}
						onItemsChange={() => {
							setFilters({ ...filters, rd_state: '' });
						}}
						size="md"
					/>
				</div>
				<div className={styles.tag_container}>
					<Tags
						items={shipmentSourceArray}
						onItemsChange={() => {
							setFilters({ ...filters, source: '' });
						}}
						size="md"
					/>
				</div>
				<div className={styles.date_tag_container}>
					<Tags
						items={departureDateArray}
						onItemsChange={() => {
							setFilters({ ...filters, departure_date: '' });
						}}
						size="md"
					/>
				</div>
				<div className={styles.date_tag_container}>
					<Tags
						items={createdDateArray}
						onItemsChange={() => {
							setFilters({ ...filters, created_date: '' });
						}}
						size="md"
					/>
				</div>
				<div className={styles.date_tag_container}>
					<Tags
						items={cargoDateArray}
						onItemsChange={() => {
							setFilters({ ...filters, cargo_readiness_date: '' });
						}}
						size="md"
					/>
				</div>
			</div>
			<div className={styles.filter_location}>
				<FilterLocation filters={filters} setFilters={setFilters} />
			</div>
			<div className={styles.sub_section}>
				<div className={styles.sub_heading}>
					Shipment Status
				</div>
				<div>
					<RadioGroup
						options={statusOptions}
						onChange={(val) => {
							setFilters({
								...filters,
								state    : val,
								rd_state : ['completed', 'cancelled'].includes(val) ? undefined : 'active',
								page     : 1,
							});
						}}
						value={filters?.state}
						className={styles.radiogrp}
					/>
				</div>
			</div>
			{!['completed', 'cancelled'].includes(filters?.state)
				? (
					<div className={styles.sub_section}>
						<div className={styles.sub_heading}>
							RD Status
						</div>
						<div>
							<RadioGroup
								options={['air_freight', 'fcl_freight'].includes(filters?.service)
									? rdStatusOptions : rdStatusOptions.slice(VALUE_ZERO, VALUE_TWO)}
								onChange={(val) => {
									setFilters({
										...filters,
										rd_state : val,
										state    : 'active',
										page     : 1,
									});
								}}
								value={filters?.rd_state}
								className={styles.radiogrp}
							/>
						</div>
					</div>
				) : null}
			{!['ftl_freight', 'ltl_freight', 'haulage_freight'].includes(filters?.service)
				? (
					<div className={styles.sub_section}>
						<div className={styles.sub_heading}>
							Trade Type
						</div>
						<div className={styles.trade_sub_section}>
							<RadioGroup
								options={tradeOptions}
								onChange={(val) => setFilters({ ...filters, trade_type: val, page: 1 })}
								value={filters?.trade_type}
							/>
						</div>
					</div>
				) : null}

			<div className={styles.sub_section}>
				<div className={styles.sub_heading}>
					Shipment Source
				</div>
				<div className={styles.chip_container}>
					<Chips
						size="lg"
						items={shipmentSourceOptions}
						selectedItems={filters?.source}
						onItemChange={(val) => setFilters({ ...filters, source: val, page: 1 })}
					/>
				</div>
			</div>
			<div className={styles.last_section}>
				<div className={styles.sub_heading}>
					Date
				</div>
				{!(filters?.service === 'air_customs')
					? (
						<div className={styles.date_subsection}>
							<div className={styles.date_text}>
								Departure Date
							</div>
							<div>
								<SingleDateRange
									placeholder="Enter Date"
									dateFormat="MM/dd/yyyy"
									name="date"
									isPreviousDaysAllowed
									onChange={(val) => setFilters({ ...filters, departure_date: val, page: 1 })}
									value={filters?.departure_date}
								/>
							</div>
						</div>
					) : null}
				<div className={styles.date_subsection}>
					<div className={styles.date_text}>
						Created Date
					</div>
					<div>
						<SingleDateRange
							placeholder="Enter Date"
							dateFormat="MM/dd/yyyy"
							name="date"
							isPreviousDaysAllowed
							onChange={(val) => setFilters({ ...filters, created_date: val, page: 1 })}
							value={filters?.created_date}
							maxDate={new Date()}
						/>
					</div>
				</div>
				{(filters?.service === 'fcl_freight')
					? (
						<div className={styles.date_subsection}>
							<div className={styles.date_text}>
								Cargo Readiness Date
							</div>
							<div>
								<SingleDateRange
									isPreviousDaysAllowed
									placeholder="Enter Date"
									dateFormat="MM/dd/yyyy"
									name="date"
									onChange={(val) => setFilters({ ...filters, cargo_readiness_date: val, page: 1 })}
									value={filters?.cargo_readiness_date}
								/>
							</div>
						</div>
					) : null}

			</div>

		</div>
	);
}
export default Filters;
