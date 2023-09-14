import { Button, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import Filters from '../../../../../../common/Filters';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

function conditionalWrapper({ condition, wrapper, children }) {
	return condition ? wrapper(children) : children;
}

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const {
		setParams,
	} = props;

	const {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	} = useFilterContent({ setParams, t });

	return (
		<div className={styles.container}>
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
					type="button"
					themeType="secondary"
					onClick={() => setShowFilters(!showFilters)}
				>
					{t('allocation:filter_label')}

					{conditionalWrapper({
						condition : filtersApplied,
						wrapper   : (children) => (
							<Badge color="red" size="md" text="">
								{children}
							</Badge>
						),
						children: <IcMFilter style={{ marginLeft: '4px' }} />,
					})}
				</Button>
			</Filters>
		</div>
	);
}

export default Header;
