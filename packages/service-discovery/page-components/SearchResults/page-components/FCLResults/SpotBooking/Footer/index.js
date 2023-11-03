import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getServicePayload from './getServicePayload';
import getUpdatePayload from './getUpdatePayload';
import styles from './styles.module.css';

function Footer({ detentionValues = {}, handleSubmit = () => {}, detail = {}, watch = () => {} }) {
	const router = useRouter();
	const { service_details = {}, service_type = ''	} = detail;

	const fclServices = Object.values(service_details).filter(
		(item) => (item.service_type === service_type) || item.service_type.includes('local'),
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
		const {
			shipping_line_id = '',
			number_of_stops = 0,
			departure = '',
			arrival = '',
			...basicFreightValues
		} = values;

		const servicePayload = getServicePayload({
			fclServices,
			formValues: {
				shipping_line_id,
				number_of_stops,
				departure,
				arrival,
			},
			detentionValues,
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
					maximumFractionDigits : 0,
				},
			})];
		}

		return acc;
	}, []);

	console.log('watch', watch(), totalDisplayString);

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Total Basic Freight Cost:
				{' '}
				<b>{isEmpty(totalDisplayString) ? 'N/A' : totalDisplayString.join(' + ')}</b>
			</div>

			<Button
				size="lg"
				themeType="accent"
				style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16 }}
				onClick={() => handleSubmit(onSubmit)()}
			>
				Proceed With Spotline Booking
			</Button>
		</div>
	);
}

export default Footer;
