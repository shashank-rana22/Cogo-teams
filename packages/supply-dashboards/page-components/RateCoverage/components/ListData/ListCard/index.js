/* eslint-disable max-lines-per-function */
import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { SERVICE_ICON_MAPPING } from '../../../configurations/helpers/constants';
import useGetShipment from '../../../hooks/useGetShipment';
import useGetSpoetSearches from '../../../hooks/useGetSpoetSearches';
import useListFreightRateFeedBacks from '../../../hooks/useListFreightRateFeedBacks';
import useListFreightRateRequests from '../../../hooks/useListFreightRateRequests';

import AddRateModal from './AddRateModal';
import CardContent from './CardContent';
import CloseModal from './CloseModal';
import DetailsView from './DetailsView';
import ServicesDetails from './ServicesDetails';
import styles from './styles.module.css';
import UpdateSMTUser from './UpdateUser';

function ListCard({
	data = {}, getListCoverage = () => {}, filter = {}, getStats = () => {},
}) {
	const source = data?.sources?.[0];
	const [showCloseModal, setShowCloseModal] = useState(false);
	const [serviceIdPresent, setServiceIdPresent] = useState('');
	const [showAddRateModal, setShowAddRateModal] = useState(false);
	const [updateUser, setUpdateUser] = useState(false);

	const [showPopover, setShowPopover] = useState(false);
	const {
		sources = [], container_size = '', container_type,
		commodity = '', weight_slabs = '', stacking_type = '', price_type = '', source_id = '',
		origin_port = '',
		origin_airport = '',
		port = '',
		origin_location = '',
		location = '',
		airport = '',
		destination_port = '',
		destination_airport = '',
		destination_location = '',
		shipment_id = '',
		reverted_status = '',
		shipment_serial_id = '',
		serial_id = '',
		assigned_to = {},
		service_provider = {},
		reverted_count,
		cargo_handling_type,
	} = data;

	const {
		data:shipment_data, getShipment = () => {},
		shipment_loading = false,
	} =	 useGetShipment({ shipment_id });

	const { data:requestData, getRequest, loading:request_loading } = useListFreightRateRequests({ source_id, filter });
	const {
		data:feedbackData, getFeedback,
		loading: feedback_loading,
	}	= 	useListFreightRateFeedBacks({ source_id, filter });

	const {
		serviceList, getData, spot_data,
		loadingSpotSearch,
	} = useGetSpoetSearches({ feedbackData, requestData, showPopover });

	let filterServiceList = serviceList.filter(
		(item) => item.service_type === filter?.service,
	);
	filterServiceList = ['fcl_freight', 'air_freight'].includes(filter?.service)
		? serviceList
		: filterServiceList;

	const originCode = (origin_port || origin_airport || port || origin_location || location)?.port_code;

	const originName = (origin_port || origin_airport || port || origin_location || location || airport)?.name;

	const destinationCode = (destination_port || destination_airport || destination_location)?.port_code;

	const destinationName = (destination_port || destination_airport || destination_location)?.name;

	const service = filter?.service;

	const ITEM_LIST = [
		{ id: 1, label: commodity && startCase(commodity) },
		{ id: 2, label: container_size && `${container_size}ft` },
		{ id: 3, label: container_type && startCase(container_type) },
		{ id: 4, label: weight_slabs && startCase(weight_slabs) },
		{ id: 5, label: stacking_type && startCase(stacking_type) },
		{ id: 6, label: price_type && `Price Type : ${startCase(price_type)}` },
		{ id: 7, label: cargo_handling_type && startCase(cargo_handling_type) },
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
			<div className={styles.revert}>
				{!isEmpty(reverted_count) && (
					<Pill size="sm" color="green">
						{' '}
						{reverted_count}
						{' '}
						Reverts
					</Pill>
				)}
			</div>
			<div className={styles.details_content}>
				{['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
			&& (
				<div>
					<div className={styles.head}>
						{data?.updated_at && (
							<div style={{ display: 'flex' }}>
								{!isEmpty(shipment_serial_id) && 	(
									<div className={styles.pill}>
										Shipment Id:
										{' '}
										{shipment_serial_id}
									</div>
								)}
								<div className={styles.pill}>
									TID:
									{' '}
									{serial_id}
								</div>
								<div className={styles.pill}>
									<div>
										Assigned to:
										{' '}
										{assigned_to?.name}
										<IcMEdit
											onClick={() => setUpdateUser(!updateUser)}
											style={{ margin: '-2px 6px', cursor: 'pointer' }}
										/>
									</div>
								</div>
								<div className={styles.pill}>
									Supplier :
									{' '}
									{service_provider?.business_name || service_provider?.name}
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
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType : 'dateTime',
									separator  : '/',
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
							{(data?.shipping_line?.short_name || data?.airline?.short_name) && (
								<div>
									<Pill size="md" color="orange">
										{(filter?.service === 'air_freight' || filter?.service === 'air_customs')
											? 'Preferred Air Line :' : ' Preferred Shipping Line :'}
										{' '}
										{filter?.service === 'air_freight' || filter?.service === 'air_customs'
											? data?.airline?.short_name : data?.shipping_line?.short_name }
									</Pill>
								</div>
							)}
							{reverted_status
							&& (
								<Pill size="md" color="green">
									Reverted Status :
									{' '}
									{startCase((reverted_status === 'reverted'
									|| reverted_status === 'completed') ? 'reverted' : 'not reverted')}
								</Pill>
							)}
						</div>
					</div>
				</div>
			)}

				{['critical_ports', 'expiring_rates', 'cancelled_shipments']?.includes(source)
			&& (
				<CardContent data={data} filter={filter} service={service} />
			)}

				<div className={styles.footer}>

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

					<div className={styles.vertical_line} />

					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div className={styles.tags_container}>
							{(ITEM_LIST || [])?.map((val) => (
								<div key={val?.id}>
									{ val?.label
									&& (
										<Pill>
											{val?.label}
										</Pill>
									)}
								</div>
							))}
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
					</div>
					<div className={styles.vertical_line} />
					<div className={styles.button_grp}>
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
							size="md"
							style={{ marginLeft: '16px', padding: '10px' }}
							onClick={handleAddRate}
							disabled={(['rate_feedback', 'rate_request']?.includes(source)
							&& (reverted_status === 'reverted' || reverted_status === 'completed'))
							|| reverted_status === 'reverted'}
						>
							{filter?.status !== 'completed' ? 'Add Rate' : 'Edit Rate'}
						</Button>

					</div>
				</div>
				<div className={styles.services}>
					{['rate_feedback', 'rate_request'].includes(source) && (
						<ServicesDetails
							data={data}
							source={source}
							filter={filter}
							setShowAddRateModal={setShowAddRateModal}
							serviceIdPresent={serviceIdPresent}
							setServiceIdPresent={setServiceIdPresent}
							getRequest={getRequest}
							requestData={requestData}
							serviceList={filterServiceList}
							loadingSpotSearch={loadingSpotSearch}
							spot_data={spot_data}
							showServicePopover={showPopover}
							setShowServicePopover={setShowPopover}
							source_id={source_id}
							feedbackData={feedbackData}
							getFeedback={getFeedback}
							feedback_loading={feedback_loading}
						/>
					)}
				</div>
			</div>

			{['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
								&& (
									<DetailsView
										data={data}
										source={source}
										filter={filter}
										shipment_loading={shipment_loading}
										request_loading={request_loading}
										feedback_loading={feedback_loading}
										shipment_data={shipment_data}
										requestData={requestData}
										feedbackData={feedbackData}
										getShipment={getShipment}
										getFeedback={getFeedback}
										getRequest={getRequest}
										source_id={source_id}
									/>
								)}

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
					shipment_data={shipment_data}
					requestData={requestData}
					feedbackData={feedbackData}
					shipment_loading={shipment_loading}
					request_loading={request_loading}
					feedback_loading={feedback_loading}
					serviceIdPresent={serviceIdPresent}
					setServiceIdPresent={setServiceIdPresent}
					spot_data={spot_data}
					getData={getData}
				/>
			)}

			{updateUser && (
				<UpdateSMTUser
					updateUser={updateUser}
					setUpdateUser={setUpdateUser}
					filter={filter}
					getListCoverage={getListCoverage}
					data={data}
				/>
			)}

		</div>
	);
}
export default ListCard;
