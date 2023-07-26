import { Button, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useRef, useEffect } from 'react';

import handleTimer from '../../utils/handleTimer';

import styles from './styles.module.css';

const SECOND_TO_MILLISECOND = 1000;

function PreviewBookingFooter({
	detail = {},
	updateCheckout = () => {},
	updateLoading = false,
	isVeryRisky = false,
	agreeTandC = false,
	cargoDetails = {},
	additionalRemark = '',
}) {
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

		try {
			await triggerUpdateCheckoutService({
				data: {
					id,
					update_rates                    : false,
					service                         : primary_service,
					fcl_freight_services_attributes : primaryServicesArray.map(
						({ id: service_id }) => {
							const { cargo_readiness_date = '', cargo_value = '' } = cargoDetails || {};

							return {
								id                   : service_id,
								cargo_readiness_date : cargo_readiness_date || undefined,
								cargo_value          : Number(cargo_value) || undefined,
							};
						},
					),
				},
			});

			updateCheckout({
				values: {
					id,
					state                           : 'booking_confirmation',
					margin_approval_request_remarks : additionalRemark
						? [additionalRemark]
						: undefined,
				},
			});
		} catch (error) {
			const { config = {} } = error.response;

			const { url = '' } = config;
			Toast.error(`${getApiErrorString(error.response?.data)} in ${url}`);
		}
	};

	const MAPPING = [
		{
			label     : 'Save For Later',
			themeType : 'secondary',
			size      : 'lg',
			key       : 'save_for_later',
			disabled  : updateLoading || updateCheckoutServiceLoading,
		},
		{
			label     : 'Select Invoicing Parties',
			themeType : 'primary',
			size      : 'lg',
			loading   : updateLoading || updateCheckoutServiceLoading,
			disabled  : isVeryRisky || !agreeTandC,
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
