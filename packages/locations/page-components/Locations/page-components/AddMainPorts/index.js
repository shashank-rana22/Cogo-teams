import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../../../common/Layout';

import controls from './control';
import styles from './styles.module.css';
import useCreateMapping from './useCreateMapping';

function AddMainPorts({ show = false, onClose = () => {}, location = {} }) {
	const { createMapping } = useCreateMapping({ location, onClose });

	const { control, handleSubmit, formState:{ errors = {} } } = useForm();

	return (
		<div className={styles.container}>
			<Modal
				show={show}
				onClose={onClose}
				className="primary sm"
				styles={{ dialog: { overflow: 'visible' } }}
				size="md"
			>

				<Modal.Body>
					<Layout
						controls={controls}
						control={control}
						errors={errors}
					/>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.btn_align}>
						<Button onClick={onClose} className="secondary md">
							Cancel
						</Button>
						<Button
							onClick={handleSubmit(createMapping)}
							style={{ marginLeft: 16 }}
						>
							Submit
						</Button>
					</div>
				</Modal.Footer>

			</Modal>
		</div>
	);
}

export default AddMainPorts;
