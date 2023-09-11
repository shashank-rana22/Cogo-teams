import { AsyncSelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import controls from '../../../configurations/shipment-search-controls';
import useGetShipments from '../../../hooks/useGetShipments';

import CargoDetails from './CargoDetails';
import OrganizationShipment from './OrganizationShipment';
import PortDetails from './PortDetails';
import RevertedPriceMapping from './RevertedPriceMapping';
import styles from './styles.module.css';

const USER_ACTIVITIES = ['sales', 'support', 'cp_support', 'supply'];

const SERVICE_MAPPING = {
	supply              : 'service_type',
	shipment_specialist : 'shipment_type',
	last_revert_rate    : 'service_type',
	last_quotation      : 'service_type',
	last_shipment       : 'shipment_type',
	last_spot_search    : 'search_type',
};

const getFormatedData = ({ singleShipmentData = {} }) => {
	const { name = '', data = {} } = singleShipmentData || {};
	let updatedData = {};
	if (name === 'last_quotation' && !isEmpty(data)) {
		const { primary_service = '', services = {} } = data;
		updatedData = Object.values(services || {}).find(
			(service) => service?.service_type === primary_service || !service?.trade_type,
		);
	} else { updatedData = data; }

	return updatedData;
};

function QuotationDetails({ shipmentsData = {}, agentType = '' }) {
	const { control, watch } = useForm();

	const {
		shipmentLoading = false,
		shipmentData = {},
		getShipments = () => {},
	} = useGetShipments();
	const { list: shipmentList = [] } = shipmentData || {};

	const formValues = watch();

	const { serial_id = '', organization_id = '' } = formValues || {};

	const isNoFiltersApplicable = !serial_id && !organization_id;

	const userActivityFormatedData = Object.entries(shipmentsData || {}).map(([key, value]) => ({
		name : key,
		data : value,
	}));

	useEffect(() => {
		getShipments({ serial_id, organization_id });
	}, [serial_id, organization_id, getShipments]);

	if (isEmpty(shipmentsData)) {
		return null;
	}

	if ((USER_ACTIVITIES || []).includes(agentType)) {
		return (
			<div className={styles.container}>
				{(userActivityFormatedData || []).map((singleShipmentData) => {
					const { name = '' } = singleShipmentData || {};

					const updatedData = getFormatedData({ singleShipmentData });

					if (isEmpty(updatedData)) {
						return null;
					}

					return (
						<div key={updatedData?.id}>
							<div className={styles.title}>
								{startCase(name)}
							</div>
							<div className={styles.details}>
								<PortDetails serviceData={updatedData} service={SERVICE_MAPPING[name]} />
								<CargoDetails
									detail={name === 'last_revert_rate'
										? updatedData?.data : updatedData}
									service={SERVICE_MAPPING[name]}
								/>
								{name === 'last_revert_rate'
									? <RevertedPriceMapping updatedData={updatedData} /> : null }

								<div className={styles.activity_on}>
									{`${startCase(name)} At:`}
									<div className={styles.user_info}>
										{formatDate({
											date       : updatedData?.created_at || '-',
											formatType : 'date',
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
										})}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<>

			<div className={styles.select_container}>
				{(controls || []).map((item) => (
					<AsyncSelectController
						key={item?.name}
						{...item}
						control={control}
					/>
				))}
			</div>

			{isNoFiltersApplicable ? (
				<div className={styles.shipment_container}>
					{Object.entries(shipmentsData || {}).map(([key, value]) => (
						<div className={styles.container} key={key}>
							{!isEmpty(value) ?	<div className={styles.title}>{startCase(key)}</div> : null}
							{(value || []).map((singleItem) => (
								<div className={styles.details} key={singleItem?.id}>
									<div className={styles.sid_details}>
										SID :
										{' '}
										<span className={styles.sid}>
											{singleItem?.serial_id}
										</span>
										<div className={styles.agent_details}>
											Agent :
											{' '}
											<div className={styles.booking_agent}>
												{startCase(singleItem?.booking_agent?.name)}
											</div>
										</div>
									</div>
									<PortDetails serviceData={singleItem} service={SERVICE_MAPPING[agentType]} />
									<CargoDetails detail={singleItem} service={SERVICE_MAPPING[agentType]} />
								</div>
							))}
						</div>
					))}
				</div>
			) : <OrganizationShipment shipmentList={shipmentList} shipmentLoading={shipmentLoading} /> }

		</>
	);
}

export default QuotationDetails;
