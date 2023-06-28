import { Button, Modal } from '@cogoport/components';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
import { Layout } from '@cogoport/ocean-modules';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useCreateSpotSearch from '../../../../../hooks/useCreateSpotSearch';
import useGetInsuranceCountrySupported from '../../../../../hooks/useGetInsuranceCountrySupported';
import useGetInsuranceListCommodities from '../../../../../hooks/useGetInsuranceListCommodities';
import useGetInsuranceRate from '../../../../../hooks/useGetInsuranceRate';

import controls from './controls';
import EmptyState from './EmptyState';
import Loading from './Loading';
import PremiumRate from './PremiumRate';
import styles from './styles.module.css';
import LABEL_MAPPING from './utils/labelMapping';
import POLICY_TYPE_MAPPING from './utils/policyTypeMapping';
import TRANSIT_MODE_MAPPING from './utils/transitModeMapping';

function CargoInsurance({
	setAddCargoInsurance = () => {},
	setShowInsurance = () => {},
	showInsurance = false,
	data = {},
	refetch = () => {},
	primary_service = {},
}) {
	const [commodity, setCommodity] = useState('');
	const [currentCargoInsurance, setCurrentCargoInsurance] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const { service_type = '' } = primary_service;
	const geo = getGeoConstants();

	const refetchAfterApiCall = () => {
		setAddCargoInsurance(false);
		refetch();
	};

	const {
		premiumLoading: loading, premiumData,
		premiumRate,
	} = useGetInsuranceRate();

	const trade_type = getTradeTypeByIncoTerm(data?.inco_term);

	const cargoInsuranceCountryId =	trade_type === 'export'
		? primary_service?.destination_port?.country_id : primary_service?.origin_port?.country_id;

	const { isEligible, loading: apiLoading } =	useGetInsuranceCountrySupported({
		country_id: cargoInsuranceCountryId,
	});

	const transitMode = TRANSIT_MODE_MAPPING[service_type] || 'ROAD';

	const { handleAddCargoInsurance, cargoLoading } = useCreateSpotSearch({
		shipmentData           : data,
		setAddCargoInsurance,
		rateData               : premiumData,
		commodity,
		transitMode,
		origin_country_id      : primary_service?.origin_port?.country_id,
		destination_country_id : primary_service?.destination_port?.country_id,
		trade_type             : primary_service?.trade_type,
		refetch                : refetchAfterApiCall,
	});

	const { list = [] } = useGetInsuranceListCommodities();

	const finalControls = controls({
		locationLabel: LABEL_MAPPING[trade_type] || 'Select Country',
		transitMode,
	});
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm();

	const cargoValue = watch('cargo_value');
	const cargoInsuranceCommodity = watch('cargo_insurance_commodity');
	const formValues = watch();

	useEffect(() => {
		if (!isEmpty(cargoValue) && !isEmpty(cargoInsuranceCommodity)) {
			setCurrentCargoInsurance({
				descriptionOfCargo : formValues?.cargo_insurance_commodity_description,
				policyCommodityId  : cargoInsuranceCommodity,
				invoiceValue       : cargoValue,
				policyCurrency     : formValues?.cargo_value_currency,
				policyType         : POLICY_TYPE_MAPPING[primary_service?.trade_type] || 'INLAND',
				policyCountryId    : cargoInsuranceCountryId,
				performedBy        : userId,
			});
		}
	}, [JSON.stringify(formValues)]);

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
			(option) => option.id === cargoInsuranceCommodity,
		);
		setCommodity(optionselected?.commodity);
		setValue(
			'cargo_insurance_commodity_description',
			optionselected?.cargoDescription,
		);
	}, [cargoInsuranceCommodity, list, setValue]);

	if (apiLoading) {
		return <Loading />;
	}

	if (
		![primary_service?.destination_port?.country_id, primary_service?.origin_port?.country_id].includes(
			geo.country.id,
		)
	) {
		return <EmptyState reason="non_indian_search" />;
	}

	if (!isEligible) {
		return <EmptyState reason="blocked_country" />;
	}

	return (
		<Modal
			size="sm"
			show={showInsurance}
			onClose={() => setShowInsurance(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Add Cargo Insurance" />
			<Modal.Body>
				<div className={styles.container}>
					<Layout control={control} fields={finalControls} errors={errors} />

					{loading ? <Loading /> : null}

					{!isEmpty(premiumData) && !loading ? (
						<PremiumRate rateData={premiumData} />
					) : null}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					disabled={loading || cargoLoading}
					loading={cargoLoading}
					onClick={() => setAddCargoInsurance(false)}
				>
					Cancel
				</Button>

				<Button
					onClick={handleSubmit(handleAddCargoInsurance)}
					loading={cargoLoading}
					disabled={isEmpty(premiumData)}
					style={{ marginLeft: '16px' }}
				>
					Save and proceed
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CargoInsurance;
