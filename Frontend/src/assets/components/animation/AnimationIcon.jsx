import Lottie from "lottie-react";
import icon from "../../animation/icon/animation_lmduqibv.json" 

const style = {
  height: "100px",
  width: "100px",
};

function AnimationIcon() {
    return (
          <Lottie animationData={icon} style={style} />
      );
}

export default AnimationIcon