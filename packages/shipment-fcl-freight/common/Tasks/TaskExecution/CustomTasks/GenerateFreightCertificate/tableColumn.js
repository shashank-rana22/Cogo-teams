import { SelectController } from '@cogoport/forms';

import styles from './styles.module.css';

const tableColumn = ({ controls, control }) => [
	{
		Header   : 'Sr.No',
		accessor : (item) => item?.serial_no,
		id       : 'serial_no',
	},
	{
		Header   : 'Container Number',
		accessor : (item) => item?.container_number,
		id       : 'container_number',
	},
	{
		Header   : 'Container Size',
		accessor : (item) => item?.container_size,
		id       : 'container_size',
	},
	{
		Header   : 'Commodity',
		accessor : (item, index) => {
			const newControls = controls[index];
			return (
				<div className={styles.commodity_container}>
					{ newControls ? <SelectController control={control} {...newControls} size="sm" /> : null}
				</div>
			);
		},
		id: 'commodity',
	},
];

export default tableColumn;
