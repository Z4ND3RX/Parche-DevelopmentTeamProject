import Lottie from "lottie-react";

const style = {
  height: "30px",
  width: "30px",
};

export function AnimationFooter(props){
  return (
    <a href={props.ruta}>
      <Lottie animationData={props.animationJSON} style={style} />
    </a>
  );
}
