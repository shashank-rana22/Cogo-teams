import { Button, Modal } from '@cogoport/components';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
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
import POLICY_TYPE_MAPPING from './utils/policyTypeMapping.json';

const geo = getGeoConstants();

function CargoInsurance({
	setShowModal = () => {},
	data = {},
	refetch = () => {},
	primary_service = {},
}) {
	const [commodity, setCommodity] = useState('');
	const [currentCargoInsurance, setCurrentCargoInsurance] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const refetchAfterApiCall = () => {
		setShowModal(false);
		refetch();
	};

	const {
		premiumLoading: loading, premiumData,
		premiumRate,
	} = useGetInsuranceRate();

	const cargoInsuranceCountryId =	primary_service?.trade_type === 'export'
		? primary_service?.destination_port?.country_id : primary_service?.origin_port?.country_id;

	const { isEligible, loading: apiLoading } =	useGetInsuranceCountrySupported({
		country_id: cargoInsuranceCountryId,
	});

	const { handleAddCargoInsurance, cargoLoading } = useCreateSpotSearch({
		shipmentData           : data,
		rateData               : premiumData,
		commodity,
		transitMode            : 'SEA',
		origin_country_id      : primary_service?.origin_port?.country_id,
		destination_country_id : primary_service?.destination_port?.country_id,
		trade_type             : primary_service?.trade_type,
		refetch                : refetchAfterApiCall,
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

	useEffect(() => {
		if (!isEmpty(formValues?.cargo_value) && !isEmpty(formValues?.cargo_insurance_commodity)) {
			setCurrentCargoInsurance({
				descriptionOfCargo : formValues?.cargo_insurance_commodity_description,
				policyCommodityId  : formValues?.cargo_insurance_commodity,
				invoiceValue       : formValues?.cargo_value,
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
			(option) => option.id === formValues?.cargo_insurance_commodit,
		);
		setCommodity(optionselected?.commodity);
		setValue(
			'cargo_insurance_commodity_description',
			optionselected?.cargoDescription,
		);
	}, [formValues?.cargo_insurance_commodit, list, setValue]);

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
					onClick={handleSubmit(handleAddCargoInsurance)}
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
