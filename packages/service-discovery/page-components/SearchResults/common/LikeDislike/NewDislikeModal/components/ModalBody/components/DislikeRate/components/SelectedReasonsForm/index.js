import { Button, cl } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';

import DeleteConfirmationModal from '../DeleteConfirmationModal';
import FormComponent from '../FormComponent';

import styles from './styles.module.css';
import useHandleSelectedReasonsForm from './useHandleSelectedReasonsForm';

const NAME_MAPPING = {
	unsatisfactory_rate       : 'RATE NOT SATISFACTORY',
	unsatisfactory_free_days  : 'DETENTION NOT SATISFACTORY',
	has_additional_line_items : 'HAS ADDITIONAL LINE ITEMS',
	has_missing_line_items    : 'THERE ARE MISSING LINE ITEMS',
};

function SelectedReasonsForm({
	selectedReasons = [],
	formProps = {},
	allControls = [],
	selectedSevice = {},
	details = {},
	rate = {},
	prefilledData = {},
	getSpotSearchRateFeedback = () => {},
	setSelectedReasons = () => {},
	setSelectedSevice = () => {},
}) {
	const {
		control,
		handleSubmit = () => {},
		formState: { errors = {} },
	} = formProps;

	const { feedbacks = []	} = prefilledData;

	const isFeedbackSubmitted = !isEmpty(prefilledData);

	const {
		onSubmit,
		loading = false,
		unsatisfiedFeedbacks = {},
		createTrigger = () => {},
		onDeleteServiceFeedback = () => {},
		setUnsatisfiedFeedbacks = () => {},
		deleteServiceFeedback,
		showDiscardModal,
		setShowDiscardModal,
	} = useHandleSelectedReasonsForm({
		selectedSevice,
		details,
		rate,
		selectedReasons,
		feedbacks,
		getSpotSearchRateFeedback,
		isFeedbackSubmitted,
		setSelectedSevice,
	});

	return (
		<form className={styles.main_container} onSubmit={handleSubmit(onSubmit)}>
			{selectedReasons.map((reason) => {
				const selectedControls = allControls[reason] || [];

				if (isEmpty(selectedControls)) {
					return null;
				}

				const title = NAME_MAPPING[reason] || startCase(reason);

				const currErrros = errors[reason] || {};

				return (
					<div key={reason} className={styles.container}>
						<div className={styles.title}>{title}</div>

						<FormComponent
							currErrros={currErrros}
							control={control}
							selectedControls={selectedControls}
							prefilledData={prefilledData}
							reason={reason}
							unsatisfiedFeedbacks={unsatisfiedFeedbacks}
							createTrigger={createTrigger}
							getSpotSearchRateFeedback={getSpotSearchRateFeedback}
							setUnsatisfiedFeedbacks={setUnsatisfiedFeedbacks}
							setSelectedReasons={setSelectedReasons}
						/>
					</div>
				);
			})}

			<DeleteConfirmationModal
				show={showDiscardModal}
				loading={loading}
				onClickDelete={deleteServiceFeedback}
				cancelText="Cancel"
				deleteText="Delete"
				title="Are you sure you want to discard the feedback for this service?"
				modalSize="sm"
				setShow={setShowDiscardModal}
			/>

			{!isFeedbackSubmitted ? (
				<div
					className={cl`${styles.container} ${styles.commodity_description}`}
					style={{ paddingTop: '20px' }}
				>
					<div className={styles.label}>
						Commodity Description
						<span className={styles.second_text}>
							(Write carefully, this cannot be edited and will be used for the
							other services as well)
						</span>
					</div>

					<InputController
						placeholder="You may give description to get accurate Rate Revert"
						control={control}
						name="commodity_description"
					/>
				</div>
			) : null}

			<div className={styles.buttons}>
				<div className={styles.button_container}>
					<Button
						type="button"
						themeType="secondary"
						onClick={onDeleteServiceFeedback}
					>
						Discard
					</Button>

					<Button
						type="submit"
						themeType="accent"
						disabled={isEmpty(selectedReasons.filter((item) => !feedbacks.includes(item)))}
						loading={loading}
					>
						Submit Feedback for Service
					</Button>
				</div>
			</div>
		</form>
	);
}

export default SelectedReasonsForm;
