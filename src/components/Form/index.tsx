import { useForm, SubmitHandler } from "react-hook-form";
import { postStudentInfo } from "../../api/studentInfo";

import "./index.scss";

interface FormProps {
  formTitle: string;
  fetchData: () => void;
}

type Inputs = {
  name: string;
  email: string;
  gpa: number;
};

const Form = ({ formTitle, fetchData }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const studentData = {
        ...data,
        createDate: new Date()
      };
      await postStudentInfo(studentData);
      fetchData();
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Form">
      <h1>{formTitle}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
        />
        {errors.name && <span>This field is required</span>}

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <span>This field is required</span>}

        <input
          {...register("gpa", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Gpa"
        />
        {errors.gpa && <span>This field is required</span>}

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
