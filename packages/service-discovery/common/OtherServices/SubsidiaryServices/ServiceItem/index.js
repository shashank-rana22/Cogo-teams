import { Tooltip, Loader, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useAddSubsidiaryService from '../hooks/useAddSubsidiaryService';

import styles from './styles.module.css';

function IconComponent({
	addServiceLoading = false,
	onClickAdd = () => {},
	disabled = false,
	isMobile = false,
}) {
	if (addServiceLoading) {
		return <Loader themeType="primary" />;
	}

	return (
		<IcMPlus
			height={isMobile ? 16 : 22}
			width={isMobile ? 16 : 22}
			className={cl`${styles.add_icon} ${disabled && styles.disabled}`}
			fill="black"
			onClick={onClickAdd}
		/>
	);
}

function ServiceItem({
	itemData = {},
	data = {},
	possible_subsidiary_services = [],
	refetch = () => {},
	disabled = false,
	setIsDisabled = () => {},
	checkout_id = '',
	isMobile = false,
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

		await handleAddService(value);

		setIsDisabled('');
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
				isMobile={isMobile}
			/>
		</div>
	);
}

export default ServiceItem;
