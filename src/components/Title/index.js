const Index = ({ title = "Overview", desc }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold  text-4xl md:text-5xl">{title}</h1>
      {desc && (
        <p className=" font-normal  text-sm md:text-lg mt-8 text-gray md:mx-20  xl:mx-72 ">
          {desc}
        </p>
      )}
    </div>
  );
};

export default Index;
