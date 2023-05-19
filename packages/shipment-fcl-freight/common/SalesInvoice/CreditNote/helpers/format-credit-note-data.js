const formatCreditNoteData = ({
	data,
	servicesIDs,
	invoice,
	invoiceData,
	isEdit,
}) => {
	const initialLineItems = [];
	invoiceData?.invoicing_parties?.forEach((party) => {
		party?.services?.forEach((service) => {
			service?.line_items?.forEach((item) => {
				const obj = { ...item };
				obj.service_id = service?.service_id;
				initialLineItems.push(obj);
			});
		});
	});

	const lineItemArray = [];
	let checkError = {};

	(Object.keys(data) || []).forEach((key) => {
		if (servicesIDs.includes(key)) {
			(data[key] || []).forEach((line_item) => {
				if (line_item?.is_checked === true || isEdit) {
					const serviceDetails = invoice?.services?.filter(
						(item) => item?.service_id === key,
					)?.[0];

					const initialData = initialLineItems
						?.filter((li) => li?.code === line_item?.code)
						?.find((lineitem) => lineitem.service_id === key);

					const initialPrice = initialData?.price_discounted;
					const initialQuantity = initialData?.quantity;

					if (
						line_item?.price_discounted > initialPrice
						|| line_item?.quantity > initialQuantity
					) {
						const arr = checkError[key] ? checkError[key] : [];

						let errs = {};
						if (line_item?.price_discounted > initialPrice) {
							errs = {
								price_discounted: {
									type    : 'max',
									message : `Price cannot be more than ${initialPrice}`,
								},
							};
						}
						if (line_item?.quantity > initialQuantity) {
							errs = {
								...errs,
								quantity: {
									type    : 'max',
									message : `Quantity cannot be more than ${initialQuantity}`,
								},
							};
						}

						checkError = {
							...checkError,
							[key]: [...arr, { ...errs }],
						};
					}

					const newLineItem = {
						code         : line_item.code,
						price        : line_item.price_discounted,
						quantity     : line_item.quantity,
						service_id   : serviceDetails?.service_id,
						service_type : serviceDetails?.service_type,
					};
					lineItemArray.push(newLineItem);
				} else {
					const arr = checkError[key] ? checkError[key] : [];

					checkError = {
						...checkError,
						[key]: [...arr, null],
					};
				}
			});
		}
	});

	const submit_data = {
		id                     : isEdit ? invoice?.id : undefined,
		line_items             : lineItemArray,
		remarks                : data?.remarks ? [data?.remarks] : undefined,
		invoice_combination_id : invoice?.id,
		shipment_id            : invoice?.shipment_id,
		document_urls          : [data?.uploadDocument.finalUrl],
	};

	return { submit_data, checkError };
};

export default formatCreditNoteData;
