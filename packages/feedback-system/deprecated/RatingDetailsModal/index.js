import { Modal, Tooltip } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function RatingDetailsModal({ performance_item = {} }) {
	const [show, setShow] = useState(false);

	const content = () => (
		<div className={styles.feedback_content}>
			<p>Rating Details</p>
			<div className={styles.text_content}>
				{Object.keys(performance_item).map((key) => (
					<div className={styles.item}>
						<div className={styles.title}>
							{' '}
							<Tooltip
								theme="light"
								placement="top"
								animation="shift-away"
								content={key}
							>
								<div className="title">{`${key}`}</div>
							</Tooltip>
						</div>

						<div className={styles.value}>{`${performance_item[key]}`}</div>
					</div>
				))}
			</div>
		</div>
	);

	const onOuterClick = () => {
		setShow(false);
	};

	return (
		<>
			<div className={styles.rating_button} role="button" tabIndex={0} onClick={() => setShow(true)}>
				<p className="viewall_text">Rating Details </p>
			</div>

			<Modal
				show={show}
				onClose={() => setShow(false)}
				className="primary sm"
				onOuterClick={onOuterClick}
			>
				{content()}
			</Modal>
		</>
	);
}

export default RatingDetailsModal;
