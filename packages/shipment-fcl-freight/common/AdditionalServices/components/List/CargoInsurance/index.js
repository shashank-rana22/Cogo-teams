import { Button, Modal } from '@cogoport/components';
// import { useDebounceQuery, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
// import { Layout } from '@cogoport/ocean-modules';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useCreateSpotSearch from '../../../../../hooks/useCreateSpotSearch';
import useGetInsuranceCountrySupported from '../../../../../hooks/useGetInsuranceCountrySupported';
import useGetInsuranceListCommodities from '../../../../../hooks/useGetInsuranceListCommodities';
import useGetInsuranceRate from '../../../../../hooks/useGetInsuranceRate';

import controls from './controls';
// import EmptyState from './EmptyState';
// import Loading from './Loading';
// import PremiumRate from './PremiumRate';
import styles from './styles.modules.css';

const LABEL_MAPPING = {
	export   : 'Destination Location',
	import   : 'Origin Location',
	domestic : 'Select Country',
};

const TRANSIT_MODE_MAPPING = {
	fcl_freight : 'SEA',
	lcl_freight : 'SEA',
	air_freight : 'AIR',
	ftl_freight : 'ROAD',
	ltl_freight : 'ROAD',
};

const POLICY_TYPE_MAPPING = {
	export   : 'EXPORT',
	import   : 'IMPORT',
	domestic : 'INLAND',
};

function CargoInsurance({
	setAddCargoInsurance = () => {},
	setShowInsurance = () => {},
	showInsurance = false,
	data = {},
	refetch = () => {},
	primary_service = {},
	servicesList = [],
}) {
	const [commodity, setCommodity] = useState('');
	const [rateData, setRateData] = useState({});
	const [currentCargoInsurance, setCurrentCargoInsurance] = useState('');

	// const { query = '', debounceQuery } = useDebounceQuery();

	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const {
		origin_country_id = '',
		destination_country_id = '',
		service_type = '',
	} = primary_service;

	const refetchAfterApiCall = () => {
		setAddCargoInsurance(false);
		refetch();
	};

	// const trade_type = getTradeTypeByIncoTerm(data?.inco_term);

	// const cargoInsuranceCountryId =	trade_type === 'export'
	// 	? primary_service?.destination_port?.id : primary_service?.origin_port?.id;
	console.log({ primary_service, data });

	const { isEligible, loading: apiLoading } =	useGetInsuranceCountrySupported({
		country_id: '345f3aa9-ae78-40cf-b70a-fc5c3af2af99',
	});

	const transitMode = TRANSIT_MODE_MAPPING[service_type] || 'ROAD';

	const { handleAddCargoInsurance, cargoLoading } = useCreateSpotSearch({
		data,
		setAddCargoInsurance,
		rateData,
		commodity,
		transitMode,
		primary_service,
		// trade_type,
		refetch: refetchAfterApiCall,
	});

	const {
		premiumLoading: loading,
		premiumRate,
	} = useGetInsuranceRate({
		setRateData,
	});

	const { list = [] } = useGetInsuranceListCommodities();

	// const finalControls = controls({
	// 	locationLabel: LABEL_MAPPING[trade_type] || 'Select Country',
	// 	transitMode,
	// });

	// const {
	// 	control,
	// 	handleSubmit,
	// 	formState: { errors },
	// 	setValue,
	// 	watch,
	// } = useForm();

	// const cargoValue = watch('cargo_value');
	// const cargoValueCurrency = watch('cargo_value_currency');
	// const cargoInsuranceCommodityDescription = watch(
	// 	'cargo_insurance_commodity_description',
	// );
	// const cargoInsuranceCommodity = watch('cargo_insurance_commodity');
	// const formValues = watch();

	// useEffect(() => {
	// 	if (!isEmpty(cargoValue) && !isEmpty(cargoInsuranceCommodity)) {
	// 		setCurrentCargoInsurance({
	// 			descriptionOfCargo : cargoInsuranceCommodityDescription,
	// 			policyCommodityId  : cargoInsuranceCommodity,
	// 			invoiceValue       : cargoValue,
	// 			policyCurrency     : cargoValueCurrency,
	// 			policyType         : POLICY_TYPE_MAPPING[trade_type] || 'INLAND',
	// 			policyCountryId    : cargoInsuranceCountryId,
	// 			performedBy        : userId,
	// 		});
	// 	}
	// }, [JSON.stringify(formValues)]);

	// useEffect(() => {
	// 	debounceQuery(currentCargoInsurance);
	// }, [debounceQuery, currentCargoInsurance]);

	// useEffect(() => {
	// 	if (!isEmpty(query)) {
	// 		premiumRate(query);
	// 	}
	// }, [query]);

	// useEffect(() => {
	// 	const optionselected = (list || []).find(
	// 		(option) => option.id === cargoInsuranceCommodity,
	// 	);
	// 	setCommodity(optionselected?.commodity);
	// 	setValue(
	// 		'cargo_insurance_commodity_description',
	// 		optionselected?.cargoDescription,
	// 	);
	// }, [cargoInsuranceCommodity]);

	// if (apiLoading) {
	// 	return <Loading />;
	// }

	// if (
	// 	![origin_country_id, destination_country_id].includes(
	// 		GLOBAL_CONSTANTS.country_entity_ids.IN,
	// 	)
	// ) {
	// 	return <EmptyState reason="non_indian_search" />;
	// }

	// if (!isEligible) {
	// 	return <EmptyState reason="blocked_country" />;
	// }

	return (
		<Modal
			size="xl"
			// show={showInsurance}
			show
			onClose={() => setShowInsurance(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Add Cargo Insurance" />
			{/* <Modal.Body>
				<div className={styles.container}>
					<Layout controls={control} fields={finalControls} errors={errors} />

					{loading ? <Loading /> : null}

					{!isEmpty(rateData) && !loading ? (
						<PremiumRate rateData={rateData} />
					) : null}
				</div>
			</Modal.Body> */}
			<Modal.Footer>
				<Button
					disabled={loading || cargoLoading}
					loading={cargoLoading}
					onClick={() => setAddCargoInsurance(false)}
				>
					Cancel
				</Button>

				<Button
					// onClick={handleSubmit(handleAddCargoInsurance)}
					loading={cargoLoading}
					disabled={isEmpty(rateData)}
				>
					Save and proceed
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CargoInsurance;
