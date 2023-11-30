/* eslint-disable max-lines-per-function */
import { Select, Modal, RadioGroup, Input, DateRangepicker } from '@cogoport/components';
import {
	asyncFieldsLocations, asyncFieldsOperators, asyncFieldsOrganization,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { merge, startCase } from '@cogoport/utils';

import {
	serviceOptions, taskStatusOptions,
	commodityOptions, entityOptions, revertedOptions, tradeTypeOptions, filterOption, lineOptions,
} from '../../configurations/helpers/constants';

import HeaderComponent from './header';
import styles from './styles.module.css';

function Filter({
	source = '',
	showFilters = false,
	setShowFilters = () => {},
	filter = {},
	setFilter = () => {},
	setShowWeekData = () => {},
	userService = undefined,
}) {
	const isAirService = filter?.service === 'air_freight' || filter?.service === 'air_customs';

	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: filterOption?.[filter?.service] } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const destinationLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: filterOption?.[filter?.service] } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: lineOptions?.[filter?.service] || 'shipping_line' } } },
	));

	const serviceProviders = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{
				params: {
					filters: {
						status       : 'active',
						kyc_status   : 'verified',
						account_type : 'service_provider',
						service      : `${filter?.service}${['haulage',
							'trailer'].includes(filter.service) ? '_freight' : ''}`,
					},
				},
			},
		),
	);

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
	const filteredServiceOptions = serviceOptions?.filter((option) => userService?.includes(option.value));

	const finalFilter = filter?.releventToMeValue ? filteredServiceOptions : serviceOptions;

	let dynamicLocalOptions = [];

	if (source === 'rate_feedback') {
		dynamicLocalOptions = [
			{
				label : 'FCL Local',
				value : 'fcl_freight_local',
			},
			{
				label : 'AIR Local',
				value : 'air_freight_local',
			},
		];
	}

	const finalService = [...finalFilter, ...dynamicLocalOptions];

	function DateRange() {
		return (
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
		);
	}

	return (
		<Modal size="md" show={showFilters} onClose={() => setShowFilters(!showFilters)} placement="right">
			<Modal.Header title={(
				<HeaderComponent
					setShowWeekData={setShowWeekData}
					setFilter={setFilter}
				/>
			)}
			/>

			<div className={styles.body}>
				<Modal.Body>
					<div className={styles.details}>
						<div>
							<p>Service</p>
							<Select
								placeholder="select"
								options={finalService}
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
					</div>
					<div className={styles.details}>
						<div>
							<p>Service Provider</p>
							<Select
								placeholder="Select Service Provider"
								{...serviceProviders}
								value={filter?.service_provider_id}
								style={{ width: '250px' }}
								isClearable
								onChange={(val) => {
									setFilter((prevFilters) => ({ ...prevFilters, service_provider_id: val, page: 1 }));
								}}
							/>
						</div>
						<div>
							{DateRange()}
						</div>
					</div>

					{['ftl_freight', 'haulage', 'air_freight', 'ltl_freight', 'trailer_freight',
						'lcl_freight', 'fcl_freight'].includes(filter?.service) && (
							<div className={styles.details}>
								<div>
									<p>Origin</p>
									<Select
										placeholder="Port Pair"
										{...originLocationOptions}
										value={filter?.origin_location}
										style={{ width: '250px' }}
										isClearable
										onChange={(val) => {
											setFilter((prevFilters) => (
												{ ...prevFilters, origin_location: val, page: 1 }));
										}}
									/>
								</div>

								<div>
									<p>Destination</p>
									<Select
										placeholder="Port Pair"
										{...destinationLocationOptions}
										value={filter?.destination_location}
										isClearable
										style={{ width: '250px' }}
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
					)}
					{['fcl_customs', 'fcl_cfs', 'lcl_customs', 'air_customs',
						'air_freight_local', 'fcl_freight_local'].includes(filter?.service) && (
							<div>
								<p>Location</p>
								<Select
									placeholder="Port Pair"
									{...destinationLocationOptions}
									value={filter?.location}
									isClearable
									style={{ width: '250px' }}
									onChange={(val) => {
										setFilter((prevFilters) => ({
											...prevFilters,
											location : val,
											page     : 1,
										}));
									}}
								/>
							</div>
					)}

					{(source === 'live_booking')
					&& (
						<div className={styles.details}>
							<div className={styles.radio}>
								<div>Status</div>
								<RadioGroup
									options={revertedOptions}
									onChange={(val) => setFilter((prevFilters) => ({
										...prevFilters,
										is_flash_booking_reverted : val,
										page                      : 1,
									}))}
									value={filter?.is_flash_booking_reverted}
								/>
							</div>
							<div className={styles.radio}>
								<div>Task Id</div>
								<Input
									size="md"
									value={filter?.serial_id}
									onChange={(val) => {
										setFilter((prevFilters) => ({
											...prevFilters,
											serial_id : val,
											page      : 1,
										}));
									}}
									style={{ width: '250px' }}
								/>
							</div>
						</div>
					)}

					<div className={styles.details}>
						{(source === 'live_booking' || source === 'rate_feedback' || source === 'rate_request')
								&& (
									<div className={styles.radio}>
										<div>Entity</div>
										<RadioGroup
											options={entityOptions}
											onChange={(val) => setFilter((prevFilters) => ({
												...prevFilters,
												cogo_entity_id : val,
												page           : 1,
											}))}
											value={filter?.cogo_entity_id}
										/>
									</div>
								)}
						{(source === 'live_booking')
						&& (
							<div className={styles.radio}>
								<div>Trade Type</div>
								<RadioGroup
									options={tradeTypeOptions}
									onChange={(val) => setFilter((prevFilters) => ({
										...prevFilters,
										trade_type : val,
										page       : 1,
									}))}
									value={filter?.trade_type}
									style={{ width: '250px' }}
								/>
							</div>
						)}
					</div>

					{ (source === 'critical_ports' || source === 'expiring_rates'
					|| source === 'cancelled_shipments') && (
						<div>
							<div className={styles.details}>
								{['fcl_freight', 'air_freight']?.includes(filter?.service)
								&& (
									<div>
										<p>
											{ filter?.service === 'air_freight' ? 'Air Line' : 'Shipping Line'}
										</p>
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
								)}
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
							</div>
						</div>
					)}
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default Filter;
