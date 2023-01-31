import { Button, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header(props) {
	const { onClickCreateReqBtn } = props;

	// Todo search filter should expand on clicking

	return (
		<div className={styles.container}>
			<div>
				<Toggle
					name="allocation_type"
					size="md"
					disabled={false}
					offLabel="Organization"
					onLabel="Partner"
				/>
			</div>

			<div className={styles.filter_and_create}>
				<Button size="md" themeType="secondary">
					FILTER
					<IcMFilter style={{ marginLeft: '4px' }} />
					<div className={styles.filter_dot} />
				</Button>

				<Button
					size="md"
					themeType="accent"
					onClick={onClickCreateReqBtn}
				>
					CREATE REQUEST
				</Button>
			</div>
		</div>
	);
}

export default Header;
