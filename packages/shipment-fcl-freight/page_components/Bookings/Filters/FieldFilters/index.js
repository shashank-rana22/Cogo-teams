import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Content from './Content';
import styles from './styles.module.css';

function FieldFilters() {
	const renderBody = () => <Content />;

	return (
		<div>
			<Popover render={renderBody} placement="bottom-start">
				<div className={styles.container}>
					<Button>
						<div>Filter By</div>
						<div><IcMFilter /></div>
					</Button>
				</div>
			</Popover>

		</div>
	);
}
export default FieldFilters;
