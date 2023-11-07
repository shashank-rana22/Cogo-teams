import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useFilterControls from '../../../../configurations/sid-filters-controls';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function SidTypeFilters(props) {
	const { setIdFilters = () => {} } = props;

	const { t } = useTranslation(['myTickets']);

	const [subCategories, setSubCategories] = useState(null);
	const [raiseToDesk, setRaiseToDesk] = useState(null);

	const formattedSubCategories = (subCategories || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const formatRaiseToDeskOptions = (raiseToDesk || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const { control, handleSubmit, reset, watch, setValue, resetField } = useForm();

	const watchIdType = watch('id_type');
	const watchCategory = watch('category');
	const watchRaise = watch('raised_by_desk');
	const watchService = watch('service');
	const watchTrade = watch('trade_type');
	const watchRequest = watch('request_type');

	const controls = useFilterControls({
		setValue,
		t,
		watch,
		resetField,
		setSubCategories,
		setRaiseToDesk,
		formattedSubCategories,
		formatRaiseToDeskOptions,
	});

	const handleFilter = (val) => {
		const {
			serial_id, id_type, category, sub_category, service, trade_type, raised_by_desk,
			raised_to_desk, request_type,
		} = val || {};

		setIdFilters((prev) => ({
			...prev,
			serialId    : serial_id,
			idType      : id_type,
			category,
			subcategory : sub_category,
			raisedBy    : raised_by_desk,
			raisedTo    : raised_to_desk,
			service,
			trade       : trade_type,
			requestType : request_type,
		}));
	};

	const disableButton = !watchIdType && !watchCategory && !watchRaise && !watchService
	&& !watchTrade && !watchRequest;

	return (
		<form>
			<div className={styles.container}>
				{(controls || []).map((controlItem) => {
					const { name, label, controllerType } = controlItem || {};
					const Element = getFieldController(controllerType);

					if (!Element) {
						return null;
					}

					return (
						<div className={styles.wrap} key={name}>
							<div className={styles.label}>{label}</div>
							<Element
								{...controlItem}
								key={name}
								id={name}
								size="sm"
								control={control}
							/>
						</div>
					);
				})}
				<div className={styles.footer_section}>
					<Button
						themeType="secondary"
						size="sm"
						onClick={() => {
							reset();
							setIdFilters(() => ({
								serialId    : '',
								idType      : '',
								show        : false,
								category    : '',
								subcategory : '',
								raisedBy    : '',
								raisedTo    : '',
								service     : '',
								trade       : '',
								requestType : '',
							}));
						}}
						className={styles.reset_button}
					>
						{t('myTickets:reset')}
					</Button>
					<Button
						themeType="accent"
						size="sm"
						onClick={handleSubmit(handleFilter)}
						disabled={disableButton}
						type="submit"
					>
						{t('myTickets:apply')}
					</Button>
				</div>
			</div>
		</form>
	);
}

export default SidTypeFilters;
