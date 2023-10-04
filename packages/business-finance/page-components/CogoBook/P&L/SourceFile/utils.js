import { format } from '@cogoport/utils';
import { useEffect } from 'react';

import useSelectMonth from '../../hooks/useSelectMonth';

export function OptionMonth() {
	const { monthData:month, refetch } = useSelectMonth();

	useEffect(() => { refetch(); }, [refetch]);

	return (month || [])?.map((item:Date) => ({
		label : format(item, 'MMM yyyy'),
		value : format(item, 'yyyy-MM-01'),
	}));
}
export const monthNames = ['January', 'February', 'March',
	'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
