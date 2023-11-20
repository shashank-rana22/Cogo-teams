import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetInsuranceCountrySupported from '../../../../../hooks/useGetInsuranceCountrySupported';
import useGetInsuranceRate from '../../../../../hooks/useGetInsuranceRate';
import useInsuranceSpotSearch from '../../../../../hooks/useInsuranceSpotSearch';

import getControl from './controls';
import EmptyState from './EmptyState';
import Loading from './Loading';
import PremiumRate from './PremiumRate';
import styles from './styles.module.css';

const geo = getGeoConstants();

function CargoInsurance({
	setShowModal = () => {},
	data = {},
	refetch = () => {},
	primary_service = {},
}) {
	const { destination_country_id	= '', origin_country_id = '' } = primary_service || {};

	const [commodity, setCommodity] = useState('');

	const controls = getControl({ setCommodity });

	const refetchAfterApiCall = () => {
		setShowModal(false);
		refetch();
	};

	const {
		premiumLoading: loading, premiumData, formhook,
	} = useGetInsuranceRate({ primary_service, commodity });

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = formhook;

	const { isEligible, loading: apiLoading } =	useGetInsuranceCountrySupported({
		destination_country_id,
		origin_country_id,
	});

	const { handleAddCargoInsurance, cargoLoading } = useInsuranceSpotSearch({
		shipmentData : data,
		rateData     : premiumData,
		refetch      : refetchAfterApiCall,
		commodity,
		primary_service,
	});

	if (apiLoading) {
		return <Loading />;
	}

	if (![destination_country_id, origin_country_id].includes(geo.country.id)) {
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
