import { Tooltip, Loader, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useAddSubsidiaryService from '../hooks/useAddSubsidiaryService';

import styles from './styles.module.css';

function IconComponent({
	addServiceLoading = false,
	onClickAdd = () => {},
	disabled = false,
}) {
	if (addServiceLoading) {
		return <Loader themeType="primary" />;
	}

	return (
		<IcMPlus
			height={22}
			width={22}
			className={cl`${styles.add_icon} ${disabled ? styles.disabled : {}}`}
			fill="black"
			onClick={onClickAdd}
		/>
	);
}

function ServiceItem({
	itemData = {},
	data = {},
	possible_subsidiary_services = [],
	setPopularServices = () => {},
	refetch = () => {},
	disabled = false,
	setIsDisabled = () => {},
	checkout_id = '',
}) {
	const {
		loading: addServiceLoading,
		handleAddSubsidiaryService: handleAddService,
	} = useAddSubsidiaryService({
		possible_subsidiary_services,
		data,
		refetch,
		checkout_id,
	});

	const { label, value } = itemData || {};

	const onClickAdd = async () => {
		setIsDisabled(value);

		const added = await handleAddService(value);

		setIsDisabled('');
		if (!added) return;
		setPopularServices((prev) => (prev.filter((item) => item.value !== value)));
	};

	return (
		<div className={styles.container}>
			<Tooltip
				content={<div className={styles.tooltip_content}>{`${label} (${startCase(itemData?.service)})`}</div>}
				placement="top"
			>
				<div className={styles.text}>{label}</div>
			</Tooltip>

			<IconComponent
				onClickAdd={onClickAdd}
				addServiceLoading={addServiceLoading}
				disabled={disabled}
			/>
		</div>
	);
}

export default ServiceItem;
