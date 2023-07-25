import { Button, Pill } from '@cogoport/components';

import styles from '../../styles.module.css';

export const chaColumns = ({ setShow, service_type }) => [
	{ Header: 'Location', accessor: (row) => (<div>{row?.expertise_data?.location_name}</div>) },
	{
		Header   : 'No. of Existing CHA',
		accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
	},
	{
		id     : 'status',
		Header : () => (
			<div className={styles.th}>
				Status
			</div>
		),
		accessor: (row) => (
			<div className={styles.td}>
				<Pill color="green">{row?.status}</Pill>
			</div>
		),
	},
	{
		Header   : ' ',
		accessor : (row) => (
			<Button
				themeType="accent"
				onClick={() => setShow({ ...row, service_type })}
				disabled={row?.service_requirement}
			>
				Evaluate
			</Button>
		)
		,
	},
];
