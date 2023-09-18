import Lottie from "lottie-react";
import icon from "../../../../assets/animation/icon/animation_lmnz1lhi.json" 

const style = {
  height: "100px",
  width: "100px",
};

function LocationAnimation() {
    return (
          <Lottie animationData={icon} style={style} />
      );
}

export default AnimationIcon