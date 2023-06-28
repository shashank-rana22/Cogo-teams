import BreakdownDetails from '../../../../commons/BreakdownDetails';

import BookingDetails from './BookingDetails';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const FIRST_INDEX = 0;

function BookingPreview({ data = {}, setShowBreakup, showBreakup }) {
	const { rate = {} } = data;

	const rateDetails = Object.entries(rate?.services || {}).map(([key, serviceData = {}]) => {
		const { line_items = [] } = serviceData;

		const updateLineItems = line_items.map((lineItem) => {
			const filteredMargins = (lineItem?.margins || []).filter(
				(m) => m.margin_type === 'demand',
			);

			if (filteredMargins?.length) {
				const [margin] = filteredMargins;
				let type = margin?.type;
				let value = margin?.value || DEFAULT_VALUE;

				if (type === 'percentage') {
					type = 'absolute_total';
					value = margin?.total_margin_value;
				}
				const prefillValues = {
					type,
					value,
					currency : margin?.currency || lineItem?.currency,
					code     : margin?.code,
				};

				return {
					filteredMargins: prefillValues,
					...lineItem,
				};
			}

			const prefillValues = {
				type     : 'absolute_unit',
				value    : 0,
				currency : lineItem?.currency,
				code     : lineItem?.code,
			};

			return {
				filteredMargins: prefillValues,
				...lineItem,
			};
		});

		return {
			...data?.rate?.services?.[key],
			id         : key,
			line_items : updateLineItems,
		};
	});

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[FIRST_INDEX];

	const convenienceDetails = {
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
		},
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Booking Preview</div>

			<BookingDetails setShowBreakup={setShowBreakup} />

			{showBreakup ? (
				<div className={styles.breakdown_details}>
					<div className={`${styles.heading} ${styles.commercial_view}`}>Commercial View</div>

					<BreakdownDetails
						rateDetails={rateDetails}
						convenience_line_item={convenience_line_item}
						convenienceDetails={convenienceDetails}
						source="preview_booking"
					/>
				</div>
			) : null}
		</div>
	);
}

export default BookingPreview;
