import { TransformProps } from "../../../types";
import { lerp } from "../../../utils";

/** Animate transform transitions */
export const animateTransform = (
  transform: TransformProps,
  progress: number
) => {
    const { translate, translateX, translateY, scale, rotate } = transform;
    let _transformStr = "";
    // --- 2D Transformation --- //
    // Translation
    // Note: If using both translation, `translate` is preferred.
    if (translate) {
      const valueX = lerp(...translate[0], progress);
      const valueY = lerp(...translate[1], progress);
      _transformStr += `translate(${valueX}px, ${valueY}px) `;
    } else if (translateX) {
      _transformStr += `translateX(${lerp(...translateX, progress)}px) `;
    } else if (translateY) {
      _transformStr += `translateY(${lerp(...translateY, progress)}px) `;
    }

    if (scale) {
      _transformStr += `scale(${lerp(...scale, progress)}) `;
    }
    if (rotate) {
      _transformStr += `rotate(${lerp(...rotate, progress)}deg) `;
    }

    // if (_transformStr !== "") target.style.transform = _transformStr;
    return _transformStr;
}