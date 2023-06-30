import { isEmpty, startCase } from '@cogoport/utils';

import getElementController from '../../../../../configs/getElementController';
import getControls from '../controls';

import styles from './styles.module.css';

function RenderSelectedFields({ selectedValues, name }) {
	if (isEmpty(selectedValues)) {
		return (
			<div>
				No values selected
			</div>
		);
	}

	return (selectedValues || []).map((value) => {
		const { squad_name, tribe_name, chapter_name, sub_chapter_name, role_name } = value || {};

		const KEYS_MAPPING = {
			role_ids        : role_name,
			squad_ids       : squad_name,
			tribe_ids       : tribe_name,
			chapter_ids     : chapter_name,
			sub_chapter_ids : sub_chapter_name,
		};

		return (
			<div key={value} className={styles.value_container}>
				{startCase([KEYS_MAPPING?.[name]])}
			</div>
		);
	});
}

function RenderFields({ control, errors, setShowSelectedValue, showSelectedValue }) {
	const controls = getControls({ setShowSelectedValue });

	return (
		<div className={styles.form}>

			{ (controls || []).map((formControl) => {
				const { group, subControls } = formControl || {};

				if (group !== 'mid_controls') return null;

				return (subControls || []).map((controlItem) => {
					const { name, type, label } = controlItem || {};
					const DynamicController = getElementController(type);

					return (
						<div key={name} className={styles.form_container}>

							<div key={name} className={styles.single_field}>
								<div className={styles.label}>
									{label}
								</div>

								<div className={styles.controller_wrapper}>
									<DynamicController
										{...controlItem}
										control={control}
										name={name}
									/>
								</div>
							</div>

							{errors[name] ? (
								<div className={styles.error_message}>
									{' '}
									{errors[name]?.message}
								</div>
							) : null}

							<div
								className={styles.show_selected_values}
								style={{ opacity: isEmpty(showSelectedValue[name]) ? '0.5' : '1' }}
							>
								<RenderSelectedFields
									selectedValues={showSelectedValue[name]}
									name={name}
								/>
							</div>

						</div>

					);
				});
			})}
		</div>

	);
}

function DropDownComponent({ control, errors, watch, setShowSelectedValue, showSelectedValue }) {
	return (
		<div>
			<div style={{ paddingTop: 8, width: '85%' }}>
				Please select all the applicable roles, tribes,
				chapters and subchapters towhich this KRA may be assigned.
				You must select atleast one selection from all the drop-downs.
			</div>

			<div className={styles.render_form}>
				<RenderFields
					control={control}
					errors={errors}
					watch={watch}
					setShowSelectedValue={setShowSelectedValue}
					showSelectedValue={showSelectedValue}
				/>
			</div>

		</div>
	);
}

export default DropDownComponent;
