import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import getCombinedServiceDetails from '../AdditionalServices/utils/getCombinedServiceDetails';
import AccordianView from '../common/AccordianView';
import DeleteServiceModal from '../common/DeleteServiceModal';

import AccordianContent from './AccordianContent';
import CargoInsuranceContainer from './CargoInsuranceContainer';
import CargoInsuranceModal from './CargoInsuranceModal';
import useDeleteCargoInsurance from './CargoInsuranceModal/hooks/useDeleteCargoInsurance';
import styles from './styles.module.css';

const DELETE_TITLE = `Customers have lost around $10 billion worth of goods in just last 1 
year due to various reasons. We recommend keeping your cargo insurance.`;

const isCargoInsurancePresent = (services) => {
	const isAlreadyPresent = Object.values(services || {}).find(
		(item) => item.service_type === 'cargo_insurance',
	);

	return isAlreadyPresent;
};

function CargoInsurance({ data = {}, refetch = () => {}, rateCardData = {} }) {
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [active, setActive] = useState('');

	const primary_service = data?.search_type || data?.primary_service;

	const {
		spot_search_id = '',
		checkout_id = '',
		service_details = {},
		importer_exporter_id = '',
		trade_type = '',
		importer_exporter = {},
		user_id = '',
	} = data || {};

	const finalServiceDetails = getCombinedServiceDetails(service_details, rateCardData.service_rates);

	const { loading, handleDelete } = useDeleteCargoInsurance({
		service_details,
		checkout_id,
		spot_search_id,
		setShow: setShowDeleteModal,
		refetch,
	});

	const cargoInsuranceAlreadyTaken = isCargoInsurancePresent(finalServiceDetails);

	const primaryServiceDetails = Object.values(finalServiceDetails || {}).find(
		(item) => item.service_type === primary_service,
	);

	const service_type = primaryServiceDetails?.service_type || primary_service;

	const { destination_country_id = '', origin_country_id = '' } = primaryServiceDetails || {};

	const onClickDelete = async () => { await handleDelete(); };

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Other Services</div>

			<AccordianView
				itemKey="cargo_insurance"
				active={active}
				setActive={setActive}
				isOpen={!!(cargoInsuranceAlreadyTaken && !isEmpty(cargoInsuranceAlreadyTaken))}
				title={(
					<CargoInsuranceContainer
						cargoInsuranceDetails={cargoInsuranceAlreadyTaken}
						setShowDeleteModal={setShowDeleteModal}
						setShowModal={setShowModal}
					/>
				)}
				content={<AccordianContent data={cargoInsuranceAlreadyTaken} />}
			/>

			{showModal && (
				<CargoInsuranceModal
					destination_country_id={destination_country_id}
					origin_country_id={origin_country_id}
					trade_type={trade_type}
					importer_exporter_id={importer_exporter_id || importer_exporter?.id}
					user_id={user_id}
					service_type={service_type}
					spot_search_id={spot_search_id}
					refetch={refetch}
					importer_exporter={importer_exporter}
					addCargoInsurance={showModal}
					setAddCargoInsurance={setShowModal}
					// setDone={setIsSelected}
					checkout_id={checkout_id}
				/>
			)}

			{showDeleteModal ? (
				<DeleteServiceModal
					service_name="cargo_insurance"
					show={showDeleteModal}
					onClick={onClickDelete}
					loading={loading}
					setShow={setShowDeleteModal}
					title={DELETE_TITLE}
				/>
			) : null}
		</div>
	);
}

export default CargoInsurance;
