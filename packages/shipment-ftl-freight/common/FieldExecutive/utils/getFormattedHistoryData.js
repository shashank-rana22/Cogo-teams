import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import { getFormattedData } from './getFormattedData';
import { getFileName } from './helperFunctions';

export const getFormattedHistoryData = (data) => {
	const tempData = data?.audit_data;

	const finalList = tempData.map((item) => {
		const singleItemData = getFormattedData(item?.data);
		const documents = Object.values(singleItemData.data).reduce((acc, urls) => {
			if (!isEmpty(urls)) {
				urls.forEach((val) => {
					acc.push({ id: val?.id, name: getFileName(val?.url) });
				});
			}
			return acc;
		}, []);

		return {
			id          : item?.id,
			uploaded_by : item?.performed_by_user,
			documents,
			docs_length : documents?.length,
			updated_at  : formatDate({
				date       : item?.updated_at,
				formatType : 'dateTime',
				separator  : ', ',
			}),
		};
	});

	return finalList;
};
