import { Button } from '@cogoport/components';

import useValidateTermsAndCondition from '../../../hooks/useValidateTermsAndCondition';
import { getFieldController } from '../../../utlis/getFieldController';

import styles from './style.module.css';

function BasicInformation(props) {
	const {
		action,
		label,
		organizationId,
		setEditTncModalId,
		setTncLevel,
		control,
		formProps,
		showElements,
		newField,
	} = props;
	const {
		handleSubmit = () => {},
		// formState: { errors = {} },
	} = formProps;

	const { onSubmit, loading } = useValidateTermsAndCondition({
		setTncLevel,
		organizationId,
		setEditTncModalId,
	});
	return (
		<div className={styles.container}>

			<div className={styles.layout_container}>

				{newField.map((controlItem) => {
					const elementItem = { ...controlItem };
					const { name, label, controllerType } = elementItem || {};
					const Element = getFieldController(controllerType);
					const show =						!(controlItem.name in showElements)
						|| showElements[controlItem.name];
					if (!Element) { return null; }

					// if (name === 'user_id' && isEmpty(watchOrgId)) { return null; }

					return (
						show ? (
							<div
								key={controlItem.name}
								className={styles.field}
							>
								{label && controllerType !== 'checkbox'
							&& (
								<div className={styles.label}>
									<div className={styles.sub_label}>{label}</div>
									{controlItem.name === 'additional_information'
									&& <div className={styles.info_label}>(max 200 characters)</div>}
								</div>
							)}
								<Element
									{...elementItem}
									size="sm"
									key={name}
									control={control}
									id={`${name}_input`}
								/>
								{/* <div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div> */}
							</div>
						) : null
					);
				})}
			</div>

			<div className={styles.btn_align}>
				<Button
					disabled={loading}
					onClick={() => {
						setEditTncModalId(null);
					}}
					style={{ textTransform: 'capitalize' }}
				>
					Cancel
				</Button>
				<Button
					loading={loading}
					onClick={
						action === 'update'
							? () => setTncLevel('termsAndCondition')
							: handleSubmit(onSubmit)
					}
					style={{ marginLeft: '8px', textTransform: 'capitalize' }}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default BasicInformation;
