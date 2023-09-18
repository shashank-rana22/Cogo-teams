import { Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ searchQuery = '', setSearchQuery = () => {}, setShow = () => {} }) {
	return (
		<div className={styles.container}>
			<h1>Location Clusters</h1>
			<div className={styles.styled_container}>
				<Input
					suffix={<IcMSearchlight size={3} />}
					style={{ width: 280, height: 38, marginRight: 10, paddingRight: '4px' }}
					placeholder="Search by Cluster Name"
					size="sm"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e)}
				/>
				<Button
					style={{ fontWeight: '700' }}
					onClick={() => { setShow(true); }}
				>
					+ CREATE
				</Button>
			</div>
		</div>
	);
}
export default Header;
