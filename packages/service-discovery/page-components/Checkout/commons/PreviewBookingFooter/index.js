import { Button, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcCWaitForTimeSlots, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useRef, useEffect, useContext } from 'react';

import { CheckoutContext } from '../../context';
import handleTimer from '../../utils/handleTimer';

import styles from './styles.module.css';
import TotalCost from './TotalCost';

const SECOND_TO_MILLISECOND = 1000;

function SubmitButton({ rate = {} }) {
	return (
		<div className={styles.flex}>
			Select Invoicing Parties

			<TotalCost rate={rate} />

			<IcMArrowDoubleRight width={14} height={14} />
		</div>
	);
}

function PreviewBookingFooter({
	updateCheckout = () => {},
	updateLoading = false,
	isVeryRisky = false,
	agreeTandC = false,
	cargoDetails = {},
}) {
	const { push } = useRouter();

	const { detail = {}, rate } = useContext(CheckoutContext);

	const timerRef = useRef(null);

	const {
		validity_end,
		id = '',
		primary_service = '',
		services = {},
	} = detail;

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	const [{ loading :updateCheckoutServiceLoading }, triggerUpdateCheckoutService] = useRequest(
		{
			method : 'post',
			url    : '/update_checkout_service',
		},
		{ manual: true },
	);

	const handleNextButton = async () => {
		const primaryServicesArray = Object.values(services).filter(
			(item) => item.service_type === primary_service,
		);

		const {
			cargo_readiness_date = '',
			cargo_value = '',
			cargo_value_currency = '',
			commodity_category = '',
		} = cargoDetails || {};

		if (!cargo_readiness_date || !cargo_value || !cargo_value_currency || !commodity_category) {
			Toast.error('Please select cargo details');
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			return;
		}

		try {
			await triggerUpdateCheckoutService({
				data: {
					id,
					update_rates                    : false,
					service                         : primary_service,
					fcl_freight_services_attributes : primaryServicesArray.map(
						({ id: service_id }) => ({
							id                   : service_id,
							cargo_readiness_date : cargo_readiness_date || undefined,
							cargo_value          : Number(cargo_value) || undefined,
							cargo_value_currency : cargo_value_currency || undefined,
							commodity_category   : commodity_category || commodity_category,
						}),
					),
				},
			});

			updateCheckout({
				values: {
					id,
					state: 'booking_confirmation',
				},
				scrollToTop: true,
			});
		} catch (error) {
			const { config = {} } = error.response;

			const { url = '' } = config;
			Toast.error(`${getApiErrorString(error.response?.data)} in ${url}`);
		}
	};

	const onClickSaveForLater = () => {
		updateCheckout({ values: { id, state: 'save_for_later' }, refetchRequired: false });

		push(
			'/service_discovery',
			'/service_discovery',
		);
	};

	const disableButton = isVeryRisky || !agreeTandC
		|| (detail?.importer_exporter?.kyc_status !== 'verified'
			&& !detail?.importer_exporter?.skippable_checks?.includes('kyc'));

	const MAPPING = [
		{
			label     : 'Save For Later',
			themeType : 'secondary',
			size      : 'lg',
			key       : 'save_for_later',
			onClick   : onClickSaveForLater,
			loading   : updateLoading,
			disabled  : updateCheckoutServiceLoading,
		},
		{
			label     : <SubmitButton rate={rate} />,
			themeType : 'accent',
			size      : 'lg',
			loading   : updateLoading || updateCheckoutServiceLoading,
			disabled  : isVeryRisky || !agreeTandC || disableButton,
			style     : { marginLeft: '16px' },
			key       : 'place_booking',
			onClick   : handleNextButton,
		},
	];

	useEffect(() => {
		let time;

		if (!hasExpired) {
			const interval = setInterval(() => {
				time = handleTimer(validity_end);

				if (time) {
					timerRef.current.innerText = time;
				}
			}, SECOND_TO_MILLISECOND);

			if (!validity_end) {
				return () => clearInterval(interval);
			}
			return () => clearInterval(interval);
		}
		return () => {};
	}, [hasExpired, validity_end]);

	return (
		<div className={styles.container}>
			<div className={styles.validity_time}>
				{!hasExpired ? (
					<div className={styles.flex}>
						<IcCWaitForTimeSlots
							height={24}
							width={24}
							style={{ marginRight: '8px' }}
						/>
						Expires in
					</div>
				) : null}

				<span
					id="timer"
					className={hasExpired ? styles.hidden : styles.visible}
					ref={timerRef}
				/>

				<span style={{ fontWeight: 400, marginLeft: '4px', color: '#eb3425' }}>
					{hasExpired ? 'This Quotation has expired' : ''}
				</span>
			</div>

			<div className={styles.button_container}>
				{MAPPING.map((item) => {
					const { key, label, ...restProps } = item;

					if (hasExpired) {
						return null;
					}

					return (
						<Button key={key} {...restProps}>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default PreviewBookingFooter;
