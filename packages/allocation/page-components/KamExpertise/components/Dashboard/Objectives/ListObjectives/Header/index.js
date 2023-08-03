import { Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header(props) {
	const {
		params = {},
		setParams = () => { },
	} = props;

	const handleToggle = () => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				status: pv?.filters?.status.includes('active') ? ['inactive'] : ['active', 'live'],
			},
		}));
	};

	return (
		<section className={styles.container}>
			<Toggle
				className={styles.toggle}
				size="md"
				name="active_status"
				onLabel="Active"
				offLabel="Inactive"
				value={params?.filters?.status || ['active', 'live']}
				onChange={() => handleToggle()}
			/>
		</section>
	);
}

export default Header;
