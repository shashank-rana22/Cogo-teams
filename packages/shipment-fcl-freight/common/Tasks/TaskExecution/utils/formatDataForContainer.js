export default function formatDataForContainer(rawValues = {}, taskData = {}, ROLLOVER_TASKS = []) {
	if (ROLLOVER_TASKS.includes(taskData.task)) {
		return {
			update_data: (rawValues.update_data || []).map((item) => {
				const { id, data } = item || {};
				const {
					containers_count,
					shipment_rollover,
					editBookingParams: additionalData = {},
					...rest
				} = data || {};

				const payload = {
					id,
					data: {
						...(id in additionalData && additionalData[id]),
						...rest,
					},
				};
				return payload;
			}),
		};
	}

	return rawValues;
}
