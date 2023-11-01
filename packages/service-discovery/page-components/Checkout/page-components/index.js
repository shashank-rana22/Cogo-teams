import { Breadcrumb, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCError, IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import Header from '../../../common/Header';
import { LoadingState } from '../../../common/LoadingState';
import CustomLoadingState from '../../../common/LoadingState/CustomLoadingState';
import DotLoader from '../../../common/LoadingState/DotLoader';
import { CheckoutContext } from '../context';
import getRedirectionDetails from '../utils/getRedirectionDetails';

import styles from './styles.module.css';
import useCheckout from './useCheckout';

function Checkout({ checkout_type = '' }) {
	const { query, partner_id } = useSelector(({ general, profile }) => ({
		query      : general?.query,
		partner_id : profile?.partner?.id,
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
		isShipmentCreated = false,
		setIsShipmentCreated = () => {},
		redirect_required,
		isLoadingStateRequired = false,
		setIsLoadingStateRequired = () => {},
		error = {},
	} = useCheckout({ query, partner_id, checkout_type });

	if ((loading && isEmpty(data))) {
		return <LoadingState />;
	}

	const { shipment_id = '', tags = [] } = detail;

	const isCheckoutApiSuccess = !isEmpty(data);
	const isServiceSupported = GLOBAL_CONSTANTS.new_search_supported_services.includes(primary_service);

	if (
		!isCheckoutApiSuccess
		|| !isServiceSupported
		|| (shipment_id && redirect_required === 'true')
		|| (!tags.includes('version2') && redirect_required === 'true')
	) {
		const { url = '', message = '', redirection = true, button_message = '' } = getRedirectionDetails({
			isCheckoutApiSuccess,
			partner_id,
			tags,
			checkout_id: detail.id,
			shipment_id,
			redirect_required,
			primary_service,
			error,
		});

		if (redirection) {
			window.location.replace(url);
		}

		return (
			<div className={styles.spinner_container}>
				{!redirection ? (
					<div
						role="presentation"
						onClick={() => window.location.replace(url)}
						className={styles.back_button}
					>
						<IcMArrowBack width={16} height={16} style={{ marginRight: '6px' }} />
						{button_message}
					</div>
				) : null}

				{redirection ? <DotLoader /> : (
					<div className={styles.flex}>
						<IcCError width={20} height={20} style={{ marginRight: '8px' }} />
						Error
					</div>
				)}
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
			<div className={cl`${styles.container} ${isLoadingStateRequired ? styles.disabled : null}`}>
				{isLoadingStateRequired ? <CustomLoadingState /> : null}

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

					{Object.entries(BREADCRUMB_MAPPING).map(([key, { label, onClickFunction, disabled }]) => (
						<Breadcrumb.Item
							key={key}
							className={cl`${styles.breadcrumb_item} ${key === state && styles.active}`}
							label={<div className={cl`${styles.link} ${disabled && styles.disabled}`}>{label}</div>}
							onClick={() => {
								if (!disabled) {
									setIsLoadingStateRequired(true);
									onClickFunction();
								}
							}}
						/>
					))}
				</Breadcrumb>

				<div className={styles.children}>
					<ActiveComponent
						state={state}
						setIsShipmentCreated={setIsShipmentCreated}
					/>
				</div>
			</div>
		</CheckoutContext.Provider>
	);
}

export default Checkout;
