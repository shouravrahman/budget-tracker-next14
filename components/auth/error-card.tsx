import { Card, CardFooter, CardHeader } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { BackButton } from "./back-button";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label="Error! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="Back to Login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
