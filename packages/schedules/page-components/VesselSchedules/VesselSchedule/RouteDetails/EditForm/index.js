import { Popover, Button } from '@cogoport/components';
import { IcMPlusInCircle, IcMOverflowDot } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function RoutePortForm({
	isFirst, isLast, port, diffInDays, index, onClickAdd, onClickEdit, setPortEdit, onClickDelete, add,
}) {
	const [showPopover, setShowPopover] = useState(false);
	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div className={styles.eta_etd}>
					<div className={styles.eta}>
						ETA :
						{' '}
						{format(port?.eta, 'dd MMM yyyy HH:mm')}
					</div>

					<div className={styles.etd}>
						ETD :
						{' '}
						{format(port?.etd, 'dd MMM yyyy HH:mm')}
					</div>
				</div>
			</div>
			{(!isFirst)
				? <div><IcMPlusInCircle style={{ cursor: 'pointer' }} onClick={() => { onClickAdd(index); }} /></div>
				: <div style={{ margin: '7px' }} />}
			<div className={styles.middle}>
				{!isFirst && <div className={styles.hr_line_up} />}
				<div className={styles.circle} />
				{!isLast && <div className={styles.hr_line_down} />}
			</div>
			<div className={styles.right}>
				<div className={styles.port_name}>
					{port?.display_name.split(',')[0] }
					<span className={styles.port_terminal} />
				</div>
				<div className={styles.popover_content}>
					<Popover
						placement="left"
						visible={showPopover}
						onClickOutside={() => setShowPopover(false)}
						render={(
							<>
								<Button
									themeType="tertiary"
									size="md"
									onClick={() => { onClickEdit(index); setPortEdit(true); }}
								>
									Edit
								</Button>
								<Button
									themeType="tertiary"
									size="md"
									onClick={() => { onClickDelete(index); }}
								>
									Delete
								</Button>
							</>

						)}
					/>
					<IcMOverflowDot
						className={styles.vertical_dots}
						onClick={() => {
							setShowPopover(true);
						}}
					/>
				</div>
				{!isLast && (
					<div className={styles.diff_in_days}>
						{diffInDays}
						{' '}
						Days
					</div>
				)}
			</div>
		</div>
	);
}
export default RoutePortForm;
