// import Layout from '@cogo/business-modules/form/Layout';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
// import startCase from '@cogo/utils/startCase';
// import { useFormCogo } from '@cogoport/front/hooks';
import React, { useEffect } from 'react';

import FieldArray from '../FieldArray';
import { getController } from '../getController';

import getControls from './getControls';

function Convenience({
	convenienceDetails,
	onChange = () => {},
	convenience_line_item,
}) {
	const controls = getControls(convenienceDetails);
	const { control, setValue, watch } = useForm();

	useEffect(() => {
		watch((v) => {
			onChange({
				convenience_rate: {
					unit     : convenienceDetails?.convenience_rate?.unit,
					price    : v?.convenience_fee[0].convenience_fee,
					currency : convenienceDetails?.convenience_rate?.currency,
				},
			});
		});
	}, [watch]);

	useEffect(() => {
		onChange({
			convenience_rate: {
				price    : convenience_line_item?.price,
				currency : convenience_line_item?.currency,
				unit     : convenience_line_item?.unit,
			},
		});

		setValue('convenience_fee', [
			{
				currency        : convenience_line_item?.currency,
				convenience_fee : convenience_line_item?.price,
				unit            : startCase(convenience_line_item?.unit),
			},
		]);
	}, []);

	return (
		<>
			{controls.map((controItem) => {
				const { type, label, show } = controItem;

				if (!show) {
					return null;
				}

				if (type === 'feildArray') {
					return <FieldArray control={control} {...controItem} />;
				}

				const Element = getController(type);

				return (
					<>
						<div>
							{label}
						</div>
						<Element control={control} {...controItem} />
					</>
				);
			})}

		</>
	);
}

export default Convenience;
