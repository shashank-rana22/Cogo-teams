import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import { useForm } from '@/packages/forms';

const OPERATOR_KEY_MAPPING = {
	ocean : 'shipping_line_id',
	air   : 'airline_id',
};

const getUniqueList = (arr = []) => arr.filter((item, index) => (
	arr.findIndex((ele) => ele.name === item.name) === index
));

const useFilterContent = ({ globalFilter, setGlobalFilter, activeTab = 'ocean', poc_details = [] }) => {
	const formHook = useForm();
	const { setValue, getValues } = formHook;

	const { shippersList, consigneesList } = useMemo(() => {
		const { shipper, consignee } = poc_details.reduce((result, curr) => {
			if (curr.user_type === 'SHIPPER') {
				result.shipper.push(curr);
			} else if (curr.user_type === 'CONSIGNEE') {
				result.consignee.push(curr);
			}

			return result;
		}, { shipper: [], consignee: [] });

		const uniqueShipper = getUniqueList(shipper);
		const uniqueConsignee = getUniqueList(consignee);

		return { shippersList: uniqueShipper, consigneesList: uniqueConsignee };
	}, [poc_details]);

	const clearHandler = () => {
		const { operatorId = [], shipperId = [], consigneeId = [], bookWithCogo = '' } = getValues();
		if (isEmpty(operatorId) && isEmpty(shipperId)
			&& isEmpty(consigneeId) && isEmpty(bookWithCogo)) return;

		setValue('operatorId', []);
		setValue('shipperId', []);
		setValue('consigneeId', []);
		setValue('bookWithCogo', '');

		const {
			shipper = [], consignee = [], booked_with_cogoport: bookCogo = '',
			shipping_line_id = [], airline_id = [], ...rest
		} = globalFilter;

		if (isEmpty(shipper) && isEmpty(consignee) && isEmpty(shipping_line_id)
		&& isEmpty(bookCogo) && isEmpty(airline_id)) return;

		setGlobalFilter(rest);
	};

	const submitHandler = (data) => {
		const { operatorId = [], shipperId = [], consigneeId = [], bookWithCogo = '' } = data || {};

		setGlobalFilter((prev) => ({
			...prev,
			[OPERATOR_KEY_MAPPING[activeTab]] : operatorId,
			shipper                           : shipperId,
			consignee                         : consigneeId,
			booked_with_cogoport_only         : !isEmpty(bookWithCogo),

		}));
	};

	return {
		clearHandler, submitHandler, formHook, shippersList, consigneesList,
	};
};

export default useFilterContent;
