import Lottie from "lottie-react";
import icon from "../../../../assets/animation/icon/Question.json" 

const style = {
  height: "300px",
  width: "300px",
};

function CommentsAnimation() {
    return (
          <Lottie animationData={icon} style={style} />
      );
}

export default CommentsAnimation