import { Button, Modal } from '@cogoport/components';

import useCheckConfigurationPublishability from '../../../../hooks/useCheckConfigurationPublishability';

import styles from './styles.module.css';

function CheckConfigurationPublishablity({
	value = {},
	setShow,
	listRefetch,
}) {
	const {
		onCheckPublish, loadingCheckPublishability,
	} = useCheckConfigurationPublishability({ value, listRefetch, setShow });

	return (
		<>
			<Modal.Header title="Delete Configuration" />

			<Modal.Body>Do you want to check publishability of the configuration?</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => setShow(false)}
						disabled={loadingCheckPublishability}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						size="md"
						themeType="primary"
						disabled={loadingCheckPublishability}
						onClick={onCheckPublish}
					>
						Check
					</Button>
				</div>
			</Modal.Footer>
		</>
	);
}

export default CheckConfigurationPublishablity;
