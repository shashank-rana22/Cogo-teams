import { DateRangepicker, Select, Modal, RadioGroup, CheckboxGroup } from '@cogoport/components';
import {	asyncFieldsLocations, asyncFieldsOperators, useGetAsyncOptions } from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { merge, startCase } from '@cogoport/utils';

import {
	serviceOptions, taskStatusOptions,
	commodityOptions, filterOptions, entityOptions, revertedOptions, delayedOptions,
} from '../../configurations/helpers/constants';

import HeaderComponent from './header';
import styles from './styles.module.css';

function Filter({
	source = '',
	showFilters = false,
	setShowFilters = () => {},
	filter = {},
	setFilter = () => {},
	setSerialId = () => {},
	setShowWeekData = () => {},
}) {
	const isAirService = filter?.service === 'air_freight';

	const type = (isAirService) ? 'airport' : 'seaport';
	const operator_type = (isAirService) ? 'airline' : 'shipping_line';
	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const destinationLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type } } },
	));

	const FCL_COMMODITY_OPTIONS = [];
	(Object.keys(FREIGHT_CONTAINER_COMMODITY_MAPPINGS) || []).forEach((containerType) => {
		FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType].forEach((commodity) => {
			FCL_COMMODITY_OPTIONS.push(
				{
					label : (commodity.split('-') || []).map((item) => parseFloat(item) || startCase(item)).join(' '),
					value : commodity,
				},
			);
		});
	});

	return (
		<Modal size="md" show={showFilters} onClose={() => setShowFilters(!showFilters)} placement="right">
			<Modal.Header title={(
				<HeaderComponent
					setSerialId={setSerialId}
					setShowWeekData={setShowWeekData}
					setFilter={setFilter}
				/>
			)}
			/>

			<div className={styles.body}>
				<Modal.Body>
					{(source === 'rate_feedback' || source === 'rate_request')
				&& (
					<div className={styles.radio}>
						{`Total ${source === 'rate_feedback' ? 'Disliked' : 'Missing'} Rates`}
						<RadioGroup
							options={filterOptions}
							onChange={(val) => setFilter((prevFilters) => ({
								...prevFilters,
								rates : val,
								page  : 1,
							}))}
							value={filter?.rates}
						/>
					</div>
				)}
					<div>
						<p>Service</p>
						<Select
							placeholder="select"
							options={serviceOptions}
							value={filter?.service}
							style={{ width: '250px' }}
							onChange={(value) => {
								setFilter({
									service           : value,
									status            : 'pending',
									releventToMeValue : true,
									daily_stats       : true,
									assign_to_id      : '',
								});
								setShowWeekData(false);
							}}
						/>
					</div>
					<div className={styles.details}>
						<div>
							<p>Origin</p>
							<Select
								placeholder="Country / Port Pair"
								{...originLocationOptions}
								value={filter?.origin_location}
								style={{ width: '250px' }}
								isClearable
								onChange={(val) => {
									setFilter((prevFilters) => ({ ...prevFilters, origin_location: val, page: 1 }));
								}}
							/>
						</div>

						<div>
							<p>Destination</p>
							<Select
								placeholder="Country / Port Pair"
								{...destinationLocationOptions}
								value={filter?.destination_location}
								isClearable
								onChange={(val) => {
									setFilter((prevFilters) => ({
										...prevFilters,
										destination_location : val,
										page                 : 1,
									}));
								}}
							/>
						</div>
					</div>
					{(source === 'live_bookings' || source === 'rate_feedback' || source === 'rate_request')
				&& (
					<div className={styles.radio}>
						<div style={{ marginTop: '20px' }}>Entity</div>
						<RadioGroup
							options={entityOptions}
							onChange={(val) => setFilter((prevFilters) => ({
								...prevFilters,
								value : val,
								page  : 1,
							}))}
							value={filter?.value}
						/>
					</div>
				)}
					{(source === 'live_bookings')
					&& (
						<div className={styles.radio}>
							<RadioGroup
								options={revertedOptions}
								onChange={(val) => setFilter((prevFilters) => ({
									...prevFilters,
									revert : val,
									page   : 1,
								}))}
								value={filter?.revert}
							/>

							<CheckboxGroup
								options={delayedOptions}
								onChange={(val) => setFilter((prevFilters) => ({
									...prevFilters,
									opt  : val,
									page : 1,
								}))}
								value={filter?.opt}
							/>

						</div>
					)}
					{ (source === 'critical_ports' || source === 'expiring_rates'
					|| source === 'cancelled_shipments') && (
						<div>
							<div className={styles.details}>
								<div>
									<p>{(isAirService) ? 'Air Line' : 'Shipping Line'}</p>
									<Select
										placeholder="Search here"
										{...shippingLineOptions}
										value={filter?.operater_type}
										isClearable
										onChange={(val) => {
											setFilter((prevFilters) => ({
												...prevFilters,
												operater_type:
												val,
												page: 1,
											}));
										}}
									/>
								</div>
								<div>
									<p>Commodity Type</p>
									<Select
										placeholder="Search here"
										value={filter?.commodity}
										options={isAirService ? commodityOptions : FCL_COMMODITY_OPTIONS}
										isClearable
										onChange={(val) => {
											setFilter((prevFilters) => ({ ...prevFilters, commodity: val, page: 1 }));
										}}
									/>
								</div>
							</div>

							<div className={styles.details}>
								<div>
									<p>Task Status</p>
									<Select
										placeholder="Search here"
										value={filter?.status}
										options={taskStatusOptions}
										onChange={(val) => {
											setFilter((prevFilters) => ({ ...prevFilters, status: val, page: 1 }));
										}}
									/>
								</div>
								<div>
									<p>Date Range</p>
									<DateRangepicker
										style={{ width: '250px' }}
										value={{ startDate: filter?.start_date, endDate: filter?.end_date }}
										onChange={(val) => {
											setFilter((prev) => ({
												...prev, start_date: val?.startDate, end_date: val?.endDate, page: 1,
											}));
										}}
										isPreviousDaysAllowed
										maxDate={new Date()}
									/>
								</div>
							</div>
						</div>
					)}
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default Filter;
