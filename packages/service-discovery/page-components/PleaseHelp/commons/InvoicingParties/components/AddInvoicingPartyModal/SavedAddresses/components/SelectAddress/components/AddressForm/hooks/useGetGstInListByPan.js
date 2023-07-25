import { useRequest } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

const DEAFULT_OPTION = 'gst_not_found';

const REGISTARTION_NUMBER_LENGTH = 10;

const useGetGstInListByPan = ({ registrationNumber = '', action }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoscore_tax_numbers',
		method : 'get',
	}, { manual: false });

	useEffect(() => {
		if (action === 'edit' || (registrationNumber || '').length !== REGISTARTION_NUMBER_LENGTH) {
			return;
		}

		const params = {
			registration_number: (registrationNumber || '').toUpperCase(),
		};

		trigger({ params });
	}, [action, registrationNumber, trigger]);

	const gstinList = useMemo(() => ((data || {}).data || {}).gsts || [], [data]);

	if (!gstinList.includes(DEAFULT_OPTION)) {
		gstinList.push(DEAFULT_OPTION);
	}

	const gstinOptions = useMemo(() => gstinList.map((gstin) => (gstin === 'gst_not_found'
		? { label: upperCase(gstin), value: gstin }
		: { label: gstin, value: gstin })), [gstinList]);

	return {
		gstinOptions,
		getCogoScoreTaxNumApi: { loading },
	};
};

export default useGetGstInListByPan;
