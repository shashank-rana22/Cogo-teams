import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import Layout from '../../../../../common/Layout';
import ShowModal from '../../common/ShowModal';
import BudgetAllocationControls from '../../controls/budget-allocation-form-controls';

import styles from './styles.module.css';

function CreateAllocationCard({
	showAllocationCard = false,
	setShowAllocationCard = () => {},
	refetch = () => {},
}) {
	const DEFAULT_VALUES = {};
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({});
	const {
		control,
		handleSubmit,
		formState: { errors = {} },
		reset,
	} = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const controls = BudgetAllocationControls;

	const onClickAllocate = (data) => {
		setFormData(data);
		setShowModal(true);
	};
	const onCloseModal = () => {
		reset();
		setShowAllocationCard(false);
	};
	return (
		showAllocationCard ? (
			<>
				<Modal
					show
					showCloseIcon
					size="xl"
					onClose={onCloseModal}
					scroll={false}
				>
					<Modal.Header />
					<Modal.Body>
						<div className={styles.top_container}>
							<Layout controls={controls} control={control} errors={errors} />
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button_container}>
							<Button className="primary sm" onClick={handleSubmit(onClickAllocate)}>
								Allocate
							</Button>
						</div>
					</Modal.Footer>
				</Modal>

				<ShowModal
					showModal={showModal}
					setShowModal={setShowModal}
					setShowAllocationCard={setShowAllocationCard}
					formData={formData}
					refetch={refetch}
					reset={reset}
				/>
			</>
		) : null
	);
}
export default CreateAllocationCard;
