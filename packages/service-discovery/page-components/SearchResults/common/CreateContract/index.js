import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useCreateContract from '../../hooks/useCreateContract';

import createContracts from './controls';
import CreateContractModal from './CreateContractModal';
import PortSelect from './CreateContractModal/PortSelect';
import styles from './styles.module.css'; // Import CSS module

function CreateContract({
	data = {},
	details = {},
	showContract = false,
	setShowContract = () => {},
	setPriceLocked = () => {},
}) {
	const newControls = createContracts();

	const [contractData, setContractData] = useState({});

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm();
	const watchForm = watch();

	const { search_type = '' } = details || {};
	const { createContract, loading } = useCreateContract({
		data,
		setPriceLocked,
		setContractData,
		setShowContract,
		search_type,
	});
	console.log('errors', errors);

	const onSubmit = (val) => {
		console.log('val', val);
		createContract({ ...watchForm });
	};

	return (
		<div
			role="presentation"
			className={`${styles.modalWrapper} ${showContract ? 'show' : ''}`}

		>
			<Modal show={showContract} onClose={setShowContract} placement="top" size="lg">
				<Modal.Header title={(
					<div>
						Request Contract
						<div>Note: Rate will be locked for basic freights only.</div>
						<PortSelect portDetail={details} />
					</div>
				)}
				>
					<div className={styles.header}>
						<div className={styles.title}>Request Contract</div>
						<IcMCross
							width={20}
							height={20}
							cursor="pointer"
							onClick={() => setShowContract(false)}
							className={styles.closeIcon}
						/>
					</div>
				</Modal.Header>
				<Modal.Body style={{ maxHeight: '500px' }}>
					<div className={styles.body}>
						<CreateContractModal
							details={details}
							errors={errors}
							control={control}
							controls={newControls}
							watchForm={watchForm}
							setValue={setValue}
							search_type={search_type}
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.footer}>
						<Button
							className={`${styles.closeCreateContractModal} secondary md`}
							onClick={() => setShowContract(false)}
							themeType="secondary"
						>
							Close
						</Button>
						<Button
							disabled={loading}
							className={`${styles.nextStepCreateContract} primary md`}
							onClick={handleSubmit(onSubmit)}
						>
							Create
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateContract;
