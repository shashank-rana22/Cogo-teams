import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import getCountryCode from '../../../helpers/getCountryCode';
import getCombinedServiceDetails from '../AdditionalServices/utils/getCombinedServiceDetails';
import AccordionView from '../common/AccordionView';
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

	const importer_exporter_country_code = getCountryCode({
		country_id: importer_exporter?.country_id || importer_exporter?.country?.id,
	});

	if (!(GLOBAL_CONSTANTS.cargo_insurance[importer_exporter_country_code] || []).includes(primary_service)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Other Services</div>

			<AccordionView
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
			>
				<AccordianContent data={cargoInsuranceAlreadyTaken} />
			</AccordionView>

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
					onClickDelete={onClickDelete}
					loading={loading}
					setShow={setShowDeleteModal}
					title={DELETE_TITLE}
				/>
			) : null}
		</div>
	);
}

export default CargoInsurance;
