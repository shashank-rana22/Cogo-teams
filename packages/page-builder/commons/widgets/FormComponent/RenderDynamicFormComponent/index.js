import { isEmpty } from '@cogoport/utils';

import DynamicFormComponent from '../DynamicFormComponent';

import styles from './styles.module.css';

function RenderDynamicFormComponent({
	dynamicControls,
	dynamicControlErrors,
	formData,
	dynamicControl,
	dynamicHandleSubmit,
	onDynamicFormSubmit,
	handleEditForm,
	setShow,
	modeType,
}) {
	if (!isEmpty(dynamicControls)) {
		return (
			<DynamicFormComponent
				errors={dynamicControlErrors || {}}
				formData={formData}
				control={dynamicControl}
				dynamicHandleSubmit={dynamicHandleSubmit}
				onDynamicFormSubmit={onDynamicFormSubmit}
				handleEditForm={handleEditForm}
				modeType={modeType}
			/>
		);
	}

	return (
		<div className={styles.form_drop}>
			<div
				className={styles.flex_form}
				role="presentation"
				onClick={() => { if (modeType === 'edit') { setShow(true); } }}
			>
				<img
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output (10).png"
					width="48px"
					height="48px"
				/>
				<div>Click here to start Customizing your form</div>
			</div>
		</div>
	);
}

export default RenderDynamicFormComponent;
