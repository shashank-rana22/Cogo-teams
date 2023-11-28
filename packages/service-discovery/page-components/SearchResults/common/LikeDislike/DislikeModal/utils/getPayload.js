import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	satisfiedfeedbacks = [],
	values = {},
	details = {},
	rate = {},
	selectedSevice = {},
	spot_search_id = '',
}) => {
	const { commodity_description = '' } = values;

	const {
		rate_id = '',
		service_id = '',
		service_type = '',
	} = selectedSevice;

	const feedbacksPayload = satisfiedfeedbacks.reduce((acc, curKey) => {
		if (curKey === 'unsatisfactory_rate') {
			const {
				preferred_freight_rate = {},
				remarks = '',
				file_upload,
			} = values[curKey] || {};

			const { currency, price } = preferred_freight_rate;

			return {
				...acc,
				unsatisfactory_rate: {
					preferred_freight_rate          : price,
					preferred_freight_rate_currency : currency,
				},
				...(remarks ? { remarks: [...(acc?.remarks || []), remarks] } : {}),
				...(!isEmpty(file_upload)
					? {
						attachment_file_urls: [
							...(acc?.attachment_file_urls || []),
							file_upload?.finalUrl || file_upload,
						],
					}
					: {}),
			};
		}

		if (curKey === 'unsatisfactory_free_days') {
			const {
				destination_detention = 4,
				origin_detention = 4,
				remarks = '',
				file_upload,
			} = values[curKey] || {};

			return {
				...acc,
				unsatisfactory_free_days: {
					destination_detention,
					origin_detention,
				},
				...(remarks ? { remarks: [...(acc?.remarks || []), remarks] } : {}),
				...(!isEmpty(file_upload)
					? {
						attachment_file_urls: [
							...(acc?.attachment_file_urls || []),
							file_upload?.finalUrl || file_upload,
						],
					}
					: {}),
			};
		}

		if (
			['has_additional_line_items', 'has_missing_line_items'].includes(
				curKey,
			)
		) {
			const { remarks = '' } = values[curKey] || {};

			return {
				...acc,
				...(remarks ? { remarks: [...(acc?.remarks || []), remarks] } : {}),
			};
		}

		return acc;
	}, {});

	return {
		...feedbacksPayload,
		commodity_description : commodity_description || undefined,
		performed_by_org_id   : details.importer_exporter.id,
		is_disliked           : true,
		selected_card         : rate.id,
		rate_id,
		service_type,
		service_id,
		id                    : spot_search_id,
		feedbacks             : satisfiedfeedbacks,
	};
};

export default getPayload;
