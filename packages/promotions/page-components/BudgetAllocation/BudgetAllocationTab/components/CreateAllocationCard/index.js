import { Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import Layout from '../../../../../common/Layout';

import styles from './styles.module.css';

function CreateAllocationCard({
	setFormData = () => {},
	setShowModal = () => {},
	formButton = false,
	setFormButton = () => {},
	control = {},
	controls = {},
	handleSubmit = () => {},
	errors = {},
	reset = () => {},
}) {
	const onClickAllocate = (data) => {
		setFormData(data);
		setShowModal(true);
	};

	return (
		<div className={styles.top_container}>
			<div
				className={styles.icon}
				style={{ display: 'flex', justifyContent: 'flex-end' }}
			>
				<IcMCross
					size={1}
					onClick={() => {
						reset();
						setFormButton(!formButton);
					}}
				/>
			</div>
			<Layout controls={controls} control={control} errors={errors} />
			<div className={styles.button_container}>
				<Button className="primary sm" onClick={handleSubmit(onClickAllocate)}>
					Allocate
				</Button>
			</div>
		</div>
	);
}
export default CreateAllocationCard;
