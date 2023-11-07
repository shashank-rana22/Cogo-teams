import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AddTouchPointModal from './AddTouchPointModal';
import styles from './styles.module.css';

const ONE_VALUE = 1;

function Content({ touchPoints = [] }) {
	return (touchPoints || []).map((touchPoint, idx) => (
		<div className={styles.touchpoint_container} key={touchPoint.id}>
			<div className={styles.circle} />

			{idx < touchPoints.length - ONE_VALUE && <div className={styles.line} />}

			<div className={styles.label}>
				{' '}
				Touch Point
				{' '}
				{idx + ONE_VALUE}
			</div>

			<div className={styles.name}>
				{touchPoint.display_name?.split(',', ONE_VALUE)}
			</div>
		</div>
	));
}

function TouchPoint(
	{
		typeOfJourney = 'one_way',
		setFtlFormData = () => {},
		location = {},
		touchPoints = [],
		type = 'one_way',
		isMobile = false,
	},
) {
	const [show, setShow] = useState(false);

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};

	const disabled = typeOfJourney === 'round';

	return (
		<div className={styles.container}>
			<div className={styles.flex} role="presentation" onClick={onClick}>
				<IcMPlus className={cl`${styles.add_icon} ${disabled && styles.disabled}`} />

				<Button
					themeType="linkUi"
					className={styles.add_button}
					disabled={disabled}
				>
					Add Touchpoints
				</Button>
			</div>

			{!isEmpty(touchPoints) ? (
				<div className={styles.touch_points}>
					<div className={styles.first_touch_point}>
						{touchPoints[GLOBAL_CONSTANTS.zeroth_index].display_name?.split(',', ONE_VALUE)}
					</div>

					{touchPoints.length > 1 ? (
						<div style={{ width: 'max-content', marginLeft: 10 }}>
							<Tooltip
								placement="bottom"
								interactive
								content={(
									<div style={{ fontSize: '10px', width: '150px' }}>
										<Content touchPoints={touchPoints} />
									</div>
								)}
							>
								<span className={styles.more_text}>
									+
									{' '}
									{touchPoints.length - 1}
									{' '}
									more
								</span>
							</Tooltip>
						</div>
					) : null}
				</div>
			) : null}

			{show ? (
				<AddTouchPointModal
					onClick={onOuterClick}
					setFtlFormData={setFtlFormData}
					touchPointItems={touchPoints}
					typeOfJourney={typeOfJourney}
					location={location}
					type={type}
					show={show}
					setShow={setShow}
					isMobile={isMobile}
				/>
			) : null}
		</div>
	);
}

export default TouchPoint;
