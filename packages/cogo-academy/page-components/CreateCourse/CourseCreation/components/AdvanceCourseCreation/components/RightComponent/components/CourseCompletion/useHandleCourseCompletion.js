import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useImperativeHandle, useEffect } from 'react';

import CURRENT_TO_NEXT_MAPPING from '../../Header/CURRENT_TO_NEXT_MAPPING';

const MAPPING = [
	'completion_criteria',
	'completion_message',
	'course_completion_rewards_details',
	'test_id',
];

const CERTIFICATE_MAPPING = [
	'certificate_name',
	'signing_authority_sign_url',
	'signing_authority_user_id',
];

const FIRST_INDEX = 0;

const useHandleCourseCompletion = ({ data, ref, state, id, activeTab }) => {
	const {
		control,
		formState: { errors = {} },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	const { completion_criteria: criteria = [] } = watch();

	const isTestPresent = criteria.includes('test') || criteria.includes('timed_test');

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => {
				const {
					completion_message,
					completion_criteria,
					certificate_name,
					signing_authority_user_id,
					signing_authority_sign_url,
					course_completion_value,
					course_completion_unit,
					course_completion_rewards_details = [],
					test_id,
				} = values || {};

				return {
					hasError : false,
					values   : {
						id,
						completion_message,
						course_completion_rewards_details,
						test_ids:
							criteria.includes('test') || criteria.includes('timed_test')
								? [test_id]
								: null,
						course_completion_duration: {
							course_completion_value: Number(course_completion_value),
							course_completion_unit,
						},
						certificate_params: {
							signing_authority_user_id,
							signing_authority_sign_url:
							signing_authority_sign_url.finalUrl || signing_authority_sign_url,
							certificate_name,
						},
						completion_criteria,
						...(state !== 'published'
							? { state: CURRENT_TO_NEXT_MAPPING[activeTab] }
							: {}),
					},
				};
			};

			const onError = (error) => ({ hasError: true, error });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));

	useEffect(() => {
		if (!isEmpty(data)) {
			const {
				course_completion_duration,
				course_certificates = [],
				tests = [],
			} = data || {};

			const { course_completion_unit, course_completion_value } = course_completion_duration || {};

			if (!isEmpty(course_certificates)) {
				const certificateData = course_certificates[FIRST_INDEX];

				CERTIFICATE_MAPPING.forEach((item) => {
					if (certificateData[item] && !isEmpty(certificateData[item])) {
						setValue(item, certificateData[item]);
					}
				});
			}

			MAPPING.forEach((item) => {
				if (data[item] && !isEmpty(data[item])) {
					setValue(item, data[item]);
				}

				if (item === 'test_id' && !isEmpty(tests[FIRST_INDEX])) {
					setValue('test_id', tests[FIRST_INDEX].id);
				}
			});

			setValue('course_completion_unit', course_completion_unit);

			setValue(
				'course_completion_value',
				course_completion_value ? course_completion_value.toString() : '',
			);
		}
	}, [data, setValue]);

	return {
		errors,
		control,
		isTestPresent,
	};
};

export default useHandleCourseCompletion;
