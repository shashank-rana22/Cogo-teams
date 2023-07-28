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
				status: pv?.filters?.status === 'active' ? 'inactive' : 'active',
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
				value={params?.filters?.status || 'active'}
				onChange={() => handleToggle()}
			/>

			{/* <Button
				type="button"
				themeType="primary"
				onClick={() => setActionMode('create')}
			>
				+ Create New Objective
			</Button> */}
		</section>
	);
}

export default Header;
