import { Button, Modal, Tooltip, cl } from '@cogoport/components';
import { IcMInfo, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, {
	useState,
} from 'react';

import AddTouchPointModal from './AddTouchPointModal';
import styles from './styles.module.css';

const ONE_VALUE = 1;

function TouchPoint(
	{
		typeOfJourney = 'one_way',
		setFtlFormData = () => {},
		location = {},
		touchPoints = [],
		type = 'one_way',
	},
) {
	const [show, setShow] = useState(false);

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};

	function Content() {
		return (
			<>
				{(touchPoints || []).map((touchPoint, idx) => (
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
							{touchPoint.name?.split(' ', ONE_VALUE)}
							,
							{' '}
							{touchPoint.display_name?.split('-', ONE_VALUE)}
						</div>
					</div>
				))}
			</>
		);
	}

	const disabled = typeOfJourney === 'round';

	return (
		<div className={styles.container}>
			<IcMPlus className={cl`${styles.add_icon} ${disabled && styles.disabled}`} />

			<Button
				themeType="linkUi"
				onClick={onClick}
				className={styles.add_button}
				disabled={disabled}
			>
				Add Touchpoints
			</Button>

			{!isEmpty(touchPoints) ? (
				<Tooltip
					placement="bottom"
					content={(
						<div style={{ fontSize: '10px', width: '150px' }}>
							<Content />
						</div>
					)}
				>
					<IcMInfo className={styles.info_icon} />
				</Tooltip>
			) : null}

			<Modal
				show={show}
				onClose={() => setShow(false)}
			>
				<Modal.Header title="Add Touch Points" />

				<Modal.Body>
					<AddTouchPointModal
						onClick={onOuterClick}
						setFtlFormData={setFtlFormData}
						touchPointItems={touchPoints}
						typeOfJourney={typeOfJourney}
						location={location}
						type={type}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default TouchPoint;
