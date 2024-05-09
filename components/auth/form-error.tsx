import {  BsExclamationDiamond } from "react-icons/bs";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-500/15 p-3 rounded-md flex items-center  gap-x-2 text-sm text-red-500">
      <BsExclamationDiamond className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
