import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import useGetConvenienceRateConfig from '../../../../hooks/useGetConvenienceRateConfig';

import CustomConvenienceListItem from './CustomConvenienceListItem';
import styles from './styles.module.css';

const LAST_INDEX = 1;

function CustomConvenienceList({ activeList, setShowCustomConfigForm, setOrganizationDetails }) {
	const { data, loading } = useGetConvenienceRateConfig({ activeList });
	const list = data?.custom_configuration_data || [];
	if (loading) {
		return (
			<div className={styles.spinner}>
				<Loader
					themeType="primary"
				/>
			</div>
		);
	}
	if (isEmpty(list)) {
		return <EmptyState />;
	}
	return list.map((item, i) => (
		<CustomConvenienceListItem
			key={item.id}
			data={item}
			isLastItem={i === list.length - LAST_INDEX}
			onEditingForm={() => {
				setShowCustomConfigForm(item);
				setOrganizationDetails({
					organization_type : data?.organization_type || '',
					cogo_entity_id    : data?.cogo_entity_id || '',
				});
			}}
		/>
	));
}

export default CustomConvenienceList;
