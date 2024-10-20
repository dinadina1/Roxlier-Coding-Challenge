const StatisticsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor} flex flex-wrap items-center w-1/3`}>
      <div className="mr-4">
        <div className="text-3xl text-white">{icon}</div>
      </div>
      <div>
        <h4 className="text-white text-sm uppercase">{title}</h4>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;