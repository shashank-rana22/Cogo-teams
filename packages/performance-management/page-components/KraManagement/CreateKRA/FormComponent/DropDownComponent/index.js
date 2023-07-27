import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../../../../configs/getElementController';
import getControls from '../controls';

import styles from './styles.module.css';

const KEYS_MAPPING = {
	role_ids        : 'role_name',
	squad_ids       : 'squad_name',
	tribe_ids       : 'tribe_name',
	chapter_ids     : 'chapter_name',
	sub_chapter_ids : 'sub_chapter_name',
};

function RenderSelectedFields({ selectedValues, showSelectedValue, name, data, setShowSelectedValue }) {
	useEffect(() => {
		if (!isEmpty(data)) {
			setShowSelectedValue((pv) => ({
				...pv,
				role_ids        : (data?.role_details || []).map((ele) => (ele?.role_name)),
				tribe_ids       : (data?.tribe_details || []).map((ele) => (ele?.tribe_name)),
				squad_ids       : (data?.squad_details || []).map((ele) => (ele?.squad_name)),
				chapter_ids     : (data?.chapter_details || []).map((ele) => (ele?.chapter_name)),
				sub_chapter_ids : (data?.sub_chapter_details || []).map((ele) => (ele?.sub_chapter_name)),
			}));
		}
	}, [data, setShowSelectedValue]);

	if (isEmpty(selectedValues)) {
		return (
			<div>
				No values selected
			</div>
		);
	}

	if (!isEmpty(data)) {
		return (showSelectedValue[name] || []).map((element) => (
			<div key={element} className={styles.value_container}>
				{element?.[KEYS_MAPPING?.[name]] ? element?.[KEYS_MAPPING?.[name]] : startCase(element) }
			</div>
		));
	}

	return (selectedValues || []).map((value) => (
		<div key={value} className={styles.value_container}>
			{startCase(value?.[KEYS_MAPPING?.[name]])}
		</div>
	));
}

function RenderFields({ control, errors, setShowSelectedValue, showSelectedValue, data }) {
	const controls = getControls({ setShowSelectedValue });

	return (
		<div className={styles.form}>
			{ (controls || []).map((formControl) => {
				const { group, subControls } = formControl || {};

				if (group !== 'mid_controls') return null;

				return (subControls || []).map((controlItem) => {
					const { name, type, label } = controlItem || {};

					if (!type) return null;

					const DynamicController = getElementController(type);

					if (!DynamicController) return null;

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
									showSelectedValue={showSelectedValue}
									data={data}
									setShowSelectedValue={setShowSelectedValue}
								/>
							</div>

						</div>

					);
				});
			})}
		</div>

	);
}

function DropDownComponent({ control, errors, watch, setShowSelectedValue, showSelectedValue, data }) {
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
					data={data}
				/>
			</div>

		</div>
	);
}

export default DropDownComponent;
