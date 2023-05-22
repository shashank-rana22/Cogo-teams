import { Button, Input, ButtonIcon, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useImperativeHandle, forwardRef } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useHandleSearchFilter from './useHandleSearchFilter';

function SearchFilter({ debounceQuery, input, setInput, setParams, params, setFilters, filters }, ref) {
	const {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		reset,
		onClickCreate,
	} = useHandleSearchFilter({ setFilters });

	useImperativeHandle(ref, () => ({ reset }));

	return (
		<div className={styles.container}>
			<Input
				size="md"
				suffix={(
					<ButtonIcon
						size="md"
						icon={<IcMSearchlight />}
						disabled={false}
						themeType="primary"
					/>
				)}
				value={input}
				placeholder="Search..."
				onChange={(value) => {
					setInput(value);
					debounceQuery(value);
					if (params.page !== 1) {
						setParams((prev) => ({ ...prev, page: 1 }));
					}
				}}
				className={styles.input}
			/>

			<div className={styles.right_container}>
				<div className={styles.button_container}>
					<Button
						type="button"
						themeType="primary"
						onClick={onClickCreate}
					>
						Create Course
					</Button>
				</div>

				<Popover
					placement="left"
					caret={false}
					onClickOutside={() => setShowFilter(false)}
					visible={showFilter}
					content={(
						<FilterContent
							control={control}
							handleSubmit={handleSubmit}
							setFilters={setFilters}
							onSubmit={onSubmit}
							onClickReset={onClickReset}
						/>
					)}
				>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						onClick={() => setShowFilter(true)}
						className={styles.filter_btn}
					>
						<IcMFilter style={{ marginRight: '2px' }} />
						Filter
						{!isEmpty(filters) ? <div className={styles.filter_dot} /> : null}
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default forwardRef(SearchFilter);
