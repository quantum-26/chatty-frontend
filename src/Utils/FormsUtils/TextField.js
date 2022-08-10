import { useField } from "formik";
import { toast } from "react-toastify";

const MyTextInput = ({ label, ...props }) => {
    const toastOptions = {
      position: "bottom-right",
      autoClose: 1000,
      // pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <div className="form_field">
        <input {...field} {...props} />
        {/* meta.touched && */}
        {  meta.touched && meta.error ? (
          // toast.error(meta.error, toastOptions),
          // toast.clearWaitingQueue(),
          <div className="form_validation_error">{meta.error}</div>
        ) : null}
      </div>
    );
};

export default MyTextInput;