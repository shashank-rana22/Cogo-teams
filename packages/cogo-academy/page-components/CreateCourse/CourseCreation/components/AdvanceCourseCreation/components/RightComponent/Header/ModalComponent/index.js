import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const INSTRUCTIONS = [
	'Once published, this course will be visible to all eligible users',
	'Make sure to preview the course at least once before publishing it',
	'Ensure that you have added all the desired chapters to be covered in this course',
];

function ModalComponent({
	publishData,
	setPublishData,
	onPublishCourse,
	id = '',
	loading = false,
}) {
	return (
		<Modal
			size="md"
			placement="top"
			show={!isEmpty(publishData)}
			onClose={() => setPublishData({})}
			closable
		>
			<Modal.Header title="Are you sure, you want to publish the course" />

			<Modal.Body>
				<ul>
					{INSTRUCTIONS.map((instruction) => (
						<li key={instruction}>{instruction}</li>
					))}
				</ul>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}>
						<Button
							type="button"
							themeType="secondary"
							onClick={() => setPublishData({})}
							disabled={loading}
						>
							Cancel
						</Button>
					</div>

					<Button
						type="button"
						themeType="primary"
						onClick={() => onPublishCourse({
							values: {
								...publishData,
								id,
								state: 'published',
							},
						})}
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalComponent;
