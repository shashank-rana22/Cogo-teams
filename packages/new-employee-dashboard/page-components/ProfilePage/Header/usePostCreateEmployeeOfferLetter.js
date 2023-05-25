import { Toast } from "@cogoport/components";
// import { useForm } from "@cogoport/forms";
import getApiErrorString from "@cogoport/forms/utils/getApiError";
import { useHarbourRequest } from "@cogoport/request";

function usePostCreateEmployeeOfferLetter() {
  //   const formProps = useForm();

  //   const { watch } = formProps;

  const [{ data, loading }, trigger] = useHarbourRequest(
    {
      url: "/create_employee_offer_letter",
      method: "POST",
    },
    { manual: true }
  );

  const onFinalSubmit = async (joiningBonus, salaryDetails, ctc, id) => {
    try {
      const combinedObject = { ...joiningBonus, ...salaryDetails, init: ctc };
      console.log("combinedObject", combinedObject);

      const payload = {
        employee_detail_id: id,
        performed_by_id: "20",
        performed_by_type: "ok",
        metadata: combinedObject,
        strip: false,
        status: "active",
      };

      await trigger({
        data: payload,
      });

      Toast.success("Letter initiated!");
    } catch (err) {
      console.log("err :: ", err);
      Toast.error(
        getApiErrorString(err.response?.data) || "Something went wrong"
      );
    }
  };

  return {
    loading,
    onFinalSubmit,
  };
}

export default usePostCreateEmployeeOfferLetter;
