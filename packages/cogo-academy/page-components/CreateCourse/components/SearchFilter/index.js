import { Button, Input, ButtonIcon, Popover, Modal } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useImperativeHandle, forwardRef } from 'react';

import FilterContent from './FilterContent';
import RecordedSessions from './RecordedSessions';
import styles from './styles.module.css';
import useHandleSearchFilter from './useHandleSearchFilter';

const DEFAULT_PAGE = 1;

function SearchFilter({
	debounceQuery, input, setInput, setParams, params, setFilters, filters, activeTab,
}, ref) {
	const {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		reset,
		onClickCreate,
		showRecordedSession,
		setShowRecordedSession,
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
					if (params.page !== DEFAULT_PAGE) {
						setParams((prev) => ({ ...prev, page: 1 }));
					}
				}}
				className={styles.input}
			/>

			<div className={styles.right_container}>
				<div className={styles.button_container}>
					<Button
						type="button"
						style={{ marginLeft: 8 }}
						themeType="secondary"
						onClick={() => setShowRecordedSession(true)}
					>
						Manage Recorded Sessions
					</Button>

					<Button
						type="button"
						style={{ marginLeft: 20 }}
						themeType="primary"
						onClick={onClickCreate}
					>
						Create Course
					</Button>
				</div>

				{activeTab === 'courses' ? (
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
				) : null}
			</div>

			<Modal
				size="lg"
				show={showRecordedSession}
				onClose={() => setShowRecordedSession(false)}
			>
				<Modal.Header title="Manage Recorded Sessions" />
				<Modal.Body>
					<RecordedSessions showRecordedSession={showRecordedSession} />
				</Modal.Body>
				<Modal.Footer>
					NOTE: These courses will only be visible to the following role: New Joinee Tech
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default forwardRef(SearchFilter);
