import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import CustomConvenienceListItem from './CustomConvenienceListItem';
import styles from './styles.module.css';

const LAST_INDEX = 1;

function CustomConvenienceList(
	{ setShowCustomConfigForm = () => {}, setOrganizationDetails = () => {}, data = {}, loading = '' },
) {
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
	// console.log(list);
	return list.map((item, i) => (
		<CustomConvenienceListItem
			key={item.id}
			data={item}
			isLastItem={i === list.length - LAST_INDEX}
			setShowCustomConfigForm={setShowCustomConfigForm}
			setOrganizationDetails={setOrganizationDetails}
		/>
	));
}

export default CustomConvenienceList;
