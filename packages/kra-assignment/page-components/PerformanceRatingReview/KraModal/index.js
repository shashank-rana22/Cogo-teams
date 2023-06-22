import { Button, Modal, RatingComponent } from '@cogoport/components';
import { TextAreaController } from '@cogoport/forms';
import React, { useState } from 'react';

import styles from './styles.module.css';

const dummyData = [
	{
		index        : 1,
		name         : 'KRA NAME 1',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 2,
		name         : 'KRA NAME 2',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 3,
		name         : 'KRA NAME 3',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 4,
		name         : 'KRA NAME 4',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 5,
		name         : 'KRA NAME 5',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 5,
		name         : 'KRA NAME 5',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 5,
		name         : 'KRA NAME 5',
		kra_achieved : 4,
		weightage    : 0.98,
	},
	{
		index        : 5,
		name         : 'KRA NAME 5',
		kra_achieved : 4,
		weightage    : 0.98,
	},
];

function KraModal({ show, setShow }) {
	const [starRating, setStarRating] = useState();
	return (
		<Modal show={show} placement="top" size="xl" onClose={() => setShow(false)}>
			<Modal.Header title={(
				<div className={styles.container}>
					<div className={styles.employee_name}>
						Employee Name:
					</div>

					<div className={styles.squad}>
						<div className={styles.squad_name}>Squad:</div>
						<div className={styles.tribe_name}>Tribe:</div>
						<div className={styles.total_kra}>Total Kra:</div>
					</div>
				</div>
			)}
			/>

			<Modal.Body
				style={{ maxHeight: '500px', minHeight: '300px' }}
			>
				<div className={styles.modal_body_container}>
					<div className={styles.left_section}>
						{ dummyData?.map((item) => (
							<div className={styles.sub_section} key={item.index}>
								<div>
									KRA
									{item.index}
								</div>
								<div>
									KRA Name:
									{item.name}
								</div>
								<div>
									KRA Achieved:
									{item.kra_achieved}
								</div>
								<div>
									Weightage:
									{item.weightage}
								</div>
							</div>
						))}
					</div>
					<div className={styles.right_section}>
						<div className={styles.overall_rating}>
							<div className={styles.rating}>
								<div>
									Average Overall Rating:
								</div>
								<div>
									Rating:
								</div>

							</div>
							<div className={styles.modification_history}>
								Modification History:
							</div>

						</div>
						<div className={styles.remarks}>
							<div className={styles.revised_rating}>
								Revised Rating
								<RatingComponent
									type="star"
									totalStars={5}
									value={starRating}
									onChange={setStarRating}
								/>
							</div>
							<div className={styles.input_text}>
								Text
							</div>

						</div>

					</div>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}>
						<Button
							themeType="secondary"
							onClick={() => setShow(false)}
						>
							Cancel
						</Button>

					</div>

					<div>
						<Button
							themeType="accent"
						>
							Submit
						</Button>
					</div>
				</div>
			</Modal.Footer>

		</Modal>
	);
}

export default KraModal;
