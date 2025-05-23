import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      Oops! You're don't have the permission to access this page. Click Here to
      return to <Link to="/">home</Link>.
    </div>
  );
};

export default Unauthorized;
