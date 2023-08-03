import { Button, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcCWaitForTimeSlots, IcMArrowDoubleRight, IcCFtick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRef, useEffect, useContext } from 'react';

import { CheckoutContext } from '../../../../../../context';
import useUpdateCheckoutMargin from '../../../../../../hooks/useUpdateCheckoutMargin';
import handleTimer from '../../../../../../utils/handleTimer';
import { transformMargins } from '../../../../../../utils/transformMargins';

import styles from './styles.module.css';
import TotalCost from './TotalCost';

const SECOND_TO_MILLISECOND = 1000;

function SubmitButton({ rate = {}, quotation_email_sent_at = '' }) {
	return (
		<div className={styles.flex}>
			Save Margin And Proceed

			{quotation_email_sent_at ? <TotalCost rate={rate} /> : null}

			<IcMArrowDoubleRight style={{ marginLeft: '6px' }} width={14} height={14} />
		</div>
	);
}

function SaveButton({ state = '' }) {
	if (state === 'save_for_later') {
		return (
			<div className={styles.flex} style={{ justifyContent: 'space-between' }}>
				Saved
				{' '}
				<IcCFtick width={20} height={20} style={{ marginLeft: '24px' }} />
			</div>
		);
	}
	return 'Save For Later';
}

function EditMarginFooter({
	updateCheckout = () => {},
	updateLoading = false,
	noRatesPresent = false,
	loading = false,
	rateDetails = [],
	convenienceDetails = {},
	convenience_line_item = {},
	state = '',
}) {
	const { push } = useRouter();

	const { detail = {}, rate } = useContext(CheckoutContext);

	const timerRef = useRef(null);

	const {
		validity_end,
		id = '',
		quotation_email_sent_at = '',
	} = detail;

	const { convenience_fee_billing_service, adjust_convenience_fee } = convenience_line_item;

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	const {
		updateCheckoutMargin,
		loading: updateCheckoutMarginLoading,
	} = useUpdateCheckoutMargin();

	const updateQuotation = async () => {
		try {
			const marginValues = rateDetails.reduce((acc, curr) => {
				const { id: currId = '', line_items = [] } = curr;

				const serviceFilteredMargins = line_items.map((lineItem) => {
					const { filteredMargins = {} } = lineItem || {};

					return filteredMargins;
				});

				return {
					...acc,
					[currId]: serviceFilteredMargins,
				};
			}, {});

			const updatedMargins = transformMargins({
				values   : marginValues,
				services : rate?.services,
				detail,
			});

			const FINAL_MARGINS = {};

			Object.keys(updatedMargins).forEach((service) => {
				if (rate?.services?.[service]) {
					FINAL_MARGINS[service] = updatedMargins[service];
				}
			});

			const finalPayload = {
				convenience_rate: {
					...convenienceDetails.convenience_rate,
					convenience_fee_billing_service,
					adjust_convenience_fee,
				},
				checkout_id                             : id,
				margins                                 : FINAL_MARGINS,
				is_applicable_for_approval_confirmation : false,
			};

			await updateCheckoutMargin({ finalPayload });

			updateCheckout({
				values: {
					id,
					state: 'locked',
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

	const MAPPING = [
		{
			label     : <SaveButton state={state} />,
			themeType : 'secondary',
			size      : 'lg',
			key       : 'save_for_later',
			onClick   : onClickSaveForLater,
			loading   : updateLoading,
			disabled  : loading || updateCheckoutMarginLoading || state === 'save_for_later',
		},
		{
			label     : <SubmitButton rate={rate} quotation_email_sent_at={quotation_email_sent_at} />,
			themeType : 'accent',
			size      : 'lg',
			loading   : updateLoading || loading || updateCheckoutMarginLoading,
			disabled  : noRatesPresent,
			style     : { marginLeft: '16px' },
			key       : 'place_booking',
			onClick   : updateQuotation,
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

export default EditMarginFooter;
