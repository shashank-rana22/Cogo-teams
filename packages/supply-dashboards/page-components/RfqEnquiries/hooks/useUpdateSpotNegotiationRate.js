import { useForm } from '@cogoport/forms';

import getField from '../configurations/index';

const useUpdateSpotNegotiationRate = ({ service }) => {
	const fields = getField({ service });
	const { control } = useForm();

	return {
		fields,
		control,
	};
};
export default useUpdateSpotNegotiationRate;
