import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useImperativeHandle } from 'react';

import useGetAudiences from '../../../../hooks/useGetAudiences';
import useUpdateCourse from '../../../../hooks/useUpdateCourse';
import CURRENT_TO_NEXT_MAPPING from '../../Header/CURRENT_TO_NEXT_MAPPING';

const useHandleIntendedLearners = ({ activeTab, data, ref, id, getCogoAcademyCourse, state, eligible_users }) => {
	const {
		control,
		formState: { errors = {} },
		watch,
		handleSubmit,
		setValue,
		getValues,
	} = useForm();

	const {
		updateCourse,
		loading,
	} = useUpdateCourse({ getCogoAcademyCourse, changeTab: false });

	const mandatoryAudiencesUserWatch = watch('mandatory_audiences_user');

	const { audiences = [], listAudienceLoading } = useGetAudiences();

	const mandatoryAudiencesOptions = audiences.filter((item) => watch('audiences').includes(item.value));

	const onClickGenerate = () => {
		const values = getValues();

		const { audiences: audiencesValue = [], mandatory_audiences = [] } = values || {};

		updateCourse({
			values: {
				id,
				audiences: (audiencesValue || []).map((audience_id) => ({
					id           : audience_id,
					is_mandatory : (mandatory_audiences || []).includes(audience_id),
				})),
				eligible_users : 'custom',
				generate_sheet : true,
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(data) && !listAudienceLoading) {
			const { course_audience_mappings = [], cogo_academy_sheets = [] } = data || {};

			const allAudienceIds = course_audience_mappings.map(
				(item) => item.faq_audience_id,
			);

			const mandatoryAudienceIds = course_audience_mappings
				.filter((item) => item.is_mandatory)
				.map((item) => item.faq_audience_id);

			setValue('audiences', allAudienceIds);
			setValue('mandatory_audiences', mandatoryAudienceIds);
			setValue('mandatory_audiences_user', data.eligible_users);
			setValue('frequency', data.frequency);

			if (cogo_academy_sheets && !isEmpty(cogo_academy_sheets)) {
				setValue('upload_excel', cogo_academy_sheets[GLOBAL_CONSTANTS.zeroth_index].resulted_file_url);
			}
		}
	}, [data, setValue, listAudienceLoading]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => {
				if (mandatoryAudiencesUserWatch === 'custom' && eligible_users !== 'custom') {
					Toast.error('Please click on save and generate');

					return {
						hasError : true,
						error    : {},
					};
				}

				return {
					hasError : false,
					values   : {
						id,
						audiences: (values.audiences || []).map((audience_id) => ({
							id           : audience_id,
							is_mandatory : (values.mandatory_audiences || []).includes(audience_id),
						})),
						...(values?.mandatory_audiences_user === 'custom'
							? { file_url: values.upload_excel.finalUrl || values.upload_excel }
							: {}),
						...(state !== 'published' ? { state: CURRENT_TO_NEXT_MAPPING[activeTab] } : {}),
						generate_sheet : false,
						frequency      : values.frequency,
						eligible_users : values?.mandatory_audiences_user,
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

	return {
		control,
		errors,
		mandatoryAudiencesUserWatch,
		mandatoryAudiencesOptions,
		audiences,
		onClickGenerate,
		loading,
	};
};

export default useHandleIntendedLearners;
