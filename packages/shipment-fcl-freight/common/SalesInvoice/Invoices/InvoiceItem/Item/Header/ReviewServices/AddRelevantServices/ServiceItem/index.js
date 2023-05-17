import React from 'react';
import getField from '@cogo/business-modules/form/components';
import { useFormCogo } from '@cogoport/front/hooks';
import { IcMPlus } from '@cogoport/icons-react';
import styles from './styles.module.css';

const CheckBox = getField('checkbox');

const controls = [
	{
		name: 'isApplicable',
		type: 'checkbox',
		className: 'primary md',
		options: [{ label: 'Not Applicable', value: true }],
	},
];

const ServiceItem = () => {
	const { fields } = useFormCogo(controls || []);

	return (
		<div className={styles.container}>
			<div className={styles.service_container}>
				<div>
					<div className={styles.service_name}>Vessel Traffic Service</div>
					<div className={styles.avg_margin}>Average Margin $20</div>
				</div>

				<div className={styles.icon_wrapper}>
					<IcMPlus />
				</div>
			</div>

			<div className={styles.flex_row}>
				<CheckBox {...fields.isApplicable} />
			</div>
		</div>
	);
};

export default ServiceItem;
