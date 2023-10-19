import { Link } from "react-router-dom";

type props = {
  to: string;
  user: object | null;
  children: React.ReactElement;
};

const ConditionalLink = ({ to, user, children }: props) => {
  if (!user) {
    return <Link to={"/"}>{children}</Link>;
  }
  return <Link to={to}>{children}</Link>;
};

export default ConditionalLink;
