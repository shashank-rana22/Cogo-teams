import { ButtonIcon, Tooltip, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';

import ScopeArr from '../../common/ScopeArr';
import updateApiControls from '../../configs/update-api-controls';
import { getElementController } from '../../utils/getElementController';

import styles from './styles.module.css';
import useUpdateResource from './useUpdateResource';

const getResource = ({ resource = {} }) => {
	const currentScopes = (resource.resource_scopes || []).map((scope) => ({
		view_type        : scope.view_type,
		through_criteria : scope.through_criteria,
		status           : true,
	}));

	return currentScopes;
};

function UpdateResource({
	resource,
	setUpdateResource = () => {},
	setRefetch,
}) {
	const DEFAULT_VALUES = {};

	const updateResourceControls = updateApiControls({ selectedApi: resource });

	updateResourceControls.forEach((cntrl) => {
		if (cntrl.name === 'status') {
			DEFAULT_VALUES[cntrl.name] = (resource || {})[cntrl.name] === true ? 'active' : 'inactive';
		} else {
			DEFAULT_VALUES[cntrl.name] = (resource || {})[cntrl.name];
		}
	});

	const resourceScopes = getResource({ resource });

	DEFAULT_VALUES.scopes = resourceScopes.length !== GLOBAL_CONSTANTS.zeroth_index ? resourceScopes
		: [{ view_type: 'allowed', through_criteria: [] }];

	const formProps = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
		register,
		reset,
		watch,
		setValue,
		clearErrors,
		getValues,
	} = formProps;

	const { onSubmit, loading = false } = useUpdateResource({
		reset,
		resource,
		setUpdateResource,
		resourceScopes,
		setRefetch,
	});

	const checkedPermissions = watch('permission_check_required');

	return (
		<div>
			<div className={styles.header}>
				<ButtonIcon
					icon={<IcMArrowBack />}
					themeType="primary"
					style={{ marginRight: '8px', background: 'transparent' }}
					onClick={() => setUpdateResource({})}
				/>
				<div>Update API Resource</div>
			</div>

			<div className={styles.info}>
				Please submit the changes in the API resource you want to update.
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
				<section className={styles.form_content}>
					{updateResourceControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getElementController(el.type);

						if (!Element) return null;

						return (
							<div
								style={{ width: el.width }}
								className={styles.form_group}
								key={el.name}
							>
								<span>
									{el.name === 'permission_check_required' ? '' : el.label}
								</span>
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
											{...(el.name === 'permission_check_required' && {
												checked: !!checkedPermissions,
											})}
										/>
									</Tooltip>
								</div>
							</div>
						);
					})}
				</section>

				<ScopeArr
					control={control}
					errors={errors}
					watch={watch}
					register={register}
					setValue={setValue}
					clearErrors={clearErrors}
					getValues={getValues}
					source="update_resource"
					selectedApi={resource}
				/>

				<div className={styles.button_container}>
					<Button size="md" type="submit" loading={loading} themeType="primary">
						Update
					</Button>
				</div>
			</form>
		</div>
	);
}

export default UpdateResource;
