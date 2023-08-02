import { useState } from 'react';

import CargoInsuranceModal from '../../../../../../../common/OtherServices/CargoInsurance/CargoInsuranceModal';

import Content from './Content';

function CargoModal({
	detail = {},
	cargoModal = 'progress',
	setCargoModal = () => {},
	refetch = () => {},
}) {
	const [showForm, setShowForm] = useState(false);

	const {
		service_details = {},
		importer_exporter_id = '',
		trade_type = '',
		service_type = '',
		spot_search_id = '',
		importer_exporter = {},
		user = {},
	} = detail || {};

	const primaryServiceDetailsData = Object.values(service_details || {}).find(
		(item) => item.service_type === service_type,
	);

	const { destination_country_id = '', origin_country_id = '' } = primaryServiceDetailsData;

	const { id: user_id = '' } = user || {};

	const setAddCargoInsurance = () => {
		setCargoModal('success');
		setShowForm(false);
	};

	const COMPONENT_MAPPING = {
		true: {
			component : CargoInsuranceModal,
			props     : {
				destination_country_id,
				origin_country_id,
				trade_type,
				importer_exporter_id : importer_exporter_id || importer_exporter?.id,
				user_id,
				service_type,
				spot_search_id,
				refetch,
				addCargoInsurance    : showForm,
				importer_exporter,
				setAddCargoInsurance,
			},
		},
		false: {
			component : Content,
			props     : {
				cargoModal,
				setCargoModal,
				setShowForm,
			},
		},
	};

	const { component:ActiveComponent, props } = COMPONENT_MAPPING[showForm];

	return (
		<ActiveComponent {...props} />
	);
}

export default CargoModal;
