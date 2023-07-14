import { Button, Modal } from '@cogoport/components';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import controls from './controls';
import EmptyState from './EmptyState';
import Form from './Form';
import isCargoInsuranceApplicable from './helpers/isCargoInsuranceApplicable';
import useAddCargoInsurance from './hooks/useAddCargoInsurance';
import useGetInsuranceCountrySupported from './hooks/useGetInsuranceCountrySupported';
import useGetInsuranceListCommodities from './hooks/useGetInsuranceListCommodities';
import useGetInsuranceRate from './hooks/useGetInsuranceRate';
import InvalidInvoicingPartyEmptyState from './InvalidInvoicingPartyEmptyState';
import Loading from './Loading';
import POLICY_TYPE_MAPPING from './utils/policy-type-mapping.json';
import TRANSIT_MODE_MAPPING from './utils/transit-mode-mapping.json';

function CargoInsurance({
	addCargoInsurance = false,
	setAddCargoInsurance = () => {},
	origin_country_id = '',
	destination_country_id = '',
	service_type = '',
	trade_type = '',
	user_id = '',
	checkout_id = '',
	refetch = () => {},
	spot_search_id = '',
	importer_exporter_id = '',
	importer_exporter = {},
	allowCargoInsurance = true,
	setShowAddInvoicingParty = () => {},
	setDone = () => {},
}) {
	const [commodity, setCommodity] = useState('');
	const [rateData, setRateData] = useState({});

	const { query = '', debounceQuery } = useDebounceQuery();

	const cargoInsuranceCountryId = trade_type === 'export' ? destination_country_id : origin_country_id;

	const { isEligible, loading: countrySupportedLoading } = useGetInsuranceCountrySupported(cargoInsuranceCountryId);

	const { list = [] } = useGetInsuranceListCommodities();

	const { getCargoInsruanceRate, loading = '' } = useGetInsuranceRate({ setRateData });

	const transitMode = TRANSIT_MODE_MAPPING[service_type] || 'ROAD';

	const importer_exporter_country_id = importer_exporter?.country_id || importer_exporter?.country?.id;

	const { control, watch, formState:{ errors }, setValue, handleSubmit } = useForm();

	const {
		cargo_value: cargoValue,
		cargo_value_currency: cargoValueCurrency,
		cargo_insurance_commodity_description: cargoInsuranceCommodityDescription,
		cargo_insurance_commodity: cargoInsuranceCommodity,
	} = watch();

	useEffect(() => {
		debounceQuery(cargoValue);
	}, [cargoValue, debounceQuery]);

	useEffect(() => {
		const optionselected = (list || []).find(
			(option) => option.id === cargoInsuranceCommodity,
		);

		setCommodity(optionselected?.commodity);

		setValue(
			'cargo_insurance_commodity_description',
			optionselected?.cargoDescription,
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cargoInsuranceCommodity, setValue]);

	useEffect(() => {
		if (query && !isEmpty(cargoInsuranceCommodity)) {
			getCargoInsruanceRate({
				performedBy        : importer_exporter_id,
				policyType         : POLICY_TYPE_MAPPING[trade_type] || 'INLAND',
				trade_type,
				descriptionOfCargo : cargoInsuranceCommodityDescription,
				policyCommodityId  : cargoInsuranceCommodity,
				invoiceValue       : query,
				policyCountryId    : cargoInsuranceCountryId,
				policyCurrency     : cargoValueCurrency,
			});
		} else {
			setRateData({});
		}
	}, [cargoInsuranceCommodity, cargoInsuranceCommodityDescription, cargoInsuranceCountryId,
		cargoValueCurrency, getCargoInsruanceRate, importer_exporter_id, query, trade_type]);

	const { handleAddCargoInsurance, addCargoLoading } = useAddCargoInsurance({
		spot_search_id,
		origin_country_id,
		destination_country_id,
		service_type,
		trade_type,
		user_id,
		checkout_id,
		refetch,
		setAddCargoInsurance,
		setDone,
		rateData,
		commodity,
		transitMode,
	});

	const { is_applicable = true, type = '' } = isCargoInsuranceApplicable({
		importer_exporter_country_id,
		origin_country_id,
		destination_country_id,
		trade_type,
	});

	const COMPONENT_MAPPING = {
		loading: {
			Component : Loading,
			props     : {},
		},
		not_eligible: {
			Component : EmptyState,
			props     : {
				reason: 'blocked_country',
			},
		},
		not_applicable: {
			Component : EmptyState,
			props     : {
				reason: type,
			},
		},
		not_allowed: {
			Component : InvalidInvoicingPartyEmptyState,
			props     : {
				importer_exporter_country_id,
				setAddCargoInsurance,
				setShowAddInvoicingParty,
			},
		},
		allowed: {
			Component : Form,
			props     : {
				control,
				controls,
				errors,
				loading,
				rateData,
			},
		},
	};

	const getComponent = () => {
		let key = 'allowed';
		if (countrySupportedLoading) {
			key = 'loading';
		} else if (!isEligible) {
			key = 'not_eligible';
		} else if (!is_applicable) {
			key = 'not_applicable';
		} else if (!allowCargoInsurance) {
			key = 'not_allowed';
		}
		return key;
	};

	const activeComponent = getComponent();

	const { Component: ActiveComponent, props } = COMPONENT_MAPPING[activeComponent];

	return (
		<Modal
			size={['allowed', 'not_allowed'].includes(activeComponent) ? 'md' : 'sm'}
			show={addCargoInsurance}
			onClose={() => setAddCargoInsurance(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Add Cargo Insurance" />

			<Modal.Body>
				<ActiveComponent {...props} />
			</Modal.Body>

			{activeComponent === 'allowed' ? (
				<Modal.Footer>
					<Button
						type="button"
						themeType="secondary"
						disabled={loading || addCargoLoading}
						onClick={() => setAddCargoInsurance(false)}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: 12 }}
						themeType="primary"
						loading={addCargoLoading}
						disabled={isEmpty(rateData) || loading || addCargoLoading}
						onClick={handleSubmit(handleAddCargoInsurance)}
					>
						Save and proceed
					</Button>
				</Modal.Footer>
			) : null}

		</Modal>
	);
}

export default CargoInsurance;
