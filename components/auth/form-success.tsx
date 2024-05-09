import { Check } from "lucide-react";
import { BsExclamationOctagon } from "react-icons/bs";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/20 p-3 rounded-md flex items-center  gap-x-2 text-sm text-emerald-500">
      <Check className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
