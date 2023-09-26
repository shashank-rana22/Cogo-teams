import { Button } from '@cogoport/components';
import { useState } from 'react';

import CustomConfigForm from './CustomConfigForm';
import CustomConfigList from './CustomConfigList';
import styles from './styles.module.css';

function CustomConfig({
	data = {},
}) {
	const [showCustomConfigForm, setShowCustomConfigForm] = useState(false);
	const [viewAndEditConfigData, setViewAndEditConfigData] = useState(null);
	// const defaultFilters = { activeList, activeService };
	// const DEFAULT_PARAMS = {
	// 	cogo_entity_data_required     : true,
	// 	slab_configs_data_required    : true,
	// 	agent_rules_data_required     : true,
	// 	updated_by_user_data_required : true,
	// 	discount_config_data_required : true,
	// };
	// const { data, loading, filters, setFilters, refetch } = useGetListPromotionRule({
	// 	defaultFilters,
	// 	defaultParams: DEFAULT_PARAMS,
	// });

	// const refetchList = () => {
	// 	refetch();
	// };

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>Custom Configuration</div>
				{!showCustomConfigForm && viewAndEditConfigData === null ? (
					<Button
						onClick={() => {
							setShowCustomConfigForm(true);
						}}
					>
						+ Add New
					</Button>
				) : null}
			</div>

			{(viewAndEditConfigData !== null || showCustomConfigForm) && (
				<CustomConfigForm
					data={data}
					setShowCustomConfigForm={setShowCustomConfigForm}
					viewAndEditConfigData={viewAndEditConfigData}
					setViewAndEditConfigData={setViewAndEditConfigData}
				/>
			)}

			{viewAndEditConfigData === null && (
				<CustomConfigList
					data={data}
					showCustomConfigForm={showCustomConfigForm}
					setViewAndEditConfigData={setViewAndEditConfigData}
				/>
			)}
			{/* {viewAndEditRuleData?.scope === 'organization' ? (
				<Layout
					controls={discountControls}
					control={control}
					errors={errors}
				/>
			) : (
				<Layout
					controls={shipmentControls}
					control={control}
					errors={errors}
					formValues={formValues}
					showElements={SHOW_ELEM}
				/>
			)} */}

			{/* <div className={styles.btn_container}>
				<Button
					className={styles.btn}
					size="md"
					onClick={handleSubmit}
				>
					SAVE
				</Button>
			</div> */}

		</div>
	// <div>
	// 	{/* <ListHeader
	// 		filters={filters}
	// 		setFilters={setFilters}
	// 		activeList={activeList}
	// 		setActiveList={setActiveList}
	// 		activeService={activeService}
	// 		setShowAddRuleForm={setShowAddRuleForm}
	// 	/> */}
	// 	<CustomConfigList
	// 		data={data}
	// 	/>
	// </div>
	);
}
export default CustomConfig;
