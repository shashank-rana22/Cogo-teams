import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useCreateContract from '../../hooks/useCreateContract';

import createContracts from './controls';
import CreateContractModal from './CreateContractModal';
import PortSelect from './CreateContractModal/PortSelect';
import styles from './styles.module.css';

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
			<Modal
				show={showContract}
				onClose={() => setShowContract(false)}
				placement="top"
				size="lg"
				className={styles.modal}
			>
				<Modal.Header title={(
					<div className={styles.header_container}>
						<div className={styles.heading}>Request Contract</div>
						<div className={styles.sub_heading}>Note: Rate will be locked for basic freights only.</div>
						<PortSelect portDetail={details} contractData={contractData} />
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
							Cancel
						</Button>
						<Button
							disabled={loading}
							className={`${styles.nextStepCreateContract} primary md`}
							onClick={handleSubmit(onSubmit)}
						>
							Next
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateContract;
