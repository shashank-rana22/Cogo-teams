import { Button, Modal } from '@cogoport/components';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
import { Layout } from '@cogoport/ocean-modules';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useCreateSpotSearch from '../../../../../hooks/useCreateSpotSearch';
import useGetInsuranceCountrySupported from '../../../../../hooks/useGetInsuranceCountrySupported';
import useGetInsuranceListCommodities from '../../../../../hooks/useGetInsuranceListCommodities';
import useGetInsuranceRate from '../../../../../hooks/useGetInsuranceRate';

import EmptyState from './EmptyState';
import getControls from './getControls';
import Loading from './Loading';
import PremiumRate from './PremiumRate';
import styles from './styles.module.css';
import POLICY_TYPE_MAPPING from './utils/policyTypeMapping.json';

function CargoInsurance({
	setShowModal = () => {},
	data = {},
	refetch = () => {},
	primary_service = {},
}) {
	const { user } = useSelector((state) => state?.profile);
	const geo = getGeoConstants();

	const [commodity, setCommodity] = useState('');
	const [currentCargoInsurance, setCurrentCargoInsurance] = useState('');

	const { origin_country_id, destination_country_id } = primary_service || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	const { id: userId } = user || {};

	const refetchAfterApiCall = () => {
		setShowModal(false);
		refetch();
	};

	const {
		premiumLoading: loading, premiumData,
		premiumRate,
	} = useGetInsuranceRate();

	const trade_type = getTradeTypeByIncoTerm(data?.inco_term);
	const cargoInsuranceCountryId =	trade_type === 'export' ? destination_country_id : origin_country_id;

	const { isEligible, loading: apiLoading } =	useGetInsuranceCountrySupported({
		country_id: cargoInsuranceCountryId,
	});

	const { onAddService, loading: cargoLoading } = useCreateSpotSearch({
		shipment_data : data,
		primary_service,
		service       : {
			service_type: 'cargo_insurance_service',
			trade_type,
		},
		refetch: refetchAfterApiCall,
	});

	const { list = [] } = useGetInsuranceListCommodities();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm();

	const formValues = watch();
	const controls = getControls();

	const handleClick = () => {
		const payload = {
			rateData    : premiumData,
			commodity,
			transitMode : 'SEA',
			origin_country_id,
			destination_country_id,
			trade_type,
			...formValues,
		};
		onAddService(payload);
	};

	useEffect(() => {
		if (!isEmpty(formValues?.cargo_value) && !isEmpty(formValues?.cargo_insurance_commodity)) {
			setCurrentCargoInsurance({
				descriptionOfCargo : formValues?.cargo_insurance_commodity_description,
				policyCommodityId  : formValues?.cargo_insurance_commodity,
				invoiceValue       : formValues?.cargo_value,
				policyCurrency     : formValues?.cargo_value_currency,
				policyType         : POLICY_TYPE_MAPPING[trade_type] || 'INLAND',
				policyCountryId    : cargoInsuranceCountryId,
				performedBy        : userId,
			});
		}
	}, [cargoInsuranceCountryId,
		formValues?.cargo_insurance_commodity, formValues?.cargo_insurance_commodity_description,
		formValues?.cargo_value, formValues?.cargo_value_currency, trade_type, userId]);

	useEffect(() => {
		debounceQuery(currentCargoInsurance);
	}, [debounceQuery, currentCargoInsurance]);

	useEffect(() => {
		if (!isEmpty(query)) {
			premiumRate(query);
		}
	}, [premiumRate, query]);

	useEffect(() => {
		const optionselected = (list || []).find(
			(option) => option.id === formValues?.cargo_insurance_commodity,
		);
		setCommodity(optionselected?.commodity);
		setValue(
			'cargo_insurance_commodity_description',
			optionselected?.cargoDescription,
		);
	}, [formValues?.cargo_insurance_commodity, list, setValue]);

	if (apiLoading) {
		return <Loading />;
	}

	if (
		![destination_country_id, origin_country_id].includes(geo.country.id)
	) {
		return <EmptyState reason="non_indian_search" />;
	}

	if (!isEligible) {
		return <EmptyState reason="blocked_country" />;
	}

	return (
		<Modal
			size="sm"
			showCloseIcon={!cargoLoading}
			show
			onClose={() => setShowModal(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Add Cargo Insurance" />
			<Modal.Body>
				<Layout control={control} fields={controls} errors={errors} />

				{loading ? <Loading /> : null}

				{!isEmpty(premiumData) && !loading ? (
					<PremiumRate rateData={premiumData} />
				) : null}
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					disabled={cargoLoading}
					loading={cargoLoading}
					onClick={() => setShowModal(false)}
				>
					Cancel
				</Button>

				<Button
					onClick={handleSubmit(handleClick)}
					loading={cargoLoading}
					disabled={cargoLoading || isEmpty(premiumData)}
					className={styles.btn_div}
				>
					Save and proceed
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CargoInsurance;
