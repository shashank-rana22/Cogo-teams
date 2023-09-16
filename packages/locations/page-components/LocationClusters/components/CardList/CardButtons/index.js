import { Button, Modal } from '@cogoport/components';
import { useState, useRef } from 'react';

import controls from '../../../configurations/controls';
import useDeleteCluster from '../../../hooks/useDeleteCluster';
import useUpdateCluster from '../../../hooks/useUpdateCluster';
import CreateCluster from '../../CreateCluster';
import ViewLocations from '../ViewLocations';

import styles from './styles.module.css';

function CardButtons({ item = {}, getLocationData = () => {} }) {
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showViewLocations, setShowViewLocations] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const { handleDeleteCluster = () => {} } = useDeleteCluster({
		refetch : getLocationData,
		data    : item,
	});
	const newControls = controls.map((ctrl) => {
		if (ctrl?.name !== 'tags') {
			return {
				...ctrl,
				value: item?.[ctrl.name],
			};
		}
		return {
			...ctrl,
			value: item?.tags?.map((val) => ({ tag: val })),
		};
	});

	const { handleUpdateCluster = () => {} } = useUpdateCluster({
		setShow : false,
		refetch : getLocationData,
		data    : item,
	});

	const deleteHanlder = () => {
		handleDeleteCluster();
		setShowDelete(false);
	};
	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};
	return (
		<>
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					onClick={() => { setShowUpdateModal(true); }}
				>
					UPDATE
				</Button>
				<Button
					themeType="secondary"
					onClick={() => { setShowViewLocations(true); }}
				>
					VIEW LOCATIONS
				</Button>
				<Button
					themeType="secondary"
					onClick={() => { setShowDelete(true); }}
				>
					DELETE
				</Button>
				{showUpdateModal ? (
					<Modal
						show={showUpdateModal}
						onClose={() => setShowUpdateModal(false)}
						onOuterClick={() => setShowUpdateModal(false)}
						placement="top"
						size="lg"
					>
						<Modal.Header
							title="Update Cluster"
							className={styles.modal_header}
						/>
						<Modal.Body
							style={{ minHeight: '400px' }}
						>
							<CreateCluster
								ref={formRef}
								controls={newControls}
								handleCreateCluster={handleUpdateCluster}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button
								style={{ fontWeight: '700' }}
								onClick={onSubmit}
							>
								UPDATE
							</Button>
						</Modal.Footer>
					</Modal>
				) : null}
			</div>
			{showViewLocations ? (
				<ViewLocations
					item={item}
					setShowViewLocations={setShowViewLocations}
				/>
			) : null}
			{showDelete ? (
				<Modal
					show={showDelete}
					onClose={() => { setShowDelete(false); }}
					onOuterClick={() => { setShowDelete(false); }}
				>
					<Modal.Header title="Delete Cluster" />
					<Modal.Body>
						Are you sure you want to delete ?
					</Modal.Body>
					<Modal.Footer>
						<Button style={{ marginRight: '5px' }} onClick={deleteHanlder}>YES</Button>
						<Button onClick={() => { setShowDelete(false); }}>NO</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</>
	);
}
export default CardButtons;
