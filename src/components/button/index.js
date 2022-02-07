export const PrimaryRounded = ({ children, ...props }) => {
  return (
    <button
      className="bg-primary text-white font-medium text-base py-2 px-6 rounded-full"
      {...props}
    >
      {children}
    </button>
  );
};
export const PrimaryBtn = ({ children, roundedfull, ...props }) => {
  return (
    <button
      className={`bg-primary ${
        roundedfull ? "rounded-full" : "rounded-md"
      } font-bold text-xl py-2 px-8 `}
      {...props}
    >
      {children}
    </button>
  );
};
export const SecondaryBtn = ({ children, disable }) => {
  return (
    <button
      className={`${
        disable ? "bg-gray-500 select-none pointer-events-none" : "bg-secondary"
      }  py-2 px-8 rounded-md font-bold text-xl `}
    >
      {children}
    </button>
  );
};
export const LightButton = ({ children, type }) => {
  return (
    <button
      className={`${
        type === "primary"
          ? "bg-primary text-primary"
          : "bg-secondary text-secondary"
      } bg-opacity-30  py-2 px-8 font-bold text-xl md:text-3xl rounded-full`}
    >
      {children}
    </button>
  );
};
export const MiniButton = ({ children, type, ...props }) => {
  return (
    <button
      {...props}
      className={`${
        type === "outline" ? "border border-secondary" : "bg-secondary"
      } py-2 px-7 rounded-lg font-medium text-lg ml-4`}
    >
      {children}
    </button>
  );
};
