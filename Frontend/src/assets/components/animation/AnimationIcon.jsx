import Lottie from "lottie-react";
import icon from "../../animation/icon/HouseLocation.json" 

const style = {
  height: "70px",
  width: "70px",
};

function AnimationIcon() {
    return (
          <Lottie animationData={icon} style={style} />
      );
}

export default AnimationIcon