import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

const useGetGstInListByPan = ({ registrationNumber = '', action }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const getCogoScoreTaxNumApi = useRequest(
		'get',
		false,
		scope,
	)('/get_cogoscore_tax_numbers');

	const params = {
		registration_number: (registrationNumber || '').toUpperCase(),
	};

	useEffect(() => {
		if (action === 'edit' || (registrationNumber || '').length !== 10) {
			return;
		}

		getCogoScoreTaxNumApi.trigger({ params });
	}, [registrationNumber]);

	const defaultSelectOption = 'gst_not_found';

	const gstinList = ((getCogoScoreTaxNumApi.data || {}).data || {}).gsts || [];

	if (!gstinList.includes(defaultSelectOption)) {
		gstinList.push(defaultSelectOption);
	}

	const gstinOptions = useMemo(() => gstinList.map((gstin) => (gstin === 'gst_not_found'
		? { label: upperCase(gstin), value: gstin }
		: { label: gstin, value: gstin })), [gstinList.length]);

	return {
		gstinOptions,
		getCogoScoreTaxNumApi,
	};
};

export default useGetGstInListByPan;
