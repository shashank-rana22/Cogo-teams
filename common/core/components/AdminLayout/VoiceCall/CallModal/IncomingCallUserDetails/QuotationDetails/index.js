import { Button } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMAppSearch } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import controls from '../../../configurations/shipment-search-controls';
import useGetShipments from '../../../hooks/useGetShipments';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

const USER_ACTIVITIES = ['sales', 'support', 'cp_support', 'supply'];

const SERVICE_MAPPING = {
	supply              : 'service_type',
	shipment_specialist : 'shipment_type',
	latest_revert_rate  : 'service_type',
	latest_quotation    : 'service_type',
	latest_shipment     : 'shipment_type',
	latest_spot_search  : 'search_type',
};

const getFormatedData = ({ singleShipmentData = {} }) => {
	const { name = '', data = {} } = singleShipmentData || {};
	let updatedData = {};
	if (name === 'latest_quotation' && !isEmpty(data)) {
		const { primary_service = '', services = {} } = data;
		updatedData = Object.values(services || {}).find(
			(service) => service?.service_type === primary_service || !service?.trade_type,
		);
	} else { updatedData = data; }

	return updatedData;
};

function QuotationDetails({ shipmentsData = {}, agentType = '' }) {
	const { handleSubmit, control, watch } = useForm();

	const {
		shipmentLoading = false,
		shipmentData = {},
		getShipments = () => {},
	} = useGetShipments();
	const formValues = watch();
	console.log('shipmentData:', shipmentData);
	const { serial_id = '', organization_id = '' } = formValues || {};

	const userActivityFormatedData = Object.entries(shipmentsData || {}).map(([key, value]) => ({
		name : key,
		data : value,
	}));

	if (isEmpty(shipmentsData)) {
		return null;
	}

	if ((USER_ACTIVITIES || []).includes(agentType)) {
		return (
			<div className={styles.container}>
				{(userActivityFormatedData || []).map((singleShipmentData) => {
					const { name = '', data = {} } = singleShipmentData || {};

					const updatedData = getFormatedData({ singleShipmentData });

					if (isEmpty(data)) {
						return null;
					}

					return (
						<div key={data?.id}>
							<div className={styles.title}>
								{startCase(name)}
							</div>
							<div className={styles.details}>
								<PortDetails serviceData={updatedData} service={SERVICE_MAPPING[name]} />
								<CargoDetails detail={updatedData} service={SERVICE_MAPPING[name]} />
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<>
			<div className={styles.shipment_container}>
				{Object.entries(shipmentsData || {}).map(([key, value]) => (
					<div className={styles.container} key={key}>
						{!isEmpty(value) ?	<div className={styles.title}>{startCase(key)}</div> : null}
						{(value || []).map((singleItem) => (
							<div className={styles.details} key={singleItem?.id}>
								<PortDetails serviceData={singleItem} service={SERVICE_MAPPING[agentType]} />
								<CargoDetails detail={singleItem} service={SERVICE_MAPPING[agentType]} />
							</div>
						))}
					</div>
				))}
			</div>

			<div className={styles.select_container}>
				<div>
					{(controls || []).map((item) => (
						<AsyncSelectController
							key={item?.name}
							{...item}
							control={control}
						/>

					))}
				</div>
				<Button
					size="md"
					themeType="primary"
					disabled={!serial_id || !organization_id}
					className={styles.search_button}
					onClick={handleSubmit(getShipments)}
				>
					<IcMAppSearch
						width={25}
						height={25}
					/>
				</Button>
			</div>

			<div className={styles.shipment_container}>

				{shipmentLoading ? <div className={styles.empty_state}>Loading...</div> : null}

				{!shipmentLoading ? (
					<>
						{([]).map((singleItem) => (
							<div className={styles.details} key={singleItem?.id}>
								<PortDetails serviceData={singleItem} service={SERVICE_MAPPING[agentType]} />
								<CargoDetails detail={singleItem} service={SERVICE_MAPPING[agentType]} />
							</div>
						))}
					</>
				) : null}

			</div>
		</>
	);
}

export default QuotationDetails;
