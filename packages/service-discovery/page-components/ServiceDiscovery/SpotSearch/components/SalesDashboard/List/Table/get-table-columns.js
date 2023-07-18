import { useRouter } from '@cogoport/next';

import getTableColumnFunction from './get-table-column-function';

const useGetTableColumns = ({ activeTab = 'spot_searches', fields = [] }) => {
	const router = useRouter();

	const columns = fields.map((field) => ({
		Header   : field.label,
		id       : field.key,
		accessor : (item) => {
			const func = getTableColumnFunction(field.func);

			let data = { ...item };

			if (['quotations', 'saved_for_later'].includes(activeTab)) {
				const { primary_service, services } = item || {};
				const primary_service_data = Object.values(services || {}).find(
					(itm) => itm.service_type === primary_service,
				);
				const quotationData = { ...(item || {}), ...(primary_service_data || {}) };

				data = { ...quotationData };
			}

			if (field.func === 'renderButton') {
				return func(data, field, router);
			}

			return func(data, field);
		},
	}));

	return columns;
};
export default useGetTableColumns;
