import { Button, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.search_container}>
				<Input
					size="sm"
					placeholder="Search by Agent Name"
					suffix={<IcMSearchlight style={{ marginRight: '4px' }} />}
				/>
			</div>

			<Button type="button" themeType="secondary">
				<IcMFilter style={{ marginRight: '4px' }} />
				Filter
			</Button>
		</div>
	);
}

export default Header;
