// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';

import useCreateUpdateTnc from '../../../hooks/useCreateUpdateTnc';
import { getFieldController } from '../../../utlis/getFieldController';
import FieldArray from '../../FieldArray';

// import { Container, Title, LayoutContainer, BtnAlign } from './styles';
import styles from './style.module.css';

function TermsAndCondition(props) {
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
		editTncModalId,
		refetch,
		editFormValue,
	} = props;
	const {
		handleSubmit = () => {},
		// formState: { errors = {} },
	} = formProps;

	const { onSubmit, loading } = useCreateUpdateTnc({
		editTncModalId,
		setEditTncModalId,
		refetch,
		editFormValue,
		action,
		organizationId,
	});
	console.log(editFormValue, 'editFormValue');
	return (
		<div className={styles.container}>

			<div className={styles.container}>
				{newField.map((controlItem) => {
					const elementItem = { ...controlItem };
					const { name, label, controllerType } = elementItem || {};
					const Element = getFieldController(controllerType);
					const show =						!(controlItem.name in showElements)
						|| showElements[controlItem.name];
					if (controllerType === 'fieldArray') {
						return (
							<FieldArray key={name} {...controlItem} newField={newField} control={control} />
						);
					}
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
					className={`${styles.secondary} ${styles.md}`}
					disabled={loading}
					onClick={() => setTncLevel('basicInfo')}
					style={{ textTransform: 'capitalize' }}
				>
					Back
				</Button>

				<Button
					className={`${styles.primary} ${styles.md}`}
					loading={loading}
					onClick={handleSubmit(onSubmit)}
					style={{ marginLeft: '8px', textTransform: 'capitalize' }}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default TermsAndCondition;
