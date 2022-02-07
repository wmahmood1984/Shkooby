import { Link, useMatch, useResolvedPath } from "react-router-dom";
const CustomLink = ({ children, to, isDisable, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      {...props}
      className={`p-4 font-medium text-base block ${
        isDisable ? "text-gray-400" : match ? "text-primary" : "text-white"
      } `}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
