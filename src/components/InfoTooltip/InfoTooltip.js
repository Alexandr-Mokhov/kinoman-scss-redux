import { useSelector, useDispatch } from "react-redux";
import { setInfoTooltip } from "../../store/features/tooltipSlice";

export default function InfoTooltip() {
  const dispatch = useDispatch();
  const infoTooltipOpen = useSelector(state => state.tooltip.infoTooltipOpen)
  const infoTooltipMessage = useSelector(state => state.tooltip.infoTooltipMessage)

  function closeInfoTooltip() {
    dispatch(setInfoTooltip({isOpen: false, message: ''}));
  }

  return (
    <div className={`info-tooltip ${infoTooltipOpen ? 'info-tooltip_opened' : ''}`} >
      <div className="info-tooltip__container">
        <button className="info-tooltip__close" type="button" onClick={closeInfoTooltip} />
        <div className="info-tooltip__image_type_err" />
        <h3 className="info-tooltip__title">
          {infoTooltipMessage}
        </h3>
      </div>
    </div>
  )
}

