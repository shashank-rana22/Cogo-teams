import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useTrendSearch = () => {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');
	const [responsevalue, setResponsevalue] = useState([]);
	const [hscodeArr, setHscodeArr] = useState([]);
	const [shipmentType, setShipmentType] = useState(['import']);

	const formProps = useForm();

	const { control, handleSubmit } = formProps;

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'athena/hscodes_by_commodity_name',
		method : 'post',
	}, { manual: true });

	const handleClick = async (formValues) => {
		console.log(formValues);
		setHscodeArr([]);
		await trigger({
			data: {
				filters: { commodity_name: searchValue },
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setResponsevalue(responseData.list);
		}
	}, [responseData]);

	const getReport = () => {
		if (shipmentType && hscodeArr) {
			router.push(`/athena-dashboard/report?shipment_type=${shipmentType}&hscodes=${hscodeArr}`, `/athena-dashboard/report?shipment_type=${shipmentType}&hscodes=${hscodeArr}`);
		}
	};

	return {
		searchValue,
		setSearchValue,
		responsevalue,
		setResponsevalue,
		hscodeArr,
		setHscodeArr,
		loading,
		handleSubmit,
		handleClick,
		getReport,
		control,
	};
};
export default useTrendSearch;
