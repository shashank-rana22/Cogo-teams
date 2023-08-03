import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

import FieldArray from '../FieldArray';
import { getController } from '../getController';

import getControls from './getControls';

function Convenience({
	convenienceDetails,
}) {
	const controls = getControls();
	const { convenience_rate = {} } = convenienceDetails || {};

	const { control } = useForm({
		values: {
			convenience_fee: [{
				unit            : startCase(convenience_rate?.unit),
				currency        : convenience_rate?.currency,
				convenience_fee : convenience_rate?.price,
			}],
		},
	});

	return (
		<>
			{controls.map((controItem) => {
				const { type, label, name } = controItem;

				if (type === 'fieldArray') {
					return <FieldArray control={control} {...controItem} key={name} />;
				}

				const Element = getController(type);

				return (
					<React.Fragment key={name}>
						<div>
							{label}
						</div>
						<Element control={control} {...controItem} />
					</React.Fragment>
				);
			})}

		</>
	);
}

export default Convenience;
