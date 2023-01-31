import { ErrorMessage, useField, Field } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full mb-4 space-y-1 text-sm text-black">
      <label className="form__label" htmlFor={field.name}>
        {label}
      </label>
      <Field id={field.name} {...field} {...props} />
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-xs text-red-600 font-semibold rounded-b-lg bg-[azure] inline-block px-3 py-1"
      />
    </div>
  );
};

export default TextField;
