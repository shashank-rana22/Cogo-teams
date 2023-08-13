import { Tooltip, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ScopeArr from '../../common/ScopeArr';
import createApiResourceControls from '../../configs/create-api-controls';
import { getElementController } from '../../utils/getElementController';

import styles from './styles.module.css';
import useCreateResource from './useCreateResource';

function CreateResource() {
	const [scopesArr, setScopesArr] = useState([]);

	const formProps = useForm({
		defaultValues: {
			scopes                    : [{ view_type: 'allowed', through_criteria: [] }],
			permission_check_required : true,
		},
	});

	const {
		handleSubmit, formState:{ errors }, control, register, getValues, reset, setValue, clearErrors, watch,
	} = formProps;
	const { onSubmit, onReset } = useCreateResource({ reset });

	const checkedPermissions = watch('permission_check_required');
	const resourceName = watch('name');

	useEffect(() => {
		setValue('display_name', startCase(resourceName || ''));
	}, [resourceName, setValue]);

	return (
		<div>
			<div className={styles.header}>
				Create API Resource
			</div>

			<div className={styles.info}>
				Please submit the details of the API resource you want to create.
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.container}
			>
				<section className={styles.form_content}>
					{createApiResourceControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getElementController(el.type);

						if (!Element) return null;

						return (
							<div
								style={{ width: el.width }}
								className={styles.form_group}
								key={el.name}
							>

								<span>{el.name === 'permission_check_required' ? '' : el.label}</span>

								<div
									style={{ width: '100%' }}
									className={`${styles.input_group} 
								${errors?.[el.name]?.message ? styles.errorful : ''}`}
								>
									<Tooltip
										disabled={!errors?.[el.name]?.message}
										content={(
											<div className={styles.error_message}>
												{errors?.[el.name]?.message}
											</div>
										)}
									>

										<Element
											{...el}
											key={el.name}
											control={control}
											{...(el.name === 'permission_check_required'
											&& { checked: !!checkedPermissions })}
										/>
									</Tooltip>
								</div>
							</div>
						);
					})}
				</section>

				<ScopeArr
					scopesArr={scopesArr}
					setScopesArr={setScopesArr}
					control={control}
					errors={errors}
					watch={watch}
					register={register}
					setValue={setValue}
					clearErrors={clearErrors}
					getValues={getValues}
					source="create_resource"
				/>

				<div className={styles.button_container}>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="tertiary"
						onClick={() => {
							onReset();
						}}
					>
						Reset
					</Button>
					<Button
						size="md"
						type="submit"
						themeType="primary"
					>
						Create
					</Button>
				</div>
			</form>
		</div>
	);
}

export default CreateResource;
