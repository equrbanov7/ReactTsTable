import { instance } from "./index";

export const getStudentInfo = async () => {
  const res = await instance.get("/students");
  return res.data;
};

export const postStudentInfo = async (data: {
  name: string;
  email: string;
  gpa: number;
  createDate: Date;
}) => {
  const res = await instance.post("/students", data);
  return res.data;
};

export const deleteStudentInfo = async (id: number) => {
  const res = await instance.delete(`/students/${id}`);
  return res.data;
};

export const updateStudentInfo = async (
  id: number,
  data: { name?: string; email?: string; age?: number; gpa?: number }
) => {
  const res = await instance.patch(`/students/${id}`, data);
  return res.data;
};
