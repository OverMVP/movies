import Image from "../../assets/img/spin/spin.png";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <img src={Image} alt="" style={{ maxWidth: "250px" }} />
    </div>
  );
}
