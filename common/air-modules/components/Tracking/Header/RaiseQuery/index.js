import { Button } from '@cogoport/components';
import { SelectController, TextAreaController, useForm } from '@cogoport/forms';

import useCreateRaiseQuery from '../../../../hooks/useCreateRaiseQuery';
import controls from '../controls';

import styles from './styles.module.css';

function RaiseQuery({ shipmentId = '', setShowModal = () => {}, setIsOpen = () => {} }) {
	const { query_type, remarks } = controls;

	const {
		control,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleRaisedQuery = () => {
		setShowModal(true);
		setIsOpen(false);
		reset();
	};

	const { loading, handleFormSubmit } = useCreateRaiseQuery({
		handleRaisedQuery,
		shipmentId,
	});

	return (
		<form className={styles.content}>
			<div className={styles.label}>Issue Related to</div>
			<SelectController
				className={styles.select}
				control={control}
				{...query_type}
				rules={{
					required: { value: true },
				}}
			/>

			{errors?.query_type && (
				<div className={styles.error_text}>Query type is required</div>
			)}

			<div className={styles.text_area_container}>
				<div className={styles.label}>Remarks</div>
				<TextAreaController
					control={control}
					{...remarks}
					rules={{
						required: { value: true },
					}}
					rows={4}
				/>
				{errors?.remarks
                && <div className={styles.error_text}>Remarks is required</div>}
			</div>

			<div className={styles.button_div}>
				<Button
					onClick={() => {
						setIsOpen(false);
						reset();
					}}
					size="md"
					themeType="tertiary"
					style={{ marginRight: 10 }}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(handleFormSubmit)}
					size="md"
					themeType="accent"
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

export default RaiseQuery;
