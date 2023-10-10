/* eslint-disable max-lines-per-function */
import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { SERVICE_ICON_MAPPING } from '../../../configurations/helpers/constants';
import useGetShipment from '../../../hooks/useGetShipment';
import useListFreightRateFeedBacks from '../../../hooks/useListFreightRateFeedBacks';
import useListFreightRateRequests from '../../../hooks/useListFreightRateRequests';

import AddRateModal from './AddRateModal';
import CardContent from './CardContent';
import CloseModal from './CloseModal';
import DetailsView from './DetailsView';
import styles from './styles.module.css';

function ListCard({
	data = {}, getListCoverage = () => {}, filter = {}, getStats = () => {},
	source = {},
}) {
	const [showCloseModal, setShowCloseModal] = useState(false);
	const [showAddRateModal, setShowAddRateModal] = useState(false);
	const {
		sources = [], container_size, container_type,
		commodity, weight_slabs, stacking_type, price_type, source_id = '',
		origin_port,
		origin_airport,
		port,
		origin_location,
		location,
		airport,
		destination_port,
		destination_airport,
		destination_location,
		shipment_id,
	} = data;

	const {
		data:shipmemnt_data, getShipment = () => {},
		shipment_loading = false,
	} =	 useGetShipment({ shipment_id });

	const { data:requestData, getRequest, loading:request_loading } = useListFreightRateRequests({ source_id, filter });
	const {
		data:feedbackData, getFeedback,
		loading: feedback_loading,
	}	= 	useListFreightRateFeedBacks({ source_id, filter });

	const originCode = (origin_port || origin_airport || port || origin_location || location)?.port_code;

	const originName = (origin_port || origin_airport || port || origin_location || location || airport)?.name;

	const destinationCode = (destination_port || destination_airport || port || destination_location)?.port_code;

	const destinationName = (destination_port || destination_airport || port || destination_location)?.name;

	const service = filter?.service;

	const ITEM_LIST = [
		{ label: commodity && startCase(commodity) },
		{ label: container_size && `${container_size}ft` },
		{ label: container_type && startCase(container_type) },
		{ label: weight_slabs && startCase(weight_slabs) },
		{ label: stacking_type && startCase(stacking_type) },
		{ label: price_type && `Price Type : ${startCase(price_type)}` },
	];

	const handleAddRate = () => {
		setShowAddRateModal((prev) => !prev);
		if (source === 'live_booking') {
			return getShipment();
		}
		if (source === 'rate_feedback') {
			return getFeedback();
		}
		return getRequest();
	};

	return (
		<div className={styles.container}>
			{['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
			&& (
				<div>
					<div className={styles.head}>
						{data?.updated_at && (
							<div style={{ display: 'flex' }}>
								<div>
									Booked On :
									{' '}
									{formatDate({
										date       : data?.updated_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
										formatType : 'date',
									})}
								</div>
								<div className={styles.business_name}>
									{data?.service_provider?.business_name || data?.service_provider?.name}
								</div>
							</div>
						)}
						{data?.created_at && (
							<div>
								Created At :
								{' '}
								{formatDate({
									date       : data?.created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
									formatType : 'date',
								})}
							</div>
						)}
					</div>

					<div className={styles.body}>
						<div className={styles.top_left_details}>
							<div className={styles.service_icon}>
								<div style={{ margin: '5px 5px 0 0' }}>{SERVICE_ICON_MAPPING[service]}</div>
								<div className={styles.service_name}>{startCase(service)}</div>
							</div>
							{data?.shipping_line?.short_name && (
								<div>
									<Pill size="md" color="blue">
										{(filter?.service === 'air_freight' || filter?.service === 'air_customs')
											? 'Air Line:' : 'Shipping Line:'}
										{data?.shipping_line?.short_name}
									</Pill>
								</div>
							)}
						</div>
						<div>
							<Pill size="md" color="orange">
								TID:
								{' '}
								{data?.serial_id}
							</Pill>
						</div>
						<div>
							<Pill size="md" color="blue">
								Assigned to:
								{' '}
								{data?.assigned_to?.name}
							</Pill>
						</div>
					</div>
				</div>
			)}

			{['critical_ports', 'expiring_rates', 'cancelled_shipments']?.includes(source)
			&& (
				<CardContent data={data} filter={filter} service={service} />
			)}

			<div className={styles.footer}>
				<div className={styles.port_details}>
					<div className={styles.row}>
						{originName
						&& (
							<Tooltip
								content={(
									<div>
										{originName}
									</div>
								)}
								placement="top"
							>
								<p className={styles.port_name}>
									<div className={styles.column}>
										{originCode
											&& (
												<p className={styles.port_code_color}>
													&#40;
													{originCode}
													&#41;
												</p>
											)}
										<p>{originName}</p>
									</div>
								</p>
							</Tooltip>
						)}

						{destinationName
						&& (
							<>
								<IcMPortArrow style={{ margin: '0 100' }} />
								<Tooltip
									content={(
										<div>
											{destinationName}
										</div>
									)}
									placement="top"
								>
									<p className={styles.port_name}>
										<div className={styles.column}>
											{destinationCode
											&& (
												<p className={styles.port_code_color}>
													&#40;
													{destinationCode}
													&#41;
												</p>
											)}
											<p>{destinationName}</p>
										</div>
									</p>
								</Tooltip>
							</>
						)}
						<div className={styles.line} />
					</div>
				</div>
				<div className={styles.vertical_line} />
				<div className={styles.shipment_details}>
					<div>
						<div className={styles.tags_container}>
							{(ITEM_LIST || [])?.map((val) => (
								<div key={val?.label}>
									{val?.label !== undefined && val?.label !== null
									&& (
										<Pill>
											{' '}
											{val?.label}
										</Pill>
									)}
								</div>
							))}
						</div>
						{!isEmpty(sources) && (
							<span>
								{(sources || []).map((val) => (
									<Pill size="md" color="#EEF0F0" key={val}>
										{startCase(val)}
									</Pill>
								))}
							</span>
						)}
					</div>
					<div className={styles.vertical_line} />
					<div className={styles.button_grp}>
						{['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
								&& (
									<DetailsView
										data={data}
										source={source}
										filter={filter}
										shipment_loading={shipment_loading}
										request_loading={request_loading}
										feedback_loading={feedback_loading}
										shipmemnt_data={shipmemnt_data}
										requestData={requestData}
										feedbackData={feedbackData}
										getShipment={getShipment}
										getFeedback={getFeedback}
										getRequest={getRequest}
									/>
								)}

						{!['live_booking']?.includes(source)
							&& (
								<div>
									{!['aborted', 'completed'].includes(filter?.status) && (
										<Button themeType="secondary" onClick={() => { setShowCloseModal(true); }}>
											Close
										</Button>
									)}
								</div>
							)}

						<Button
							style={{ marginLeft: '16px' }}
							onClick={handleAddRate}
						>
							{filter?.status !== 'completed' ? 'Add Rate' : 'Edit Rate'}
						</Button>
					</div>
				</div>
			</div>

			{showCloseModal && (
				<CloseModal
					setShowModal={setShowCloseModal}
					showModal={showCloseModal}
					data={data}
					getListCoverage={getListCoverage}
					filter={filter}
					getStats={getStats}
					source={source}
				/>
			)}

			{showAddRateModal && (
				<AddRateModal
					showModal={showAddRateModal}
					setShowModal={setShowAddRateModal}
					filter={filter}
					data={data}
					source={source}
					getStats={getStats}
					getListCoverage={getListCoverage}
					shipmemnt_data={shipmemnt_data}
					requestData={requestData}
					feedbackData={feedbackData}
					shipment_loading={shipment_loading}
					request_loading={request_loading}
					feedback_loading={feedback_loading}
				/>
			)}

		</div>
	);
}
export default ListCard;
