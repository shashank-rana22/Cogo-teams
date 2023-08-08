export const formatBulkPayloadData = ({ shipment_data, selected, watchCN }) => {
	const payload = {
		shipment_id          : shipment_data?.id,
		credit_note_id       : watchCN,
		line_items_deduction : [],
	};

	selected.forEach((item) => {
		if (item) {
			const lineItemObj = {
				reason          : item?.remarks,
				line_item       : item?.name,
				unit            : item?.unit,
				currency        : item?.currency,
				deducted_amount : item?.deducted_amount,
			};
			payload.line_items_deduction.push(lineItemObj);
		}
	});

	return payload;
};
