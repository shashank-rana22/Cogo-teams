import { Select, MultiSelect } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsPartner } from '@cogoport/forms/utils/getAsyncFields';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import SearchInput from '../../../common/SearchInput';

import styles from './styles.module.css';
import { controls } from './utils/controls';

function Filters({
	filters = {},
	onChangeFilters = () => {},
	searchString = '',
	setSearchString = () => {},
	stakeHolderType = '',
}) {
	const { t } = useTranslation(['accessManagement', 'common']);
	const partnerOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
		initialCall : false,
		params      : {
			filters: {
				status       : 'active',
				entity_types : ['channel_partner', 'cogoport'].includes(stakeHolderType)
					? [stakeHolderType] : undefined,
			},
		},
	});

	const modifiedControls = controls(filters?.role_functions || [], partnerOptions, t);

	const getElements = (type) => {
		switch (type) {
			case 'select':
				return Select;
			case 'multiSelect':
				return MultiSelect;
			default:
				return null;
		}
	};

	return (
		<section className={styles.container} id="rnp_role_list_filters_container">
			<SearchInput
				value={searchString || ''}
				onChange={(value) => setSearchString(value || '')}
				size="md"
				placeholder={t('accessManagement:roles_and_permission_search_search_role')}
			/>
			<div className={styles.select_container} id="rnp_role_list_filters_select_container">
				{modifiedControls?.map((control) => {
					const Element = getElements(control.type);
					if (control.name === 'stakeholder_id' && ['customer'].includes(stakeHolderType)) {
						return null;
					}
					if (control.name === 'navigation' && stakeHolderType === 'customer') {
						return null;
					}
					return (
						<Element
							key={control.name}
							className={styles.select}
							value={filters?.[control?.name]}
							onChange={(value) => onChangeFilters({
								[control?.name]: !isEmpty(value)
									? value : undefined,
							})}
							{...control}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Filters;
