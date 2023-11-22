import { Button, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getServicePayload from './getServicePayload';
import getUpdatePayload from './getUpdatePayload';
import styles from './styles.module.css';

function Footer({
	detentionValues = {},
	handleSubmit = () => {},
	detail = {},
	watch = () => {},
	setFinalLoading = () => {},
	finalLoading = false,
	setScreen = () => {},
}) {
	const router = useRouter();
	const { service_details = {}, service_type = ''	} = detail;

	const fclServices = Object.values(service_details).filter(
		(item) => (item.service_type === service_type) || item.service_type.includes('local'),
	);

	const primaryServices = Object.values(service_details).filter(
		(item) => (item.service_type === service_type),
	);

	const [, triggerCreateCheckout] = useRequest({
		method : 'POST',
		url    : '/create_checkout',
	}, { manual: true });

	const [, triggerUpdateCheckout] = useRequest({
		method : 'POST',
		url    : '/update_checkout_customize_quotation',
	}, { manual: true });

	const [, triggerGetCheckout] = useRequest({
		method : 'GET',
		url    : '/get_checkout',
	}, { manual: true });

	const onSubmit = async (values) => {
		try {
			setFinalLoading(true);

			const {
				shipping_line_id = '',
				number_of_stops = 0,
				departure = '',
				arrival = '',
				sailing_schedule = false,
				suitable_schedule = '',
				origin_main_port_id = '',
				destination_main_port_id = '',
				...basicFreightValues
			} = values;

			const [exisArrival, exisDeparture, transit_time, exisNumberOfStops] = suitable_schedule.split('_');

			const servicePayload = getServicePayload({
				fclServices,
				formValues: sailing_schedule ? {
					shipping_line_id,
					number_of_stops,
					departure,
					arrival,
					origin_main_port_id,
					destination_main_port_id,
				} : {
					shipping_line_id,
					number_of_stops : exisNumberOfStops,
					departure       : exisDeparture,
					arrival         : exisArrival,
					transit_time,
					origin_main_port_id,
					destination_main_port_id,
				},
				detentionValues,
				primaryServices,
			});

			const payload = {
				source                      : 'spot_line_booking',
				source_id                   : detail?.id,
				primary_service             : detail?.search_type,
				importer_exporter_id        : detail?.importer_exporter_id,
				importer_exporter_branch_id : detail?.importer_exporter_branch_id,
				user_id                     : detail?.user?.id,
				quotation_type              : 'customize',
				existing_shipment_id        : detail?.source === 'upsell' ? detail?.source_id : undefined,
				tags                        : ['version2'],
				...servicePayload,
			};

			const { data = {} } = await triggerCreateCheckout({ data: payload });

			const { id = '' } = data;

			const { data: checkoutData = {} } = await triggerGetCheckout({ params: { id } });

			const addPayload = getUpdatePayload({ checkoutData, basicFreightValues });

			await triggerUpdateCheckout({ data: addPayload });

			router.push(`/checkout/${id}`);
		} catch (err) {
			setFinalLoading(false);
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	const priceValues = Object.entries(watch()).reduce((acc, [key, value]) => {
		if (key.includes('bas')) {
			return [...acc, value];
		}

		return acc;
	}, []);

	const totalDisplayString = priceValues.reduce((acc, cur) => {
		const { currency = '', price = '' } = cur;

		if (currency && price) {
			return [...acc, formatAmount({
				amount  : price,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			})];
		}

		return acc;
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Total Basic Freight Cost:
				{' '}
				<b>{isEmpty(totalDisplayString) ? 'N/A' : totalDisplayString.join(' + ')}</b>
			</div>

			<div className={styles.flex}>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => setScreen('listRateCard')}
					disabled={finalLoading}
				>
					Go Back
				</Button>

				<Button
					size="lg"
					themeType="accent"
					onClick={() => handleSubmit(onSubmit)()}
					style={{ marginLeft: '16px' }}
					loading={finalLoading}
				>
					Proceed With Spotline Booking
				</Button>
			</div>
		</div>
	);
}

export default Footer;
