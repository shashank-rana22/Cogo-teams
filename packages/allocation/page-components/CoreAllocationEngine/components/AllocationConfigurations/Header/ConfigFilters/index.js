import { Badge, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import Filters from '../../../../../../common/Filters';

import useFilterContent from './useFilterContent';

const conditionalWrapper = ({ condition, wrapper, children }) => (
	condition ? wrapper(children) : children
);

function ConfigFilters({
	params,
	setParams,
	disabled,
}) {
	const { t } = useTranslation(['allocation']);

	const {
		controls, formProps, showFilters, setShowFilters, handleReset, applyFilters, filtersApplied,
	} = useFilterContent({ params, setParams, t });

	return (
		<Filters
			controls={controls}
			open={showFilters}
			setOpen={setShowFilters}
			formProps={formProps}
			onClickOutside={() => setShowFilters(false)}
			applyFilters={applyFilters}
			reset={handleReset}
		>
			<Button
				size="md"
				themeType="secondary"
				onClick={() => setShowFilters(!showFilters)}
				disabled={disabled}
			>
				{t('allocation:filter_label')}

				{conditionalWrapper({
					condition : filtersApplied,
					wrapper   : (children) => (
						<Badge color="red" size="md" text="">
							{children}
						</Badge>
					),
					children: <div><IcMFilter style={{ marginLeft: '4px' }} /></div>,
				})}
			</Button>
		</Filters>
	);
}

export default ConfigFilters;
