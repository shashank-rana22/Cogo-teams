import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useGetPermission } from '@cogoport/request';

import Layout from '../../../common/Layout';
import formattedData from '../../../helpers/getFormattedData';
import useGetCpAuthRoles from '../../../hooks/useGetCpAuthRoles';
import CC from '../../../utils/condition-constants';

import getUpdateFormControls from './controls/updateControls';
import styles from './styles.module.css';

function UpdatePartner({
	clickedItem = {}, setClickedItem = () => {}, setView = () => {},
	entityType = 'cogoport', createUpdatePartner = () => {}, refetch = () => {},
}) {
	const { cpData } = useGetCpAuthRoles();

	const { controls } = getUpdateFormControls({ entityType });
	const ROLE_IDS_SELECTED = clickedItem?.roles_data?.map((role) => role.id);
	const { control, handleSubmit, formState:{ errors = {} } } = useForm({
		defaultValues: { selected_role_ids: ROLE_IDS_SELECTED },
	});
	const { isConditionMatches } = useGetPermission();
	const onSubmit = async (val) => {
		const TYPE = 'update';
		const values = { ...val, entityType, type: TYPE, cpAuthRolesAPI: cpData };
		let status = 'active';
		if (
			isConditionMatches(CC.SEE_AS_ENTITY_MANAGER)
			&& !isConditionMatches(CC.SEE_ALL_USERS)
		) {
			status = 'inactive';
		}

		const data = formattedData({ values });
		data.id = clickedItem?.id;
		data.business_name = clickedItem?.business_name;
		data.country_id = clickedItem?.country_id;
		data.preferred_languages = ['english'];
		data.status = status;
		const { type:_, entityType:__, selected_role_ids:___, ...rest } = data;
		await createUpdatePartner(rest);
		setView('empty');
		refetch();
	};

	return (

		<div>
			<Layout
				control={control}
				errors={errors}
				controls={controls}
			/>
			<div className={styles.btn_container}>
				<Button
					onClick={() => { setView('empty'); setClickedItem(''); }}
					className={styles.left_btn}
				>
					Cancel

				</Button>
				<Button onClick={handleSubmit(onSubmit)}>Save</Button>
			</div>
		</div>
	);
}
export default UpdatePartner;
