import { Popover } from '@cogoport/components';
import { IcMCalendar } from '@cogoport/icons-react';

import Content from './Content';
import styles from './styles.module.css';

function DateFilters() {
	const props = 'r43';
	const renderBody = () => <Content props={props} />;
	return (
		<div>
			<Popover render={renderBody} placement="bottom">
				<div className={styles.container}>
					<IcMCalendar height={28} width={28} />
				</div>
			</Popover>
		</div>
	);
}
export default DateFilters;
