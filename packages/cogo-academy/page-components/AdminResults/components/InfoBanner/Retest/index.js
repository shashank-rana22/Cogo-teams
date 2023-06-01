import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getControls from './controls';
import Item from './Item';

function Retest({ watch, control, setValue, errors }) {
	const formvalues = watch();

	const controls = getControls({ control, formvalues });

	useEffect(() => {
		setValue('filtered_users', '');
		setValue('percentage', '');
		setValue('percentile', '');
	}, [setValue, formvalues.users_list]);

	useEffect(() => {
		if (isEmpty(formvalues?.filtered_users)) {
			setValue('percentage', '');
			setValue('percentile', '');
		} else if (formvalues?.filtered_users?.includes('percentile_checked')) {
			setValue('percentage', '');
		} else if (formvalues?.filtered_users?.includes('percentage_checked')) {
			setValue('percentile', '');
		}
	}, [setValue, formvalues?.filtered_users]);

	return (
		<div>
			{(controls || []).map((controlItem) => {
				const { show = true, name } = controlItem;

				if (!show) {
					return null;
				}

				return (
					<Item
						{...controlItem}
						key={name}
						control={control}
						error={errors[controlItem?.name]}
					/>
				);
			})}
		</div>
	);
}

export default Retest;
