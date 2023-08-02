import { Breadcrumb, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import Header from '../../../common/Header';
import { LoadingState } from '../commons/LoadingState';
import DotLoader from '../commons/LoadingState/DotLoader';
import { CheckoutContext } from '../context';
import getRedirectionDetails from '../utils/getRedirectionDetails';

import styles from './styles.module.css';
import useCheckout from './useCheckout';

function Checkout({ checkout_type = '' }) {
	const { query, entity_types, partner_id } = useSelector(({ general, profile }) => ({
		query        : general?.query,
		entity_types : profile?.partner?.entity_types,
		partner_id   : profile?.partner?.id,
	}));

	const {
		resultsUrl = '',
		serviceDiscoveryUrl = '',
		checkoutData = {},
		state = '',
		BREADCRUMB_MAPPING = {},
		MAPPING = {},
		data = {},
		loading = false,
		primary_service = '',
		detail = {},
		headerProps = {},
		search_id = '',
		importer_exporter_id = '',
		isShipmentCreated = false,
		setIsShipmentCreated = () => {},
		redirect_required,
	} = useCheckout({ query, entity_types, partner_id, checkout_type });

	if (loading && isEmpty(data)) {
		return <LoadingState />;
	}

	const { shipment_id = '', tags = [] } = detail;

	const isCheckoutApiSuccess = !isEmpty(data);
	const isServiceSupported = GLOBAL_CONSTANTS.s2c_supported_services.includes(primary_service);

	if (!isCheckoutApiSuccess || !isServiceSupported || shipment_id || !tags.includes('new_admin')) {
		const { url = '', message = '' } = getRedirectionDetails({
			isCheckoutApiSuccess,
			partner_id,
			search_id,
			importer_exporter_id,
			tags,
			checkout_id: detail.id,
			shipment_id,
			redirect_required,
		});

		window.location.replace(url);

		return (
			<div className={styles.spinner_container}>
				<DotLoader />
				<div className={styles.text}>{message}</div>
			</div>
		);
	}

	if (isShipmentCreated) {
		return (
			<div className={styles.spinner_container}>
				<DotLoader />
				<div className={styles.text}>The shipment is booked, you are being redirected to shipment page</div>
			</div>
		);
	}

	const ActiveComponent = MAPPING[primary_service];

	if (!ActiveComponent) {
		return null;
	}

	const showAdditionalHeader = headerProps && !isEmpty(headerProps);

	return (
		<CheckoutContext.Provider value={checkoutData}>
			<div className={styles.container}>
				<Header
					data={detail}
					service_key="primary_service"
					activePage="checkout"
					loading={loading}
					headerProps={headerProps}
					showAdditionalHeader={showAdditionalHeader}
				/>

				<Breadcrumb className={styles.breadcrumb}>
					<Breadcrumb.Item
						label={<a className={styles.link} href={serviceDiscoveryUrl}>Service Discovery</a>}
					/>

					<Breadcrumb.Item label={(<a className={styles.link} href={resultsUrl}>Results</a>)} />

					{Object.entries(BREADCRUMB_MAPPING).map(([key, value]) => (
						<Breadcrumb.Item
							key={key}
							className={cl`${styles.Breadcrumb_item} ${key === state && styles.active}`}
							label={value}
						/>
					))}
				</Breadcrumb>

				<ActiveComponent
					state={state}
					setIsShipmentCreated={setIsShipmentCreated}
				/>
			</div>
		</CheckoutContext.Provider>
	);
}

export default Checkout;
