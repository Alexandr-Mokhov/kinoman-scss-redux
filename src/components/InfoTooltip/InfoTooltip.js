import { useSelector, useDispatch } from "react-redux";
import { setInfoTooltipOpen } from "../../store/infoSlice";

export default function InfoTooltip({ 
  infoTooltipMessage,
  setInfoTooltipMessage,
 }) {
  const dispatch = useDispatch();
  const isInfoTooltipOpen = useSelector(state => state.info.infoTooltipOpen)

  function closeInfoTooltip() {
    dispatch(setInfoTooltipOpen(false));
    setInfoTooltipMessage('');
  }

  return (
    <div className={`info-tooltip ${isInfoTooltipOpen ? 'info-tooltip_opened' : ''}`} >
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

