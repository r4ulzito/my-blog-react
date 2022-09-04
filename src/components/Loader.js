import Spinner from "react-spinner-material";

const Loader = () => {
  return (
    <div>
      <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
    </div>
  );
};

export default Loader;
