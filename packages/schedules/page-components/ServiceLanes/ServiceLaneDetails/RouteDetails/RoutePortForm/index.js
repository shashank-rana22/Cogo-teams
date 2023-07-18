import { Popover, Button } from '@cogoport/components';
import { IcMPlusInCircle, IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
const TEN_THOUSAND = 10000;
function RoutePortForm({
	isFirst, isLast, port, index, onClickAdd, onClickEdit, setPortEdit, onClickDelete,
}) {
	const [showPopover, setShowPopover] = useState(false);
	const dayChoices = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const getPortName = (name) => {
		const splitIndex = name?.indexOf(',')
            < (name?.indexOf('(') < ZERO ? TEN_THOUSAND : name?.indexOf('('))
            	? name?.indexOf(',')
            	: name?.indexOf('(');

		return name?.substring(ZERO, splitIndex - ONE);
	};

	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div>
					<div className={styles.eta_etd}>
						<div className={styles.eta}>
							ETA :
							{' '}
							{dayChoices[Number(port?.eta_day) - ONE]}
							{' '}
							( Day &nbsp;
							{port?.eta_day_count}
							)
						</div>
						<div className={styles.etd}>
							ETD :
							{' '}
							{dayChoices[Number(port?.etd_day) - ONE]}
							{' '}
							( Day &nbsp;
							{port?.etd_day_count}
							)
						</div>

					</div>

				</div>

			</div>
			{ !isFirst ? (
				<div className={styles.add_icon}>
					<IcMPlusInCircle onClick={() => { onClickAdd(index); }} />
				</div>
			) : <div style={{ margin: '7px' }} />}
			<div className={styles.middle}>
				{!isFirst && <div className={styles.hr_line_up} />}
				<div className={styles.circle} />
				{!isLast && <div className={styles.hr_line_down} />}
			</div>
			<div className={styles.right}>
				<div className={styles.port_name}>
					{getPortName(port?.display_name)}
					{' '}
				</div>
				<div className={styles.popover_content}>
					<Popover
						placement="right"
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
			</div>
		</div>
	);
}
export default RoutePortForm;
