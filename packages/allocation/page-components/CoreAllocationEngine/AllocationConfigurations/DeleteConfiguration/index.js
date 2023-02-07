import { Button, Modal } from '@cogoport/components';

import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';

import styles from './styles.module.css';

function DeleteConfiguration({
	value = {},
	setShow,
	listRefetch,
}) {
	const {
		onDelete, loadingUpdate,
	} = useUpdateConfiguration({ value, listRefetch, setShow });

	return (
		<>
			<Modal.Header title="Delete Configuration" />

			<Modal.Body>Do you want to delete this configuration?</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => setShow(false)}
						disabled={loadingUpdate}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						size="md"
						themeType="primary"
						disabled={loadingUpdate}
						onClick={onDelete}
					>
						Delete
					</Button>
				</div>
			</Modal.Footer>
		</>
	);
}

export default DeleteConfiguration;
