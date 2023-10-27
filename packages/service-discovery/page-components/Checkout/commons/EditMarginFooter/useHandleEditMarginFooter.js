import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcCFtick, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect, useContext, useState } from 'react';

import { CheckoutContext } from '../../context';
import useUpdateCheckoutMargin from '../../hooks/useUpdateCheckoutMargin';
import handleTimer from '../../utils/handleTimer';
import { transformMargins } from '../../utils/transformMargins';

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

const useHandleEditMarginFooter = ({
	updateCheckout = () => {},
	updateLoading = false,
	loading = false,
	rateDetails = [],
	convenienceDetails = {},
	convenience_line_item = {},
	state = '',
}) => {
	const { push } = useRouter();

	const {
		detail = {},
		rate = {},
		handleUnlockLatestRate = () => {},
		createSearchLoading = false,
		isMobile = false,
		getCheckout = () => {},
	} = useContext(CheckoutContext);

	const timerRef = useRef(null);

	const [services, setServices] = useState([]);

	const {
		validity_end,
		id = '',
		quotation_email_sent_at = '',
		primary_service = '',
	} = detail;

	const { services: rateServices = {}, source: rateSource = '' } = rate || {};

	const { convenience_fee_billing_service, adjust_convenience_fee } = convenience_line_item;

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	const {
		updateCheckoutMargin,
		loading: updateCheckoutMarginLoading,
	} = useUpdateCheckoutMargin({ updateCheckout, id });

	const updateQuotation = (setIsLoadingStateRequired = () => {}, serviceRemoved = false) => {
		try {
			if (quotation_email_sent_at) {
				updateCheckout({
					values: {
						id,
						state: 'locked',
					},
					scrollToTop: true,
				});

				return;
			}

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

			updateCheckoutMargin({ finalPayload, setIsLoadingStateRequired, serviceRemoved, getCheckout });
		} catch (error) {
			const { config = {} } = error.response;
			setIsLoadingStateRequired(false);
			const { url = '' } = config;
			Toast.error(`${getApiErrorString(error.response?.data)} in ${url}`);
		}
	};

	const onClickNextButton = () => {
		const serviceWithNoRates = Object.entries(rateServices).reduce((acc, [service_id, item]) => {
			const fclLocalEmpty = !item?.line_items?.length
				&& [
					'fcl_freight_local_service',
					'fcl_freight_local',
					'air_freight_local',
				].includes(item?.service_type);

			const noRatesFound = !item?.total_price_discounted
			&& !(fclLocalEmpty && rateSource !== 'cogo_assured_rate')
			&& item?.service_type !== primary_service;

			if (noRatesFound) {
				return [...acc, {
					serviceType  : item?.service_type,
					id           : service_id,
					service_name : item?.service_name,
				}];
			}

			return acc;
		}, []);

		if (!isEmpty(serviceWithNoRates)) {
			setServices(serviceWithNoRates);
		} else {
			updateQuotation();
		}
	};

	const onClickSaveForLater = () => {
		updateCheckout({ values: { id, state: 'save_for_later' }, refetchRequired: false });

		push(`/service-discovery?activeTab=saved_for_later&service_type=${primary_service}`);
	};

	const MAPPING = [
		{
			label     : <SaveButton state={state} />,
			themeType : 'secondary',
			size      : isMobile ? 'sm' : 'lg',
			key       : 'save_for_later',
			onClick   : onClickSaveForLater,
			loading   : updateLoading,
			disabled  : loading || updateCheckoutMarginLoading || state === 'save_for_later',
		},
		{
			label     : <SubmitButton rate={rate} quotation_email_sent_at={quotation_email_sent_at} />,
			themeType : 'accent',
			size      : isMobile ? 'sm' : 'lg',
			loading   : updateLoading || loading || updateCheckoutMarginLoading,
			style     : { marginLeft: '16px' },
			key       : 'place_booking',
			onClick   : onClickNextButton,
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

	return {
		services,
		handleUnlockLatestRate,
		createSearchLoading,
		hasExpired,
		timerRef,
		setServices,
		updateQuotation,
		MAPPING,
	};
};

export default useHandleEditMarginFooter;
